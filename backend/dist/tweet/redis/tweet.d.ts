import { ITweetRedisToken } from "../@types/redis";
export declare const addTweetToken: (tokenId: string, redisToken: ITweetRedisToken) => void;
export declare const getTweetToken: (tokenID: string) => Promise<ITweetRedisToken | null>;
export declare const deleteTweetToken: (tokenID: string) => void;
