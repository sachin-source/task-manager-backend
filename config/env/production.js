'use strict';

/**
 * Expose
 */

const port = process.env.PORT || 3000;

module.exports = {
  db: process.env.MONGODB_URL || 'mongodb+srv://DeepakShetty:DeepakShetty@cluster0.utahtvi.mongodb.net/?retryWrites=true&w=majority',
  jwtSecretKey: process.env.MONGODB_URL || 'HiMyZilPil@$mylove$me',
  twitter: {
    clientID: process.env.TWITTER_CLIENTID,
    clientSecret: process.env.TWITTER_SECRET,
    callbackURL: `http://localhost:${port}/auth/twitter/callback/`
  },
  github: {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `http://localhost:${port}/auth/github/callback`
  },
  linkedin: {
    clientID: process.env.LINKEDIN_CLIENTID,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: `http://localhost:${port}/auth/linkedin/callback`
  },
  google: {
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `http://localhost:${port}/auth/google/callback`
  }
};