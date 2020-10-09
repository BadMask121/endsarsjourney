/**
 *
 * Streaming tweets:
 *
 * when new tweets containing #EndSars #EndSarsProtests e.tc comes up then store to database
 * and send socket notification to update client of new tweets and what hashtags there are from
 *
 * For send notification
 *
 * cache latest tweet date and time
 * then check cached time and incoming tweet time if its after the cached time
 * then send tweet to socket
 *
 * For adding to database
 *
 * if tweet id already exists on database skip that tweet
 * else add the tweet to database
 */

import { twitter } from "../config";
import { ITwitter, Tweet } from "./@types/tweet";
import { HASHTAGS } from "./const";
import { addTweet } from "./services/tweet";

export default () => {
  HASHTAGS.forEach((o) => {
    const stream = twitter.stream("statuses/filter", {
      track: `#${o}`,
    });
    stream.on("tweet", (tweet) => runStream(o, tweet));
  });
};

function runStream(tag: string, tweet: ITwitter) {
  const tweetDoc: Tweet = {
    id: tweet.id,
    body: tweet.text,
    user: tweet.user,
    hashtag: tag,
    media: tweet.entities.media,
    timestamp: tweet.created_at,
  };
  addTweet(tweetDoc);
}
