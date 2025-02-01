import mongoose from 'mongoose'
import UsersSchema from './schema.js'

import getRawBody from 'raw-body'

import admin from 'firebase-admin'

import { LMSQY_SECRET } from '../../../config/index.js'

import ErrorsUtil from '../../../util/errors.util.js'

import crypto from 'crypto'

const { NotFoundError, NotAuthenticatedError } = ErrorsUtil

const Users = mongoose.model('Users', UsersSchema)

export const getUserModel = (req, res) => {
  const { uid } = req.user

  const newUser = {
    uid: req.user.uid,
    email: req.user.email,
    username: req.user.name,
    picture: req.user.picture,
    expertise: 'founder',
    aiTokenLimit: 100000,
    isMember: false,
    socials: {
      x: '',
      linkedin: '',
      instagram: '',
    },
    publicEmail: '',
    bio: '',
    arr: 0,
  }

  return Users.findOne({ uid: uid }).then((user) => {
    if (!user) {
      return Users.create(newUser).then((res) => {
        return res
      })
    }
    return user
  })
}

export const getFoundersModel = (req, res) => {
  return Users.find({
    expertise: 'founder',
    isMember: true,
    subscriptionId: { $ne: null },
    // uniqueFounder: true,
  })
    .sort({ createdAt: -1 })
    .select(
      'username picture expertise createdAt socialLinks publicEmail bio arr affiliateUrl',
    )
    .then((founders) => {
      return founders
    })
}

export const getPublicFoundersModel = (req, res) => {
  return Users.find({
    expertise: 'founder',
    isMember: true,
    subscriptionId: { $ne: null },
    // uniqueFounder: true,
  })
    .sort({ createdAt: -1 })
    .select(
      'username picture expertise createdAt socialLinks bio arr affiliateUrl -_id',
    )
    .then((founders) => {
      return founders
    })
}

export const getUserIdModel = (req, res) => {
  const { uid } = req.user

  return Users.findOne({ uid: uid }).then((user) => {
    if (!user) {
      return null
    }
    return user._id
  })
}

export const getUserIsMemberModel = (req, res) => {
  const { uid } = req.user

  return Users.findOne({ uid: uid }).then((user) => {
    if (!user) {
      return Promise.reject(new NotFoundError('User not found'))
    }
    return user.isMember && !!user.subscriptionId
  })
}

export const updateAiTokenLimitModel = async (req, res, tokens) => {
  const { uid, aiTokenLimit } = req.user

  const user = await Users.findOne({ uid: uid })

  if (user.aiTokenLimit) {
    const updatedUser = {
      aiTokenLimit: user.aiTokenLimit - tokens,
    }

    return Users.findOneAndUpdate({ uid: uid }, updatedUser, {
      new: true,
    })
  }
  if (user.aiTokenLimit < tokens) {
    return Promise.reject(
      new NotFoundError('AI token limit exceeded, please contact support.'),
    )
  }
}

export const updateUserModel = async (req, res) => {
  const { uid } = req.user
  const { username, expertise, picture, socialLinks, publicEmail, bio, arr } =
    req.body

  const user = await Users.findOne({ uid: uid })

  if (user) {
    const updatedUser = {
      username,
      expertise,
      picture,
      socialLinks,
      publicEmail,
      bio,
      arr,
    }

    return Users.findOneAndUpdate({ uid: uid }, updatedUser, {
      new: true,
    })
  }
}

export const updateAffLinkModel = async (req, res, next) => {
  const { uid } = req.user
  const { affiliateUrl } = req.body

  return Users.findOneAndUpdate(
    { uid: uid },
    { affiliateUrl: affiliateUrl },
    {
      new: true,
    },
  )
    .then((user) => user)
    .catch((error) => {
      return next(
        new NotAuthenticatedError('Authentication failed. Please try later.'),
      )
    })
}

export const createCustomTokenModel = async (req, res, next) => {
  const { userId } = req.body
  return admin
    .auth()
    .createCustomToken(userId)
    .then((customToken) => {
      // Send token back to client
      return Promise.resolve(customToken)
    })
    .catch((error) => {
      return next(
        new NotAuthenticatedError('Not authenticated. Please try later.'),
      )
    })
}

export const updateUserSubscriptionModel = (req, res, next) => {
  const secret = LMSQY_SECRET

  const jsonBody = JSON.parse(req.rawBody.toString())
  const eventName = req.get('X-Event-Name')

  const hmac = crypto.createHmac('sha256', secret)
  const digest = Buffer.from(hmac.update(req.rawBody).digest('hex'), 'utf8')
  const signature = Buffer.from(req.get('X-Signature') || '', 'utf8')

  if (!crypto.timingSafeEqual(digest, signature)) {
    console.log('Signature verification failed')
    return next(
      new NotAuthenticatedError(
        'Signature verification failed. Please try later.',
      ),
    )
  } else {
    // const isMember = [
    //   'subscription_updated',
    //   // 'subscription_created',
    //   // 'order_created',
    //   // 'subscription_resumed',
    //   // 'subscription_unpaused',
    //   // 'subscription_payment_success',
    // ].includes(eventName)

    // const membersipCancelled = [
    //   // 'subscription_cancelled',
    //   'subscription_expired',
    //   'subscription_payment_failed',
    //   'subscription_paused',
    // ].includes(eventName)

    // const getIsMemberStatus = () => {
    //   if (isMember && jsonBody.data.attributes.status === 'active') {
    //     return true
    //   } else if (membersipCancelled) {
    //     return false
    //   }
    //   // return false
    // }

    if (eventName === 'subscription_created') {
      return Users.findOneAndUpdate(
        { _id: jsonBody.meta.custom_data.user_id },
        {
          subscriptionId: jsonBody.data.id,
          isMember: true,
        },
        {
          new: true,
        },
      )
        .then((user) => {
          return user
        })
        .catch((error) => {
          console.log('error', error)
          return next(
            new NotAuthenticatedError(
              'Signature verification failed. Please try later.',
            ),
          )
        })
    }

    if (eventName === 'subscription_cancelled') {
      return Users.findOneAndUpdate(
        { _id: jsonBody.meta.custom_data.user_id },
        {
          // subscriptionId: '',
          isMember: false,
        },
        {
          new: true,
        },
      )
        .then((user) => {
          return user
        })
        .catch((error) => {
          return next(
            new NotAuthenticatedError(
              'Signature verification failed. Please try later.',
            ),
          )
        })
    }

    // if (membersipCancelled.includes(eventName)) {
    //   return Users.findOneAndUpdate(
    //     { _id: jsonBody.meta.custom_data.user_id },
    //     {
    //       isMember: false,
    //     },
    //     {
    //       new: true,
    //     },
    //   )
    //     .then((user) => {
    //       return user
    //     })
    //     .catch((error) => {
    //       return next(
    //         new NotAuthenticatedError(
    //           'Signature verification failed. Please try later.',
    //         ),
    //       )
    //     })
    // }
    // return Promise.resolve({ message: 'No action required.' })
  }
}
