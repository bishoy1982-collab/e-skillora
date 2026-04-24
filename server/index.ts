import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";

const app = express();
app.set("trust proxy", 1); // Railway / Heroku reverse proxy
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// Raw body for Stripe webhooks
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false }));

// Security headers
app.use((_req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// Session store
const PgSession = connectPgSimple(session);
app.use(
  session({
    store: new PgSession({ pool, tableName: "user_sessions_store", createTableIfMissing: true }),
    secret: process.env.SESSION_SECRET || "eskillora-secret-change-in-production",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "lax",
    },
  })
);

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  // Ensure additional tables exist (safe CREATE IF NOT EXISTS)
  try {
    // Session store table (connect-pg-simple schema)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_sessions_store (
        sid VARCHAR NOT NULL COLLATE "default" PRIMARY KEY,
        sess JSON NOT NULL,
        expire TIMESTAMP(6) NOT NULL
      )
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS user_sessions_store_expire_idx ON user_sessions_store (expire)
    `);
    // Schema migrations — add missing columns safely
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS plan_type TEXT`);
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS beta_tester BOOLEAN DEFAULT false`);
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS beta_granted_at TIMESTAMP`);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS beta_invites (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        granted_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS children (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        age INTEGER,
        placed_level TEXT,
        floor_override_applied BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, name, age)
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS child_streaks (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR NOT NULL REFERENCES users(id),
        child_id TEXT NOT NULL,
        current_streak INTEGER DEFAULT 0,
        longest_streak INTEGER DEFAULT 0,
        last_practice_date TEXT,
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, child_id)
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS custom_questions (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        level TEXT NOT NULL,
        subject TEXT NOT NULL DEFAULT 'math',
        theme TEXT,
        difficulty TEXT DEFAULT 'medium',
        type TEXT NOT NULL DEFAULT 'input',
        question TEXT NOT NULL,
        options TEXT,
        answer TEXT NOT NULL,
        hint TEXT,
        explanation TEXT,
        override_id TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS app_config (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    // Seed default config values
    await pool.query(`
      INSERT INTO app_config (key, value) VALUES ('daily_q', '50'), ('days_per_level', '60')
      ON CONFLICT (key) DO NOTHING
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS page_events (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        event TEXT NOT NULL,
        ip_hash TEXT,
        referrer TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS page_events_event_created_idx ON page_events (event, created_at)
    `);
  } catch (e) {
    console.error("Migration warning:", e);
  }

  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Internal Server Error:", err);
    if (res.headersSent) return next(err);
    return res.status(status).json({ message });
  });

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen({ port, host: "0.0.0.0", reusePort: true }, () => {
    log(`serving on port ${port}`);
  });
})();
