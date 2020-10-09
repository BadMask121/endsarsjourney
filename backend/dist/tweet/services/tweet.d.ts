import { Tweet } from "../@types/tweet";
export declare const addTweet: (tweet: Tweet) => Promise<any>;
export declare const getAllTweets: (tag?: string, cursor?: string) => Promise<{
    counts: number;
    tweets: Tweet[];
}>;
export declare const getTweetByID: (id: string) => Promise<Tweet>;
export declare const checkIfTweetExists: (id: string) => Promise<boolean>;
