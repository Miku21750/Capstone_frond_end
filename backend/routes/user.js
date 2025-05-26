const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const path = require("path")

require("dotenv").config();

//controller
const { 
    getUser,
    registerUser, 
    loginUser 
} = require("../controllers/userController");
const { scrapeListSkinCondition, bypassHotLink } = require("../controllers/scrappingDataController")

module.exports =[
    {
        method: "GET",
        path: "/api/user",
        handler: getUser
    },
    {
        method: "POST",
        path: "/api/register",
        handler: registerUser,
    },
    {
        method: "POST",
        path: "/api/login",
        handler: loginUser,
    },
    {
        method: "GET",
        path: "/api/list-skin-condition",
        handler: scrapeListSkinCondition
    },
    {
        method: "GET",
        path: "/images/{param*}",
        handler: {
            directory: {
                path: path.join(__dirname, '../public/images'), // adjust relative path as needed
                redirectToSlash: true,
                index: false,
            }
        }
    }
];