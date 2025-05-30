const mongoose = require("mongoose")

const penyakitUserSchema = new mongoose.Schema({
    path: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    userName: { type: String } 
})

module.exports = mongoose.model('PenyakitUser', penyakitUserSchema);