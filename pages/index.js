import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/layout'
import { fields, fieldKeys } from '../lib/fields'

const handleSubmit = async (e, pending, setPending, setMessage) => {
  e.preventDefault()
  if (pending) return

  const data = {}
  const els = []
  let incomplete = false

  for (const key of fieldKeys) {
    const el = document.querySelector(`form #${key}`)
    els.push(el)
    data[key] = (el.value || '').trim()
    incomplete |= data[key].length === 0
  }

  if (incomplete) return
  setPending(true)
  setMessage(null)

  // clear the fields
  els.forEach(el => {
    el.value = ''
  })

  try {
    const res = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const { message } = await res.json()
      setMessage(message)
    } else {
      setMessage('Message sent!')
    }
  } catch (error) {
    console.error(error)
    setMessage('Error occurred sending message')
  }
  setPending(false)
}

export default () => {
  const [message, setMessage] = useState(null)
  const [pending, setPending] = useState(false)

  return (
    <Layout>
      <div className="container head">
        <div className="columns">
          <div className="column col-auto">
            <img src="/logo.png" height="125" width="125" className="logo" />
          </div>
          <div className="column col title">
            <h2>Send me a message on Slack</h2>
          </div>
        </div>
      </div>

      <form
        className="container"
        onSubmit={e => handleSubmit(e, pending, setPending, setMessage)}
      >
        {fieldKeys.map(key => {
          const field = fields[key]
          return (
            <div className="form-group" key={key}>
              <label className="form-label" htmlFor={key}>
                {field.label}
              </label>
              {React.createElement(
                field.type === 'textarea' ? 'textarea' : 'input',
                {
                  id: key,
                  type: field.type,
                  className: 'form-input',
                  minLength: field.minLength,
                  maxLength: field.maxLength,
                  placeholder: field.placeholder,
                }
              )}
            </div>
          )
        })}
        {message && <p>{message}</p>}
        <button className="btn btn-primary btn-lg" type="submit">
          {pending ? <div className="spinner" /> : 'Send'}
        </button>
      </form>

      <style jsx>{`
        .container {
          max-width: 650px;
          margin: 0 auto;
        }

        .head {
          margin: 7% auto 0;
        }

        form.container {
          margin: 20px auto;
        }

        form button {
          display: block;
          margin: 10px 0 0 auto;
        }

        .title {
          display: flex;
          padding: 0 0 0 10px;
          flex-direction: column;
          justify-content: flex-end;
        }

        .logo {
          border-radius: 100%;
          box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.25);
        }

        .spinner {
          height: 15px;
          width: 15px;
          border-radius: 15px;
          border: 1px solid #ffffff;
          border-top: none;
          border-left: none;
          animation: spin 500ms linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Layout>
  )
}
