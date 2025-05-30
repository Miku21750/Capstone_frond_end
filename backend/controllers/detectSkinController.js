const fs = require('fs')
const path = require('path');

const PenyakitUser = require('../models/PenyakitUser')

const getDataSkinController = async (request, h) => {
    let params = request.query
    let infos = await PenyakitUser.find(params).lean();
    return h.response(infos)
}

const detectSkinController = async (request, h) => {
    const { image } = request.payload;
    const { id: userId, name: userName } = request.auth.credentials;

    if(!image) return h.response({message: 'no file uploaded'}).code(400)

    const filename = `penyakit-${Date.now()}.jpg`;
    const relativePath = `/images/uploads/${filename}`;
    const filepath = path.join(__dirname, '../public/images/uploads/', filename);

    const fileStream = fs.createWriteStream(filepath)

    return new Promise((resolve, reject) =>{
        image.pipe(fileStream);

        image.on('end', async () => {
            try {
                const record = new PenyakitUser({path: relativePath, userId, userName})
                await record.save();

                resolve(h.response({message: 'upload successfull', filename}).code(200))
            } catch (error) {
                console.error('MongoDB save error:', err);
                reject(h.response({ message: 'Database save failed' }).code(500));
            }
        })

        image.on('error', (err) => {
            console.error('Upload error:', err);
            reject(h.response({ message: 'Upload failed' }).code(500));
        });
    })
}

const deletePhotoController = async (request, h) => {
    const { id: userId } = request.auth.credentials;
    const { id } = request.params;

    try {
        const photo = await PenyakitUser.findById(id)
        if(!photo) return h.response({ message: "Photo not found "}).code(404);
        if(photo.userId !== userId) return h.response({ message: "Unauthorized"}).code(403);

        const filePath = path.join(__dirname, "../public", photo.path);

        if(fs.existsSync(filePath)) fs.unlinkSync(filePath);

        await PenyakitUser.deleteOne({ _id: id })

        return h.response({ message: "Photo deleted successfully" }).code(200);
    } catch (error) {
        console.error("Delete error:", error);
        return h.response({ message: "Internal server error" }).code(500);
    }
}

module.exports = {
  detectSkinController,
  getDataSkinController,
  deletePhotoController
};