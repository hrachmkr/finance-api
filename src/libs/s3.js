import awsSdk from 'aws-sdk'
import Promise from 'bluebird'

import { S3Options } from '../config/index.js'

awsSdk.config.setPromisesDependency(Promise)

class S3Storage {
  static init() {
    S3Storage.bucket = new awsSdk.S3({
      accessKeyId: S3Options.ACCESS_KEY_ID,
      secretAccessKey: S3Options.SECRET_ACCESS_KEY,
      endpoint: S3Options.ENDPOINT,
    })
    S3Storage.bucketName = S3Options.BUCKET
  }

  static listDirectories(payload) {
    const { distDirectoryPath, bucketName } = payload
    const listParams = { Bucket: bucketName, Prefix: distDirectoryPath }

    return S3Storage.bucket.listObjectsV2(listParams).promise()
  }

  /**
   * @param {Object} payload
   * @param {string} payload.distDirectoryPath
   * @param {string} payload.bucketName
   * @return {Promise<>}
   * @description Delete single directory from S3.
   */
  static deleteDirectoryFromS3(payload) {
    const { distDirectoryPath, bucketName } = payload
    const listParams = { Bucket: bucketName, Prefix: distDirectoryPath }

    return S3Storage.bucket
      .listObjectsV2(listParams)
      .promise()
      .then((listedObjects) => {
        if (listedObjects.Contents.length === 0) return

        const deleteParams = { Bucket: bucketName, Delete: { Objects: [] } }

        listedObjects.Contents.forEach(({ Key }) =>
          deleteParams.Delete.Objects.push({ Key }),
        )

        return S3Storage.bucket.deleteObjects(deleteParams).promise()
      })
  }

  /**
   * @param {Object} payload
   * @param {string} payload.distFilePath
   * @param {string} payload.bucketName
   * @return {Promise<>}
   * @description Delete single file from S3.
   */
  static deleteFileFromS3(payload) {
    const { distFilePath, bucketName } = payload

    const params = { Bucket: bucketName, Key: distFilePath }

    return S3Storage.bucket.deleteObject(params).promise()
  }

  /**
   * @param {Object} payloads
   * @return {Promise<Array>}
   * @description Delete few files from S3.
   */
  static deleteFilesFromS3(payloads) {
    const deletePayloads = Object.values(payloads)

    return Promise.map(deletePayloads, S3Storage.deleteFileFromS3)
  }

  /**
   * @param {Object} payload
   * @param {Object} payload.fileStream
   * @param {string} payload.fileMime
   * @param {string} payload.distFilePath
   * @param {string} payload.bucketName
   * @returns {Promise<Object>}
   * @description Upload single file to S3.
   */
  static uploadFileToS3(payload) {
    const { fileStream, fileMime, distFilePath, bucketName, cacheControl } =
      payload
    const params = {
      Bucket: bucketName,
      Key: distFilePath,
      Body: fileStream,
      ContentType: distFilePath.endsWith('.svg') ? 'image/svg+xml' : fileMime,
      CacheControl: cacheControl || undefined,
      ACL: 'public-read',
    }

    return S3Storage.bucket.upload(params).promise()
  }

  /**
   * @param {Object} payloads
   * @return {Promise<Array>}
   * @description Upload few files to S3.
   */
  static uploadFilesToS3(payloads) {
    const uploadPayloads = Object.values(payloads)

    return Promise.map(uploadPayloads, S3Storage.uploadFileToS3)
  }

  /**
   * @param {string} signedS3Path
   * @returns {string}
   * @description Get file destination path from amazon link.
   */
  static _getDistFilePathFromS3Path(signedS3Path) {
    const s3HostWithKey = signedS3Path.substring(
      signedS3Path.indexOf('://') + 3,
      signedS3Path.indexOf('?'),
    )

    return s3HostWithKey.replace(/\.s3[.-].*\.amazonaws\.com/, '')
  }

  /**
   * @param {Object} payload
   * @param {string} payload.bucketName
   * @param {string} payload.signedS3Path
   * @param {string} payload.distFilePath
   * @returns {Promise.<Object>}
   */
  static copyObject(payload) {
    const { bucketName, signedS3Path, distFilePath } = payload
    const copySource = this._getDistFilePathFromS3Path(signedS3Path)

    const params = {
      Bucket: bucketName,
      CopySource: copySource,
      Key: distFilePath,
    }
    return S3Storage.bucket.copyObject(params).promise()
  }

  /**
   * @public
   * @param {Object} payload
   * @param {string} payload.distFilePath
   * @param {string} payload.bucketName
   * @returns {Promise.<boolean>}
   * @description Check whether the file exists in s3.
   */
  static fileExistsInS3(payload) {
    const { distFilePath, bucketName } = payload

    const params = { Bucket: bucketName, Key: distFilePath }

    return S3Storage.bucket
      .headObject(params)
      .promise()
      .then(() => Promise.resolve(true))
      .catch(() => Promise.resolve(false))
  }

  /**
   *
   * @param {string} bucketName
   * @param {string} filePath
   * @returns {Promise.<Object>}
   */
  static getFileParamsFromS3(bucketName, filePath) {
    const params = {
      Bucket: bucketName,
      Key: filePath,
    }

    return S3Storage.bucket.getObject(params).promise()
  }

  /**
   *
   * @param {string} bucketName
   * @param {string} filePath
   * @returns {Promise.<string>}
   */
  static _getFileBodyFromS3(bucketName, filePath) {
    return S3Storage.getFileParamsFromS3(bucketName, filePath).then(
      (data) => data.Body,
    )
  }

  /**
   *
   * @param {string} bucketName
   * @param {string} filePath
   * @param {Promise.<Object>}
   */
  // static getS3PngFileHeightAndWidth(bucketName, filePath) {
  //   return S3Storage._getFileBodyFromS3(bucketName, filePath)
  //     .then(ImageUtil.getImageDimensionsFromBuffer)
  //     .then(({ height, width }) => ({ height, width }))
  // }
}

export default S3Storage
