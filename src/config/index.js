import 'dotenv/config'

export const CORS = {
  ORIGIN: process.env.CORS_ORIGIN || '*',
}
export const DISABLE_REQUEST_LOG = process.env.DISABLE_REQUEST_LOG || 0
export const MONGODB_URL = process.env.MONGODB_URL_PROD
// export const MONGODB_URL = process.env.MONGODB_URL_TEST
export const PORT = process.env.PORT || '3000'
export const LMSQY_SECRET = process.env.LMSQY_SECRET || 'storyhex-secret'
// export const LMSQY_SECRET = 'storyhex-secret'

export const S3Options = {
  ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  BUCKET: process.env.S3_BUCKET,
  ENDPOINT: process.env.S3_ENDPOINT || 'http://s3.amazonaws.com',
}

export const MEDIA_CACHE = {
  YEAR: 'public,max-age=31536000',
}
