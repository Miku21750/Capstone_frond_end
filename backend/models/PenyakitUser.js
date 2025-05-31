const mongoose = require("mongoose")

const penyakitUserSchema = new mongoose.Schema({
    path: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },

    prediction: { type: String },
    confidence: { type: Number },
    penjelasan: { type: String },
    obat: { type: String },
    cara_pakai: { type: String }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

penyakitUserSchema.virtual("userName").get(function () {
    return this.userId?.name || "Unknown"
})

module.exports = mongoose.model('PenyakitUser', penyakitUserSchema);