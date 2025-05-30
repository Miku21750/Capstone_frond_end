const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const getUser= async (request, h) => {
    let params = request.query
    let infos = await User.find(params).lean();
    return h.response(infos)
}

const getUserProfile = async (request, h) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) return h.response({ message: "Unauthorized" }).code(401);

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findById(userId).select("-password").lean();

        if(!user) return h.response({message: "User not found"}).code(404);

        return h.response(user).code(200)    
    } catch (error) {
        return h.response({ message: "Failed to fetch user profile", error: error.message }).code(500);
    }
}
const registerUser = async (request, h) => {
    const { 
        name,
        age,
        address,
        username,
        email,
        password
    } = request.payload;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return h.response({ msg: "Email already registered "}).code(400)
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            age,
            address,
            username,
            email,
            password: hashedPassword
        })
        await user.save();

        return h.response({ msg: "User registered successfully "}).code(201)
    } catch (error) {
        return h.response({ error: "Registration failed", details: error.message }).code(500);
    }
}

const loginUser = async (request, h) => {
    const {email, password} = request.payload;

    try {
        const user = await User.findOne({ email }).select("+password")
        if(!user) return h.response({ msg: "Invalid email or password" }).code(401);

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) h.response({ msg: "Invalid email or password" }).code(401);

        const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: "3d"})
        
        return h.response({ token, user: { id: user._id, email: user.email, name: user.name } }).code(200);
    } catch (error) {
        return h.response({ error: "Login failed", details: error.message }).code(500);
    }
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUserProfile
};