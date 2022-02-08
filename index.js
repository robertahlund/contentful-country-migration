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
exports.__esModule = true;
var contentful_migration_1 = require("./contentful-migration");
var fs = require("fs").promises;
var svPath = "./data/sv/world.json";
var daPath = "./data/da/world.json";
var enPath = "./data/en/world.json";
var outputPath = "./output/output.json";
function getSwedish() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, fs.readFile(svPath)];
                case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()).toString()]).map(function (data) {
                        return {
                            id: data.id,
                            code: data.alpha2,
                            name: data.name
                        };
                    })];
            }
        });
    });
}
function getEnglish() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, fs.readFile(enPath)];
                case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()).toString()]).map(function (data) {
                        return {
                            id: data.id,
                            code: data.alpha2,
                            name: data.name
                        };
                    })];
            }
        });
    });
}
function getDanish() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, fs.readFile(daPath)];
                case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()).toString()]).map(function (data) {
                        return {
                            id: data.id,
                            code: data.alpha2,
                            name: data.name
                        };
                    })];
            }
        });
    });
}
(function exportFile() {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var countryData, svData, enData, daData, id, _loop_1, _i, svData_1, data, contentfulMigration;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    countryData = [];
                    return [4 /*yield*/, getSwedish()];
                case 1:
                    svData = _e.sent();
                    return [4 /*yield*/, getEnglish()];
                case 2:
                    enData = _e.sent();
                    return [4 /*yield*/, getDanish()];
                case 3:
                    daData = _e.sent();
                    id = 1;
                    _loop_1 = function (data) {
                        countryData.push({
                            id: id,
                            sv: data.name,
                            en: (_b = (_a = enData.find(function (_data) { return _data.code === data.code; })) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "",
                            da: (_d = (_c = daData.find(function (_data) { return _data.code === data.code; })) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : "",
                            code: data.code.toUpperCase()
                        });
                        id++;
                    };
                    for (_i = 0, svData_1 = svData; _i < svData_1.length; _i++) {
                        data = svData_1[_i];
                        _loop_1(data);
                    }
                    return [4 /*yield*/, fs.writeFile(outputPath, JSON.stringify(countryData))];
                case 4:
                    _e.sent();
                    return [4 /*yield*/, contentful_migration_1.ContentfulMigration.init()];
                case 5:
                    contentfulMigration = _e.sent();
                    return [4 /*yield*/, contentfulMigration.syncCountries(countryData)];
                case 6:
                    _e.sent();
                    process.exit(1);
                    return [2 /*return*/];
            }
        });
    });
})();
