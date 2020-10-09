"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfTweetExists = exports.getTweetByID = exports.getAllTweets = exports.addTweet = void 0;
var config_1 = require("../../config");
var const_1 = require("../const");
exports.addTweet = function (tweet) { return __awaiter(void 0, void 0, void 0, function () {
    var isExist, tweetQuery, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4, exports.checkIfTweetExists(tweet.id)];
            case 1:
                isExist = _a.sent();
                if (!!isExist) return [3, 3];
                return [4, config_1.db.collection(const_1.COLLECTIONS.TWEETS).add(tweet)];
            case 2:
                tweetQuery = _a.sent();
                if (!tweetQuery) {
                    return [2, Promise.reject(new Error("Error writing to database"))];
                }
                return [2, Promise.resolve(tweet.id)];
            case 3: return [3, 5];
            case 4:
                error_1 = _a.sent();
                console.error(error_1);
                return [2, Promise.reject(new Error("Error writing to database"))];
            case 5: return [2, Promise.resolve(null)];
        }
    });
}); };
exports.getAllTweets = function (tag, cursor) { return __awaiter(void 0, void 0, void 0, function () {
    var tweetQuery, tweetDocs_1, tweets_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                tweetQuery = config_1.db.collection(const_1.COLLECTIONS.TWEETS);
                if (typeof tag !== "undefined") {
                    tweetQuery = tweetQuery.where("hashtag", "==", "#" + tag.toLowerCase());
                }
                if (typeof cursor !== "undefined") {
                    tweetQuery = tweetQuery
                        .orderBy("timestamp", "desc")
                        .startAfter(parseInt(cursor))
                        .limit(20);
                }
                return [4, tweetQuery.get()];
            case 1:
                tweetDocs_1 = _a.sent();
                if (tweetDocs_1.size <= 0) {
                    return [2, Promise.reject(new Error("Tweets not found"))];
                }
                tweets_1 = [];
                return [4, new Promise(function (resolve) {
                        tweetDocs_1.docs.forEach(function (o) {
                            var data = o.data();
                            tweets_1.push(data);
                        });
                        if (tweets_1.length === tweetDocs_1.size)
                            resolve(tweets_1);
                    })];
            case 2:
                _a.sent();
                return [2, Promise.resolve({ counts: tweets_1.length, tweets: tweets_1 })];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                return [2, Promise.reject(new Error("Tweet not found"))];
            case 4: return [2];
        }
    });
}); };
exports.getTweetByID = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var tweetQuery, data, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, config_1.db
                        .collection(const_1.COLLECTIONS.TWEETS)
                        .where("id", "==", id)
                        .get()];
            case 1:
                tweetQuery = _a.sent();
                if (tweetQuery.size <= 0) {
                    return [2, Promise.reject(new Error("Tweet not found"))];
                }
                data = tweetQuery.docs[0].data();
                return [2, Promise.resolve(data)];
            case 2:
                error_3 = _a.sent();
                console.error(error_3);
                return [2, Promise.reject(new Error("Tweet not found"))];
            case 3: return [2];
        }
    });
}); };
exports.checkIfTweetExists = function (id) {
    return exports.getTweetByID(id)
        .then(function () {
        return Promise.resolve(true);
    })
        .catch(function () {
        return Promise.resolve(false);
    });
};
//# sourceMappingURL=tweet.js.map