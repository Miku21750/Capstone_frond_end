const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: String,
    age: String,
    address: String,
    username: String,
    email: { type: String, unique: true },
    password: { type: String, select: false },
    phoneNumber: String,
    gender: {
        type: String,
        enum: ["male", "female"]
    },
},{
    timestamps: true,
    toJSON: {
        transform: function(doc, ret){
            delete ret.password;
            return ret;
        }
    }
})

module.exports = mongoose.model("User", UserSchema);

