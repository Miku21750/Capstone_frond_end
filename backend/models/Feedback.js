const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    province: { type: String, required: true },
    regency: { type: String, required: true },
    district: { type: String, required: true },
    village: { type: String, required: true },
    method: { type: String, enum: ['upload', 'realtime'], required: true },
    diagnosisHelpful: { type: Number, min: 1, max: 5, required: true },
    drugAdviceClear: { type: String, enum: ['yes', 'no'], required: true },
    nearbyHelp: { type: String, enum: ['yes', 'no'], required: true },
    learnMore: { type: [String] },
    email: String,
    comments: { type: String, required: true },
    consent: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

module.exports = mongoose.model('Feedback', FeedbackSchema);