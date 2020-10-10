import { db, pusher } from "../../config";
import { Tweet } from "../../../../@types/tweet";
import { COLLECTIONS } from "../const";

/**
 *
 * @function addTweet @private
 * @param tweet
 * add tweet to db
 */
export const addTweet = async (tweet: Tweet, withNotification?: boolean) => {
  try {
    const isExist = await checkIfTweetExists(tweet.id);
    if (!isExist) {
      const tweetQuery = await db.collection(COLLECTIONS.TWEETS).add(tweet);

      if (!tweetQuery) {
        return Promise.reject(new Error("Error writing to database"));
      }

      // send notification via pusher
      withNotification &&
        pusher.trigger("new-tweet-channel", "new-tweet", { tweet });

      return Promise.resolve(tweet.id);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Error writing to database"));
  }
  return Promise.resolve(null);
};

/**
 * @function getAllTweets
 * returns all tweets from database with or without tag name
 */
export const getAllTweets = async (
  tag?: string,
  cursor?: string
): Promise<{ counts: number; tweets: Tweet[] }> => {
  try {
    let tweetQuery = db.collection(COLLECTIONS.TWEETS);

    if (typeof tag !== "undefined") {
      tweetQuery = tweetQuery.where(
        "hashtag",
        "==",
        `#${tag.toLowerCase()}`
      ) as FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData
      >;
    }

    if (typeof cursor !== "undefined") {
      tweetQuery = tweetQuery
        .orderBy("timestamp", "desc")
        .startAfter(parseInt(cursor)) as FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData
      >;
    }

    const tweetDocs = await tweetQuery.limit(20).get(); // limit to 20 per scroll
    if (tweetDocs.size <= 0) {
      return Promise.reject(new Error("Tweets not found"));
    }

    const tweets: Tweet[] = [];

    // waits for all data to be gathered
    await new Promise((resolve) => {
      tweetDocs.docs.forEach((o) => {
        const data = o.data() as Tweet;
        tweets.push(data);
      });
      if (tweets.length === tweetDocs.size) resolve(tweets);
    });

    return Promise.resolve({ counts: tweets.length, tweets });
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Tweet not found"));
  }
};

/**
 *
 * @param id
 *  get tweet by id
 */
export const getTweetByID = async (id: string): Promise<Tweet> => {
  try {
    const tweetQuery = await db
      .collection(COLLECTIONS.TWEETS)
      .where("id", "==", id)
      .get();

    if (tweetQuery.size <= 0) {
      return Promise.reject(new Error("Tweet not found"));
    }
    const data = tweetQuery.docs[0].data() as Tweet; // gets first data only

    return Promise.resolve(data);
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Tweet not found"));
  }
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
