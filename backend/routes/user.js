const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const path = require("path")

require("dotenv").config();

//controller
const { 
    getUser,
    getUserProfile,
    registerUser, 
    loginUser,
    updateUserProfile, 
} = require("../controllers/userController");
const {
    detectSkinController,
    getDataSkinController,
    getDataUserSkinController,
    deletePhotoController,
} = require('../controllers/detectSkinController')
const { scrapeListSkinCondition, bypassHotLink } = require("../controllers/scrappingDataController")

module.exports =[
    {
        method: "GET",
        path: "/api/user",
        handler: getUser
    },
    {
        method: "GET",
        path: "/api/user/detail",
        handler: getUserProfile
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
        method: "PUT",
        path: "/api/user/detail", 
        options: {
            payload: {
            output: "stream", 
            parse: true,
            allow: "multipart/form-data",
            multipart: true,
            maxBytes: 10 * 1024 * 1024,
            }
        },
        handler: updateUserProfile,
    },
    {
        method: "GET",
        path: "/api/list-skin-condition",
        handler: scrapeListSkinCondition
    },
    {
        method: "POST",
        path: "/api/detect-skin",
        options: {
            payload:{
                output: "stream",
                parse: true,
                multipart: true,
                allow: 'multipart/form-data',
                maxBytes: 10485760,
            },
            auth: 'jwt',
            handler: detectSkinController
        },
    },
    {
        method: "GET",
        path: "/api/dataPhoto",
        handler: getDataSkinController
    },
    {
        method: "GET",
        path: "/api/users/dataScans",
        handler: getDataUserSkinController
    },
    {
        method: "DELETE",
        path: "/api/dataPhoto/{id}",
        options:{
            auth: "jwt",   
            handler: deletePhotoController
        }
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
    },
];