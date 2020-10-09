import { db } from "../../config";

import { Tweet } from "../@types/tweet";
import { COLLECTIONS } from "../const";

/**
 *
 * @param tweet
 * add tweet to db
 */
export const addTweet = async (tweet: Tweet) => {
  const isExist = await checkIfTweetExists(tweet.id);
  if (!isExist) {
    const tweetQuery = await db
      .collection(COLLECTIONS.TWEETS)
      .doc(tweet.id)
      .set(tweet);

    if (!tweetQuery) {
      return Promise.reject(new Error("Error writing to database"));
    }

    return Promise.resolve(tweet.id);
  }

  return Promise.resolve(null);
};

/**
 *
 * @param id
 *  get tweet by id
 */
export const getTweetByID = async (id: string): Promise<Tweet> => {
  const tweetQuery = await db.collection(COLLECTIONS.TWEETS).doc(id).get();
  if (!tweetQuery.exists) {
    return Promise.reject(new Error("Tweet not found"));
  }
  const data = tweetQuery.data() as Tweet;

  return Promise.resolve(data);
};

/**
 *
 * @param id
 *
 * checks if tweet exsits
 */
export const checkIfTweetExists = (id: string) => {
  return getTweetByID(id)
    .then(() => {
      return Promise.resolve(true);
    })
    .catch(() => {
      return Promise.resolve(false);
    });
};
