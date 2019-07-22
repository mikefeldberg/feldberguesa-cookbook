var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')

var s3 = new aws.S3({ 
  "accessKeyId": process.env.AWSAccessKeyId, 
  "secretAccessKey": process.env.AWSSecretKey, 
  "region": process.env.region
})

var upload = multer({
  storage: multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: process.env.bucket_name,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function(req, file, cb) {
      // use Date.now() for unique file keys
      // cb(null, Date.now().toString())
      cb(null, file.originalname);
    }
  })
})

module.exports = upload;

