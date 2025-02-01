// const redis = require('redis-promisify')

// class RedisStorage {
//   /**
//    * @param {Object} REDIS_OPTIONS
//    * @description Initiate Redis connection and attach event listeners.
//    */
//   static init(REDIS_OPTIONS) {
//     const { PORT, HOST, PASSWORD } = REDIS_OPTIONS

//     const options = {
//       port: PORT,
//       host: HOST,
//       password: PASSWORD
//     }
//     RedisStorage.redisClient = redis.createClient(options)

//     RedisStorage.redisClient.on('error', RedisStorage._onError)
//     RedisStorage.redisClient.on('reconnecting', RedisStorage._onReconnecting)
//     RedisStorage.redisClient.on('ready', RedisStorage._onReady)
//   }

//   /**
//    * @description On error event handler.
//    */
//   static _onError(error) {
//     console.error(`Redis connection error: ${error.message}`)
//   }

//   /**
//    * @description On reconnecting event handler.
//    */
//   static _onReconnecting() {
//     console.warn('Redis connection reconnecting.')
//   }

//   /**
//    * @description On error event handler.
//    */
//   static _onReady() {
//     console.info('Redis connection is ready.')
//   }

//   /**
//    * @param {string} key
//    * @param {string | Object} value
//    * @param {number} [expires]
//    * @returns {Promise<string>}
//    * @description Set in redis.
//    */
//   static setValue(key, value, expires) {
//     const _value = JSON.stringify(value)

//     return expires
//       ? RedisStorage.redisClient.setexAsync(key, expires, _value)
//       : RedisStorage.redisClient.setAsync(key, _value)
//   }

//   /**
//    * @param {string} key
//    * @returns {Promise<string | null>}
//    * @description Get from redis.
//    */
//   static getValue(key) {
//     return RedisStorage.redisClient
//       .getAsync(key)
//       .then(result => JSON.parse(result))
//   }
// }

// RedisStorage.redisClient = {}

// module.exports = RedisStorage
