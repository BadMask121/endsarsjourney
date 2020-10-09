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
import * as _ from "lodash";

import { twitter } from "../config";
import { ITwitter, Tweet } from "./@types/tweet";
import { HASHTAGS } from "./const";
import { addTweet } from "./services/tweet";

export default ({ withNotification }: { withNotification?: boolean }) => {
  HASHTAGS.forEach((o) => {
    const stream = twitter.stream("statuses/filter", {
      track: `#${o}`,
    });
    stream.on("tweet", (tweet) => runStream(o, tweet, withNotification));
  });
};

// @ts-ignore
function runStream(tag: string, tweet: ITwitter, withNotification = true) {
  // we want only tweets with media
  if (tweet?.entities?.media?.length >= 1 && tag) {
    /**
     * pick only need properties from media array
     */
    const media = _.map(
      tweet.entities.media,
      _.partialRight(_.pick, [
        "id",
        "id_str",
        "media_url_https",
        "media_url",
        "display_url",
        "type",
        "url",
      ])
    );

    const tweetDoc: Tweet = {
      id: tweet.id,
      body: tweet.text,
      user: {
        id: tweet.user.id,
        id_str: tweet.user.id_str,
        name: tweet.user.name,
        profile_image_url:
          tweet.user.profile_image_url_https ?? tweet.user.profile_image_url,
      },
      hashtag: `#${tag.toLowerCase()}`,
      media,
      timestamp: new Date(tweet.created_at).getTime(),
    };

    addTweet(tweetDoc);
  }
}
