import * as admin from "firebase-admin";

if (
  !process.env.TYPE ||
  !process.env.PROJECT_ID ||
  !process.env.PRIVATE_KEY_ID ||
  !process.env.PRIVATE_KEY ||
  !process.env.CLIENT_EMAIL ||
  !process.env.CLIENT_ID ||
  !process.env.AUTH_URI ||
  !process.env.TOKEN_URI ||
  !process.env.AUTH_PROVIDER_CERT_URL ||
  !process.env.CLIENT_CERT_URL
) {
  throw new Error("Faltan algunas variables de entorno requeridas.");
}

const {
  TYPE,
  PROJECT_ID,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_CERT_URL,
  CLIENT_CERT_URL,
} = process.env;

const serviceAccount = {
  type: TYPE,
  project_id: PROJECT_ID,
  private_key_id: PRIVATE_KEY_ID,
  private_key: PRIVATE_KEY?.replace(/\\n/g, "\n"),
  client_email: CLIENT_EMAIL,
  client_id: CLIENT_ID,
  auth_uri: AUTH_URI,
  token_uri: TOKEN_URI,
  auth_provider_x509_cert_url: AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: CLIENT_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const auth = admin.auth();
