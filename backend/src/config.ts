import dotenv from "dotenv";
import admin from "firebase-admin";
import { RedisClient } from "redis";

dotenv.config();
const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
app.firestore().settings({ ignoreUndefinedProperties: true });
export const db = app.firestore();

export const dev = process.env.NODE_ENV !== "development";
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
