import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'

import { rateLimit } from 'express-rate-limit'

import { CORS, DISABLE_REQUEST_LOG } from './config/index.js'

import { initMongoDb } from './storage/mongodb.js'
import Api from './api/index.js'
import { errorHandlerMiddleware } from './middleware/error-handler.js'

import admin from 'firebase-admin'

import S3Storage from './libs/s3.js'

import 'dotenv/config'
import fs from 'fs'

export const app = express()
export const env = app.get('env')

const serviceAccount = JSON.parse(
  Buffer.from(process.env.FIREBASE_ADMIN_SDK_JSON_BASE64, 'base64').toString(
    'utf8',
  ),
)

const initFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}
// Set request logger
const setRequestLogger = () => {
  if (DISABLE_REQUEST_LOG !== '1') {
    app.use(morgan('dev'))
  }
}

// Set CORS
const setCors = () => {
  app.use(
    cors({
      origin: CORS.ORIGIN,
      methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Authorization', 'Content-Type', 'Origin'],
      credentials: true,
      optionsSuccessStatus: 200,
      maxAge: -1,
    }),
  )
}

// Set request parser
// Middleware for parsing JSON and URL-encoded bodies
const jsonParser = bodyParser.json({ limit: '1mb' })
const urlencodedParser = bodyParser.urlencoded({
  limit: '1mb',
  extended: false,
})

const setRequestParser = () => {
  // Apply bodyParser middleware globally except for specific routes
  app.use((req, res, next) => {
    console.log('req.path', req.path)
    if (req.path === '/api/v1/users/subscripition-webhook') {
      next() // Skip bodyParser for this path
    } else {
      jsonParser(req, res, next)
    }
  })
  app.use((req, res, next) => {
    if (req.path === '/api/v1/users/subscripition-webhook') {
      next() // Skip bodyParser for this path
    } else {
      urlencodedParser(req, res, next)
    }
  })
}

// Set session
const setSession = () => {
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: 'HRACH',
    }),
  )
}

// Initialize storage
const initializeStorage = () => {
  initMongoDb()
  S3Storage.init()
  // other storage initializations
}

// Initialize API
const initializeApi = () => {
  app.use('/api/v1', Api)
}

// Configure the rate limiter
// const limiter = rateLimit({
//   windowMs: 5 * 60 * 1000, // 5 minutes
//   limit: 300,
//   standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//   legacyHeaders: false,
// })

// Initialize the app
export const initApp = () => {
  // app.use(limiter)
  initFirebase()
  setRequestLogger()
  setCors()
  setRequestParser()
  initializeStorage()
  setSession()
  initializeApi()
  app.use(errorHandlerMiddleware)
}
