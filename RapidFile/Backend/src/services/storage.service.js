const ImageKit = require("imagekit");
require('dotenv').config()
const {v4:uuid} = require("uuid")
const imageKit = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,
});


async function uploadFiles(files) {

    try{

        const uploadPromise = files.map(image=>{
            return imageKit.upload({
                file:image.buffer,
                fileName:`${uuid()}-${image.originalname}`,
            })
        })

        const uploadResult = await Promise.all(uploadPromise) 
        const imgUrls = uploadResult.map(result=>result.url)
        return imgUrls;
    }
    catch(error){
        console.log("Imagekit Upload Error",error);
        return null
    }
}

module.exports = {
    uploadFiles
}