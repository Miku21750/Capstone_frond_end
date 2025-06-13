const Hapi = require("@hapi/hapi")
const Inert = require("@hapi/inert")
const connectDB = require("./db");
const HapiJwt = require("@hapi/jwt");

const userRoutes = require("./routes/user");
const detectSkinRoutes = require("./routes/detectSkin");
const feedbackRoutes = require("./routes/feedback");
const scrapingRoutes = require("./routes/scraping");
const staticRoutes = require("./routes/static");


require('dotenv').config(); 
const init = async () => {
    await connectDB();

    const server = Hapi.server({
        port: process.env.PORT || 4000,
        host:'0.0.0.0',
        routes:{
            cors:{
                origin: ['*']
            }
        }
    })
    
    await server.register([Inert, HapiJwt])

    server.auth.strategy('jwt', 'jwt', {
        keys: process.env.JWT_SECRET,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400, // optional
            timeSkewSec: 15   // optional
        },
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: artifacts.decoded.payload
            };
        }
    });

    // server.auth.default('jwt');
    server.route([
        ...userRoutes,
        ...detectSkinRoutes,
        ...feedbackRoutes,
        ...scrapingRoutes,
        ...staticRoutes,
    ]);

    await server.start();
    console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) =>{
    console.log(err);
    process.exit(1);
})

init();