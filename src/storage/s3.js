import fs from 'fs'

import awsSdk from 'aws-sdk'

import { S3Options } from '../config/index.js'

class S3Storage {
  /**
   * @param {Object} options
   * @description Initialize S3.
   */
  static init() {
    S3Storage.bucket = new awsSdk.S3({
      accessKeyId: S3Options.ACCESS_KEY_ID,
      secretAccessKey: S3Options.SECRET_ACCESS_KEY,
      endpoint: S3Options.ENDPOINT,
    })
    S3Storage.bucketName = S3Options.BUCKET
  }

  /**
   * @param {Object} progress
   * @description Http upload progress.
   */
  static _httpUploadProgress(progress) {
    const { loaded, total, key, part } = progress

    const msg = `${key} - ${part} - ${(total / 1024 / 1024).toFixed(2)} MB / ${(
      loaded /
      1024 /
      1024
    ).toFixed(2)} MB`
    console.info(msg)
  }

  /**
   * @param {string} filePath
   * @param {string} key
   * @description Upload file to s3 compatible service.
   */
  static async upload(filePath, key) {
    console.info(`Uploading... \n filePath: ${filePath} key: ${key}`)

    const stream = fs.createReadStream(filePath)

    const params = {
      Bucket: S3Storage.bucketName,
      Key: key,
      Body: stream,
    }

    return S3Storage.bucket
      .upload(params)
      .on('httpUploadProgress', S3Storage._httpUploadProgress)
      .promise()
  }
}

S3Storage.bucket = {}
S3Storage.bucketName = null

export default S3Storage
