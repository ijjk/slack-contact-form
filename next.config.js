module.exports = {
  webpack: (config, { defaultLoaders }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'global',
          },
        },
      ],
    })

    return config
  },

  experimental: {
    publicDirectory: true,
  },

  env: {
    CHANNEL_ID: process.env.CHANNEL_ID,
    SLACK_TOKEN: process.env.SLACK_TOKEN,
    SLACK_ENDPOINT: 'https://ijjk.slack.com/api',
  },
}
