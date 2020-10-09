import Twitter from "twit";
import { RedisClient } from "redis";
import Pusher from "pusher";
import * as functions from "firebase-functions";
export declare const func: typeof functions;
export declare const db: FirebaseFirestore.Firestore;
export declare const dev: boolean;
export declare const twitter: Twitter;
export declare const pusher: Pusher;
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
