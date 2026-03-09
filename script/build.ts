import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";
const allowlist = ["bcrypt","connect-pg-simple","drizzle-orm","drizzle-zod","express","express-session","pg","stripe","zod","zod-validation-error"];
async function buildAll() {
  await rm("dist", { recursive: true, force: true });
  await viteBuild();
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [...Object.keys(pkg.dependencies||{}), ...Object.keys(pkg.devDependencies||{})];
  await esbuild({ entryPoints:["server/index.ts"], platform:"node", bundle:true, format:"cjs", outfile:"dist/index.cjs", minify:true, external:allDeps.filter(d=>!allowlist.includes(d)), logLevel:"info" });
}
buildAll().catch(e=>{console.error(e);process.exit(1);});
