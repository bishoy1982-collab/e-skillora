import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";

const allowlist = [
  "bcrypt",
  "connect-pg-simple",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-session",
  "pg",
  "stripe",
  "zod",
  "zod-validation-error",
];

// Packages not in package.json that esbuild will try to bundle transitively.
// These are optional/peer deps of native modules and must be forced external.
const forceExternal = [
  "./vite",          // dev-only local module, never needed in prod server bundle
  "@mapbox/node-pre-gyp",
  "mock-aws-s3",
  "aws-sdk",
  "nock",
];

async function buildAll() {
  await rm("dist", { recursive: true, force: true });
  await viteBuild();

  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];

  const external = [
    ...forceExternal,
    ...allDeps.filter((d) => !allowlist.includes(d)),
  ];

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    minify: true,
    external,
    // Suppress warnings for .html files inside native module utility dirs
    loader: { ".html": "empty" },
    logLevel: "info",
  });
}

buildAll().catch((e) => {
  console.error(e);
  process.exit(1);
});
