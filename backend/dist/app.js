"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var tweet_1 = __importDefault(require("./tweet/routes/tweet"));
var config_cors_1 = require("./config-cors");
var stream_1 = __importDefault(require("./tweet/stream"));
stream_1.default({ withNotification: true });
var app = express_1.default();
app.use(cors_1.default(config_cors_1.corsOption));
app.use(morgan_1.default("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use("/tweets", tweet_1.default);
var PORT = process.env.PORT || 8080;
app.use(function (req, res) {
    res.status(403).send("Route not found").end();
});
app.listen(PORT, function () {
    console.log("App listening on port " + PORT + " for " + process.env.NODE_ENV + " environment");
    console.log("Press Ctrl+C to quit.");
});
exports.default = app;
//# sourceMappingURL=app.js.map