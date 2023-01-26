import React, { useState } from "react";
import { uploadFile } from "react-s3";

const S3_BUCKET = "fameway-prod";
const REGION = "eu-west-3";
const ACCESS_KEY = "AKIA5MPU77XRUQIB3SP4";
const SECRET_ACCESS_KEY = "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";

let config = {
  bucketName: S3_BUCKET,
  region: REGION,
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
};

export const handleUpload = async (file, dirname) => {
  config = {
    ...config,
    dirName: dirname,
  };
  return uploadFile(file, config)
    .then((data) => data)
    .catch((err) => console.error(err));
};
