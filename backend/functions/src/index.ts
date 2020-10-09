import { func } from "../../src/config";
import streamTweets from "./pubsubs/stream";

export const publishNewTweets = func.pubsub
  .schedule("every 2 minutes")
  .onRun(streamTweets);
