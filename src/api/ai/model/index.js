import OpenAI from 'openai'
import { updateAiTokenLimitModel } from '../../users/model/index.js'

import ErrorsUtil from '../../../util/errors.util.js'

const { AIError } = ErrorsUtil

const openai = new OpenAI()

const _getPrompt = (description, directRequest) => {
  // const exclusionQuery = exclusions
  //   ? `Exclude these variants: "${exclusions.join(', ')}"`
  //   : ''
  const isString = typeof description === 'string'
  const cleanDescription = description.replace(/^\.|[\n|\r]/g, ' ')
  // eslint-disable-next-line no-control-regex
  const nonASCIRegex = /[^\u0000-\u007F]+/
  const isEnglish = !nonASCIRegex.test(description)
  const letterLimit = 8 + Math.round(Math.random() * 6)
  if (directRequest) {
    return `You are a text generation model for blog posts and documents editing which changes the text from input. You are asked to generate content based on the following description: ${description}. The content should be written mostly for solo entrepreneurs, business owners, product creators, product enthusiasts, engineers, developers, designers, marketers, and other professionals. The content should be written in a way that it is easy to understand and follow. If it has not been asked to complete the sentence then generate the content with a maximum of 300 characters if the context of generation is appropraite. Do not include any text formatting or html tags. Also detect the language of the input and generate content in the same language.`
  }
  const prompt = isEnglish
    ? `Generate content in english based on the following ${
        isString ? 'description' : 'keywords'
      }, with maximum of 300 characters, if asked from prompt to generate some titles, lists or any markup including content than generate text with html markup (for example: enclosed with <p>, <strong>, <ul>, <li>, <h1>, <h2> tags), otherwise just give simple text without any html tag: ${
        isString ? cleanDescription : description.join(', ')
      }`
    : `Detect the language and generate content based on the following ${
        isString ? 'description' : 'keywords'
      }, with maximum of 300 characters: "${
        isString ? cleanDescription : description.join(', ')
      }"`
  return prompt
}

export const generateAiTextModel = (req, res) => {
  const { promptText, directRequest } = req.body

  return openai.chat.completions
    .create({
      messages: [
        {
          role: 'user',
          content: _getPrompt(promptText, directRequest),
        },
      ],
      model: 'gpt-4-0125-preview',
    })
    .then((res) => {
      const _tokens = res.usage.completion_tokens + res.usage.prompt_tokens

      updateAiTokenLimitModel(req, res, _tokens)
      return {
        text: res.choices[0].message.content,
        tokens: _tokens,
      }
    })
    .catch((error) => {
      return Promise.reject(new AIError(error.message))
    })
}

export const generateTextFromImageModel = (req, res) => {
  const { images } = req.body

  const _images = images.map((imageUrl) => {
    return {
      type: 'image_url',
      image_url: {
        url: imageUrl,
      },
    }
  })

  return openai.chat.completions
    .create({
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Retrieve the content of the images and generate text based on the images(concat the content of images if input images are multiple). If there are any text in the images, then generate text based on the text in the images without additional descriptions. If there are any objects in the images, then generate text based on the objects in the images. If there are any people in the images, then generate text based on the people in the images. If there are any animals in the images, then generate text based on the animals in the images. If there are any plants in the images, then generate text based on the plants in the images. If there are any vehicles in the images, then generate text based on the vehicles in the images. If there are any buildings in the images, then generate text based on the buildings in the images. If there are any landscapes in the images, then generate text based on the landscapes in the images. If there are any food in the images, then generate text based on the food in the images.',
            },
            ..._images,
          ],
        },
      ],
      max_tokens: 300,
    })
    .then((res) => {
      const _tokens = res.usage.completion_tokens + res.usage.prompt_tokens

      updateAiTokenLimitModel(req, res, _tokens)
      return {
        text: res.choices[0].message.content,
        tokens: _tokens,
      }
    })
    .catch((error) => {
      return Promise.reject(new AIError(error.message))
    })
}
