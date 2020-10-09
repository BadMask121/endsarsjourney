import Twitter from "twit";
import { RedisClient } from "redis";
import * as functions from "firebase-functions";
export declare const func: typeof functions;
export declare const db: FirebaseFirestore.Firestore;
export declare const dev: boolean;
export declare const twitter: Twitter;
declare const config: {
    hashSalt: number;
    jwt: {
        secret: {
            authTokenVerification: string;
        };
    };
    redis: {
        options: {
            host: string;
            port: number;
        };
        client: RedisClient;
    };
    baseURL: string;
};
export default config;
