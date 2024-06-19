import esbuild from "npm:esbuild@0.21.5";

const buildCtx = await esbuild.context({
  entryPoints: ["./src/index.jsx"],
  bundle: true,
  outdir: "./dist",
});

await buildCtx.watch();
console.log("Waiting for file changes...");
