"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const admin = __importStar(require("firebase-admin"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
if (!process.env.TYPE ||
    !process.env.PROJECT_ID ||
    !process.env.PRIVATE_KEY_ID ||
    !process.env.PRIVATE_KEY ||
    !process.env.CLIENT_EMAIL ||
    !process.env.CLIENT_ID ||
    !process.env.AUTH_URI ||
    !process.env.TOKEN_URI ||
    !process.env.AUTH_PROVIDER_CERT_URL ||
    !process.env.CLIENT_CERT_URL) {
    throw new Error("Faltan algunas variables de entorno requeridas.");
}
const { TYPE, PROJECT_ID, PRIVATE_KEY_ID, PRIVATE_KEY, CLIENT_EMAIL, CLIENT_ID, AUTH_URI, TOKEN_URI, AUTH_PROVIDER_CERT_URL, CLIENT_CERT_URL, } = process.env;
const serviceAccount = {
    type: TYPE,
    project_id: PROJECT_ID,
    private_key_id: PRIVATE_KEY_ID,
    private_key: PRIVATE_KEY === null || PRIVATE_KEY === void 0 ? void 0 : PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: CLIENT_EMAIL,
    client_id: CLIENT_ID,
    auth_uri: AUTH_URI,
    token_uri: TOKEN_URI,
    auth_provider_x509_cert_url: AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: CLIENT_CERT_URL,
};
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
exports.auth = admin.auth();
