"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOption = void 0;
var allowedOrigins = ["http://localhost:3300", "http://localhost:3000"];
exports.corsOption = {
    origin: function (origin, callback) {
        if (!origin) {
            callback(null, true);
            return;
        }
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "The CORS policy for this site does not ' +\n                'allow access from the specified Origin. -" + origin;
            callback(new Error(msg), false);
            return;
        }
        callback(null, true);
        return;
    },
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
    credentials: true,
};
//# sourceMappingURL=config-cors.js.map