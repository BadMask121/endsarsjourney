import express from "express";
import * as tweetCTRL from "../controllers/tweet";

const router = express.Router();

router.route("/").get(tweetCTRL.getTweets);

export default router;
