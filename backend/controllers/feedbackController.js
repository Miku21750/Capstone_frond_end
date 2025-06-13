const Feedback = require('../models/Feedback');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();
const OAuth2 = google.auth.OAuth2;

const OAUTH_EMAIL = process.env.OAUTH_EMAIL || ''
const OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID || '';
const OAUTH_CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET || '';
const OAUTH_REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN || '';
const EMAIL_TARGET = process.env.EMAIL_TARGET || '';

const getFeedback = async (request, h) => {
  const { province, method, minRating, page = 1, limit = 6 } = request.query;
  console.log("getFeedback", request.query);

  /**
   * TODO (if available)
   * the consent field where the value is false is showed when the user is admin
   * or the user is the owner of the feedback
   */

  const query = { consent: true }
  if(province) query.province = province;
  if(method) query.method = method;
  if(minRating) query.diagnosisHelpful = { $gte: parseInt(minRating) };

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const total = await Feedback.countDocuments(query);
  const data = await Feedback.find(query).skip(skip).limit(parseInt(limit)).lean();

  console.log("Feedback query:", query);
  console.log("Feedback data:", data.length, "Total:", total);

  // let params = request.query;
  // let infos = await Feedback.find(params).lean();
  return h.response({
    data,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / limit),
  });
}

const submitFeedback = async (request, h) => {
    try {
        const payload = request.payload;

        const feedback = new Feedback(payload);
        const saved = await feedback.save();

        sendEmail(saved).catch((error) => {
            console.error("Error sending email:", error);
        });
      
        return h.response({ message: "Feedback submitted successfully", feedback: saved }).code(201);
    } catch (error) {
        console.error("Error submitting feedback:", error);
        return h.response({ error: "Failed to submit feedback" }).code(500);
    }
}

const sendEmail = async (saved) => {
  const text = `
  New feedback received: 
  Name: ${saved.name}
  Province: ${saved.province}
  Region: ${saved.region}
  Method: ${saved.method}
  Diagnosis Helpful: ${saved.diagnosisHelpful}
  Drug Advice Clear: ${saved.drugAdviceClear}
  Nearby Help: ${saved.nearbyHelp}
  Learn More: ${saved.learnMore.join(', ')}
  Email: ${saved.email || 'N/A'}
  Comments: ${saved.comments}
  Consent: ${saved.consent ? 'Yes' : 'No'}
  Date: ${saved.date.toISOString()}
  `;
  const subject = `New Feedback from ${saved.name} (${saved.email || 'N/A'})`;
  // send email 
  try {
    
    // create OAuth2 client
    const oauth2Client = new OAuth2(
        OAUTH_CLIENT_ID,
        OAUTH_CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    );
    
    // set refresh token
    oauth2Client.setCredentials({
        refresh_token: OAUTH_REFRESH_TOKEN
    });
    
    // get access token using promise
    const {token} = await oauth2Client.getAccessToken()

    if (!token) {
      throw new Error("Failed to retrieve access token.");
    }
        
    
    const transporter = nodemailer.createTransport({
        service: "gmail",
        // host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
            type: 'OAuth2',
            user: OAUTH_EMAIL,
            clientId: OAUTH_CLIENT_ID,
            clientSecret: OAUTH_CLIENT_SECRET,
            accessToken: token
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailOption = {
        from: OAUTH_EMAIL,
        to: EMAIL_TARGET,
        subject,
        text,
    }

    // send mail
    const info = await transporter.sendMail(mailOption);
    console.log('Message sent: %s', info.messageId);
  }
  catch (emailError) {
    console.error('❌ Email send error:', emailError);
  }
}

module.exports = {
  getFeedback,
  submitFeedback,
};