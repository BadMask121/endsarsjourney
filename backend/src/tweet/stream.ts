/**
 *
 * Streaming tweets:
 *
 * when new tweets containing #EndSars #EndSarsProtests e.tc comes up then store to database
 * and send socket notification to update client of new tweets and what hashtags there are from
 */

import { twitter } from "../config";
import { ITwitter } from "./@types/tweet";
import { HASHTAGS } from "./const";
export default () => {
  HASHTAGS.forEach((o) => {
    const stream = twitter.stream("statuses/filter", {
      track: `#${o}`,
    });
    stream.on("tweet", runStream);
  });
};

function runStream(tweet: ITwitter) {
  console.log(tweet);
}
