const DataModel = require("../models/Data.model");
const storageService = require("../services/storage.service");
const deleteData = require("../controllers/Expire.controller");
const { v4: uuid } = require("uuid");
async function checkFiles(req) {
  if (!req.files || req.files.length === 0) {
    return [];
  }
  const fileupload = await storageService.uploadFiles(req.files);

  if (!fileupload) {
    throw new Error("Image upload Failed");
  }

  return fileupload.map((file) => ({
    fileId: file.fileId,
    name: file.name,
    url: file.url,
    thumbnailUrl: file.thumbnailUrl,
    filePath: file.filePath,
  }));
}

async function createData(req, res) {
  try {
    await deleteData();
  } catch (error) {
    console.log("error occured while deleting from controller");
  }
  try {
    const uploadedfiles = await checkFiles(req);
    const createDate = new Date();
    let expiryDate = new Date(createDate);
    expiryDate.setDate(expiryDate.getDate() + 2);

    const DataItem = await DataModel.create({
      siteURL: uuid(),
      text: req.body.text,
      imageUrls: uploadedfiles,
      TimeofCreation: createDate,
      TimeofExpiry: expiryDate,
    });

    res.status(201).json({
      message: "Data Created",
      data: DataItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Creating Data",
      error: error.message,
    });
  }
}

async function getDataAll(req, res) {
  try {
    await deleteData();
  } catch (error) {
    console.log("error occured while deleting from controller");
  }
  try {
    const dataItem = await DataModel.find({});
    res.status(200).json({
      Data: dataItem,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error occured ",
      error: error,
    });
  }
}

async function getDataBysiteURL(req, res) {
  try {
    await deleteData();
  } catch (error) {
    console.log("error occured while deleting from controller");
  }
  try {
    const result = await DataModel.findOne({ siteURL: req.params.url });
    if (result === null) {
      return res.status(404).json({
        message: "Data Not found with this url",
      });
    }
    res.status(200).json({
      message: "Successfully Fetched",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occured while fetching data",
      error: error,
    });
  }
}

module.exports = { createData, getDataAll, getDataBysiteURL };
