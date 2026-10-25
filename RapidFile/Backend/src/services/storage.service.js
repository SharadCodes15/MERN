const ImageKit = require("imagekit");
require('dotenv').config()
const {v4:uuid} = require("uuid")
const imageKit = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT,
});


async function uploadFiles(files) {
  const results = await Promise.allSettled(
    files.map(async (image) => {
      const result = await imageKit.upload({
        file: image.buffer,
        fileName: uuid(),
      });

      if (!result?.fileId) {
        throw new Error("ImageKit upload returned no file ID");
      }

      return result;
    })
  );

  const uploaded = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  const uploadErrors = results
    .filter((result) => result.status === "rejected")
    .map((result) => result.reason);

  if (uploadErrors.length > 0) {
    const cleanupResults = await Promise.allSettled(
      uploaded.map((file) => imageKit.deleteFile(file.fileId))
    );

    const cleanupErrors = cleanupResults
      .filter((result) => result.status === "rejected")
      .map((result) => result.reason);

    throw new AggregateError(
      [...uploadErrors, ...cleanupErrors],
      "ImageKit upload failed"
    );
  }

  return uploaded;
}
module.exports = {
    uploadFiles
}