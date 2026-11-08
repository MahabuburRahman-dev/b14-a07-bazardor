import { getDb } from "@/lib/mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";

const google =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : {};
const github =
  process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
      }
    : {};

export const auth = betterAuth({
  appName: "বাজার দর",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "development-only-secret-change-this-before-deploying-123456",
  database: mongodbAdapter(getDb()),
  emailAndPassword: { enabled: true, minPasswordLength: 8 },
  socialProviders: { ...google, ...github },
  user: { changeEmail: { enabled: false } },
});
