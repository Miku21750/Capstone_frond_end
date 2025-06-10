const fs = require('fs')
const path = require('path');

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

const updateUserProfile = async (request, h) => {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) return h.response({ message: "Unauthorized" }).code(401);

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const { 
            name,
            email,
            phoneNumber,
            address,
            birthDate,
            height,
            weight,
            gender
        } = request.payload;

        const updateData = {
            name,
            email,
            phoneNumber,
            address,
            birthDate: birthDate ? new Date(birthDate) : undefined,
            height: height ? parseFloat(height) : undefined,
            weight: weight ? parseFloat(weight) : undefined,
            gender: gender ? gender : undefined,
        };

        if(height && weight) {
            const heightInMeters = parseFloat(height) / 100;
            const bmi = parseFloat(weight) / (heightInMeters * heightInMeters);
            updateData.bmi = parseFloat(bmi.toFixed(2));
        }
        if (birthDate) {
            const birthDateObj = new Date(birthDate);
            const today = new Date();
            let age = today.getFullYear() - birthDateObj.getFullYear();
            const monthDiff = today.getMonth() - birthDateObj.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
                age--;
            }
            updateData.age = age;
        }

        //photo profile
        const { avatar, removePhoto } = request.payload;
        if(removePhoto === "true"){
            const user = await User.findById(userId);
            if (user && user.avatar) {
                const oldPath = path.join(__dirname, '../public', user.avatar);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath); 
                updateData.avatar = null;
            }
        } else if (avatar && avatar._data) {
            const user = await User.findById(userId);
            if (user && user.avatar) {
                const oldPath = path.join(__dirname, '../public', user.avatar);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath); 
            }
            const filename = `avatar-${userId}-${Date.now()}.jpg`;
            const relativePath = `/images/uploads/${filename}`;
            const filepath = path.join(__dirname, '../public/images/uploads/', filename);
            const fileStream = fs.createWriteStream(filepath)
            fileStream.write(request.payload.avatar._data);
            fileStream.end();

            updateData.avatar = relativePath; 
            console.log("Avatar uploaded:", request.payload.avatar.hapi.filename);
         }

        Object.keys(updateData).forEach(key => {
            if(updateData[key] === undefined) delete updateData[key];
        })

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select("-password").lean();
        
        if(!updatedUser) return h.response({message: "User not found"}).code(404);
        return h.response(updatedUser).code(200);
    } catch (error) {
        return h.response({ message: "Failed to update user profile", error: error.message }).code(500);
    }
}

const registerUser = async (request, h) => {
    const { 
        name,
        age,
        address,
        username,
        email,
        password,
        gender
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

        user.lastLogin = new Date();
        await user.save();

        const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET, {expiresIn: "3d"})
        
        return h.response({ token, user: { id: user._id, email: user.email, name: user.name, lastLogin: user.lastLogin } }).code(200);
    } catch (error) {
        return h.response({ error: "Login failed", details: error.message }).code(500);
    }
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUserProfile,
  updateUserProfile,
};