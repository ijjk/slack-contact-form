import fetch from 'isomorphic-unfetch'
import { fields, fieldKeys } from '../../lib/fields'

const handleError = (res, message, status = 400) => {
  res.statusCode = status
  res.json({ status: 'error', message })
}

export default async (req, res) => {
  if (!req.body || req.method !== 'POST') {
    return handleError(res, 'Invalid request')
  }
  const invalidFields = []
  let message = ''

  for (const key of fieldKeys) {
    const field = fields[key]
    const val = req.body[key]
    if (
      typeof val !== field.valType ||
      (field.minLength && val.length < field.minLength) ||
      (field.maxLength && field.maxLength < val.length)
    ) {
      invalidFields.push(key)
    } else {
      if (message.length) message += '\n'
      message += `${key}: ${val}`
    }
  }

  if (invalidFields.length) {
    return handleError(
      res,
      `Received invalid fields: ${invalidFields.join(', ')}`
    )
  }

  try {
    const messageRes = await fetch(
      `${process.env.SLACK_ENDPOINT}/chat.postMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
        },
        body: JSON.stringify({
          channel: process.env.CHANNEL_ID,
          text: message,
        }),
      }
    )

    if (!messageRes.ok) {
      throw new Error(
        `request failed with status ${
          res.status
        }: ${await messageRes.text().substr(0, 50)}`
      )
    }
    return res.json({ status: 'ok' })
  } catch (err) {
    const errorMessage = 'Failed to send Slack message'
    console.error(errorMessage, err)
    return handleError(res, errorMessage, 500)
  }
}
