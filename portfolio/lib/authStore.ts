import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: "admin";
  salt: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminAuthStore {
  users: AdminUser[];
}

const DEFAULT_ADMIN_USERNAME = "admin";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD || "AdminPassword2026!";

function getAuthStorePath(): string {
  return path.join(process.cwd(), "app", "data", "adminAuth.json");
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

/**
 * Initializes and reads the admin auth store from app/data/adminAuth.json
 */
export function getAdminAuthStore(): AdminAuthStore {
  const filePath = getAuthStorePath();

  if (!fs.existsSync(filePath)) {
    const salt = generateSalt();
    const passwordHash = hashPassword(DEFAULT_ADMIN_PASSWORD, salt);

    const initialStore: AdminAuthStore = {
      users: [
        {
          id: "admin-emon-01",
          username: DEFAULT_ADMIN_USERNAME,
          email: "admin@emonmiah.com",
          name: "MD. Emon Miah",
          role: "admin",
          salt,
          passwordHash,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    };

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(initialStore, null, 2), "utf-8");
    return initialStore;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as AdminAuthStore;
  } catch (err) {
    console.error("[AuthStore] Failed to read adminAuth.json:", err);
    return { users: [] };
  }
}

/**
 * Saves auth store to app/data/adminAuth.json
 */
export function saveAdminAuthStore(store: AdminAuthStore): void {
  const filePath = getAuthStorePath();
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(store, null, 2), "utf-8");
}

/**
 * Verifies credentials against app/data/adminAuth.json
 */
export async function verifyAdminCredentials(
  identifier: string,
  plainTextPassword: string
): Promise<Omit<AdminUser, "salt" | "passwordHash"> | null> {
  const store = getAdminAuthStore();
  const cleanId = identifier.trim().toLowerCase();

  const user = store.users.find(
    (u) =>
      u.username.toLowerCase() === cleanId ||
      u.email.toLowerCase() === cleanId
  );

  if (!user) {
    return null;
  }

  const computedHash = hashPassword(plainTextPassword, user.salt);
  if (crypto.timingSafeEqual(Buffer.from(computedHash, "hex"), Buffer.from(user.passwordHash, "hex"))) {
    const { salt: _s, passwordHash: _p, ...safeUser } = user;
    return safeUser;
  }

  return null;
}

/**
 * Changes password for an existing admin user
 */
export function updateAdminPassword(
  username: string,
  newPlainTextPassword: string
): boolean {
  const store = getAdminAuthStore();
  const cleanUser = username.trim().toLowerCase();
  const user = store.users.find((u) => u.username.toLowerCase() === cleanUser);

  if (!user) {
    return false;
  }

  const newSalt = generateSalt();
  const newHash = hashPassword(newPlainTextPassword, newSalt);

  user.salt = newSalt;
  user.passwordHash = newHash;
  user.updatedAt = new Date().toISOString();

  saveAdminAuthStore(store);
  return true;
}

/**
 * Get safe list of admin users (no hashes or salts)
 */
export function getSafeAdminUsers(): Array<Omit<AdminUser, "salt" | "passwordHash">> {
  const store = getAdminAuthStore();
  return store.users.map(({ salt: _s, passwordHash: _p, ...safe }) => safe);
}
