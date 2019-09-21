export const fields = {
  name: {
    type: 'text',
    valType: 'string',
    label: 'Your name:',
    placeholder: 'Your name e.g. John Deux',
    minLength: 2,
    maxLength: 128,
  },
  email: {
    type: 'email',
    valType: 'string',
    label: 'Your email:',
    placeholder: 'Your email e.g. JDeux@example.com',
    minLength: 5,
    maxLength: 256,
  },
  subject: {
    type: 'text',
    valType: 'string',
    label: 'Message subject:',
    placeholder: 'Message subject e.g. Hi',
    minLength: 2,
    maxLength: 64,
  },
  message: {
    type: 'textarea',
    valType: 'string',
    label: 'Message:',
    placeholder: 'Your message',
    minLength: 1,
    maxLength: 256,
  },
}

export const fieldKeys = Object.keys(fields)
