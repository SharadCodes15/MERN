const ImageKit = require("imageKit");
require('dotenv').config()

const imageKit = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,
});


async function uploadFiles(files) {

    try{

        const uploadPromise = files.map(image=>{
            return imageKit.upload({
                file:file.buffer,
                fileName:`${uuid()}-image`,
            })
        })

        const uploadResult = await Promise.all(uploadPromise) 
        const imgUrls = uploadResult.map(result=>result.url)
        return imgUrls;
    }
    catch(error){
        console.log(error);
        
    }
}

module.exports = {
    uploadFile
}