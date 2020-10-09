"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __importStar(require("lodash"));
var config_1 = require("../config");
var const_1 = require("./const");
var tweet_1 = require("./services/tweet");
exports.default = (function (_a) {
    var withNotification = _a.withNotification;
    const_1.HASHTAGS.forEach(function (o) {
        var stream = config_1.twitter.stream("statuses/filter", {
            track: "#" + o,
        });
        stream.on("tweet", function (tweet) { return runStream(o, tweet, withNotification); });
    });
});
function runStream(tag, tweet, withNotification) {
    var _a, _b, _c;
    if (withNotification === void 0) { withNotification = true; }
    if (((_b = (_a = tweet === null || tweet === void 0 ? void 0 : tweet.entities) === null || _a === void 0 ? void 0 : _a.media) === null || _b === void 0 ? void 0 : _b.length) >= 1 && tag) {
        var media = _.map(tweet.entities.media, _.partialRight(_.pick, [
            "id",
            "id_str",
            "media_url_https",
            "media_url",
            "display_url",
            "type",
            "url",
        ]));
        var tweetDoc = {
            id: tweet.id,
            body: tweet.text,
            user: {
                id: tweet.user.id,
                id_str: tweet.user.id_str,
                name: tweet.user.name,
                profile_image_url: (_c = tweet.user.profile_image_url_https) !== null && _c !== void 0 ? _c : tweet.user.profile_image_url,
            },
            hashtag: "#" + tag.toLowerCase(),
            media: media,
            timestamp: new Date(tweet.created_at).getTime(),
        };
        tweet_1.addTweet(tweetDoc);
    }
}
//# sourceMappingURL=stream.js.map