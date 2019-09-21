# Slack Contact Form Demo

Shows example contact form that sends messages to a Slack channel

## Getting Started

1. Clone this app `git clone git@github.com:ijjk/slack-contact-form.git`
2. Install dependencies `cd slack-contact-form; yarn`
3. Start next exposing `SLACK_TOKEN` and `CHANNEL_ID`, `SLACK_TOKEN='TOKEN' CHANNEL_ID='id' yarn next`

## Deploying

1. Add secrets to `now` with `now secrets add slack-token 'TOKEN'` and `now secrets add slack-channel-id 'id'`
2. Deploy it by running `now` in the project's root
3. Enjoy

## Getting channel id

You can get find the channel id using the `conversations.list` Slack API endpoint.

Example: `curl https://ijjk.slack.com/api/conversations.list --form token='SLACK_TOKEN'`

## Potential improvements

- Add emoji previewing in the form to allow seeing Slack emojis in the textarea
- Add spam prevention by storing hash of sender's IP in the message and looking up the messages for previous messages sent with the IP's hash