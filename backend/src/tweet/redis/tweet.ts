import config from "../../config";
import redis from "redis";
import { ITweetRedisToken } from "../../../../@types/redis";
import { ERRORS } from "../const";

if (!config.redis.client)
  config.redis.client = redis.createClient(
    config.redis.options.port,
    config.redis.options.host
  );
const redisClient = config.redis.client;

export const addTweetToken = (
  tokenId: string,
  redisToken: ITweetRedisToken
) => {
  if (!tokenId || !redisToken.token) {
    console.error(`No token ID and token to be saved in redis`);
    return;
  }
  const redisKey1 = `TweetToken:${tokenId}`;
  redisClient.set(redisKey1, JSON.stringify(redisToken));
  return;
};

export const getTweetToken = async (
  tokenID: string
): Promise<ITweetRedisToken | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      const redisKey2 = `TweetToken:${tokenID}`;
      redisClient.get(redisKey2, (err: any, data: any) => {
        if (err) {
          console.error(err);
          reject(new Error(`Error occured, try again.`));
          return;
        }

        if (data) {
          const token = JSON.parse(data ?? {});
          resolve(token);
          return;
        }

        resolve(null);
        return;
      });
    } catch (error) {
      console.error(`Error: ${error}`);
      reject(new Error(ERRORS.CATCH_ERROR_MESSAGE));
      return;
    }
  });
};

export const deleteTweetToken = (tokenID: string) => {
  try {
    const redisKey3 = `TweetToken:${tokenID}`;
    redisClient.del(redisKey3);
    return;
  } catch (error) {
    console.error(error);
    return;
  }
};
