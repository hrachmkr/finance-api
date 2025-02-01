import mongoose from 'mongoose'
import { MONGODB_URL } from '../config/index.js'

export const initMongoDb = () => {
  // TODO find what options do we need
  const options = {}

  mongoose.connect(MONGODB_URL, options).catch(onConnectionOpeningError)

  mongoose.connection.on('connected', onConnected)
  mongoose.connection.on('error', onError)
  mongoose.connection.on('disconnected', onDisconnected)
}

const onConnectionOpeningError = (error) => {
  console.error(`Failed to init Mongoose connection: ${error.message}`)
}

const onConnected = () => {
  console.info('Mongoose connection opened.')
}

const onError = (error) => {
  console.error(`Mongoose connection error: ${error.message}`)
}

const onDisconnected = () => {
  console.error('Mongoose connection disconnected.')
}
