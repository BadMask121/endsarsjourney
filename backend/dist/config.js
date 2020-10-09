"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitter = exports.dev = exports.db = exports.func = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var twit_1 = __importDefault(require("twit"));
var functions = __importStar(require("firebase-functions"));
dotenv_1.default.config();
var app = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault(),
    databaseURL: "https://tweq-5cbdb.firebaseio.com",
});
app.firestore().settings({ ignoreUndefinedProperties: true });
exports.func = functions;
exports.db = app.firestore();
exports.dev = process.env.NODE_ENV === "development";
exports.twitter = new twit_1.default({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,
    strictSSL: !exports.dev,
});
var config = {
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
        client: null,
    },
    baseURL: process.env.BASE_URL,
};
exports.default = config;
//# sourceMappingURL=config.js.map