import dotenv from "dotenv";
import admin from "firebase-admin";
import Twitter from "twit";
import { RedisClient } from "redis";
import Pusher from "pusher";
import * as functions from "firebase-functions";

dotenv.config();

// const firebaseconfig = require(process.env.FIREBASE_CONFIG) || null;
const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://tweq-5cbdb.firebaseio.com",
});

app.firestore().settings({ ignoreUndefinedProperties: true });

export const func = functions; // cloud function

export const db = app.firestore(); // firebase db

export const dev = process.env.NODE_ENV === "development";

// twitter api config
export const twitter = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
  strictSSL: !dev,
});

// pusher config
export const pusher = new Pusher({
  host: "api.pusherapp.com",
  useTLS: !dev,
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
});

const config = {
  hashSalt: 10,

  redis: {
    options: {
      host: process.env.REDISHOST || "localhost",
      port: Number(process.env.REDISPORT) || 6379,
    },
    client: (null as unknown) as RedisClient,
  },

  baseURL: process.env.BASE_URL,
};

export default config;

// export const FieldValue = FieldValue;
