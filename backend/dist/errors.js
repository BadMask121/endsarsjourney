"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.succesRes = exports.catchError = void 0;
function default_1(error) {
    return {
        status: "error",
        code: 500,
        error: error,
        message: "Server related errors",
        data: null,
    };
}
exports.default = default_1;
exports.catchError = function (err, res, code) {
    var e_1, _a, e_2, _b;
    var _c, _d;
    var error = err;
    if (error !== null && typeof error === "object" && !Array.isArray(error)) {
        var errorEngine = [];
        try {
            for (var _e = __values(Object.entries(error)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var _g = __read(_f.value, 2), key = _g[0], value = _g[1];
                if (key === "errors") {
                    try {
                        for (var _h = (e_2 = void 0, __values(value)), _j = _h.next(); !_j.done; _j = _h.next()) {
                            var errorElement = _j.value;
                            errorEngine.push({
                                param: (_c = errorElement === null || errorElement === void 0 ? void 0 : errorElement.field_name) !== null && _c !== void 0 ? _c : null,
                                msg: (_d = errorElement === null || errorElement === void 0 ? void 0 : errorElement.message) !== null && _d !== void 0 ? _d : null,
                            });
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        error = errorEngine;
    }
    if (typeof err === "string" && err.startsWith("Value for argument"))
        error = "Invalid arguments.";
    if (typeof err === "string" &&
        err.startsWith("Cannot use 'in' operator to search for")) {
        error = err.substring(49);
    }
    res.status(400).json({
        status: "fail",
        code: code !== null && code !== void 0 ? code : 400,
        error: error ? true : false,
        message: error,
        data: null,
    });
    return 0;
};
exports.succesRes = function (message, res, data, meta) {
    return res.status(200).json({
        code: 200,
        status: "success",
        message: message,
        data: data !== null && data !== void 0 ? data : {},
        meta: meta,
    });
};
//# sourceMappingURL=errors.js.map