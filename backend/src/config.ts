import dotenv from "dotenv";
import admin from "firebase-admin";
import Twitter from "twit";
import { RedisClient } from "redis";

dotenv.config();

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

app.firestore().settings({ ignoreUndefinedProperties: true });

export const db = app.firestore();

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

const config = {
  hashSalt: 10,

  jwt: {
    secret: {
      authTokenVerification: "testing api",
    },
  },

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
