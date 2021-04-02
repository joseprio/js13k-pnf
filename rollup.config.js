import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import html2 from "rollup-plugin-html2";
import serve from "rollup-plugin-serve";
import compiler from "@ampproject/rollup-plugin-closure-compiler";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const useClosureCompiler = process.env.CLOSURE_COMPILER;

// Should be safe enough; saves ~60 bytes
const transformConstToLet = {
  renderChunk(chunk) {
    return chunk.replace(/\bconst\b/g, "let");
  },
};

// This could be used to shave 4 more bytes
/*
const patchMinified = {
  renderChunk(chunk) {
    let processedChunk = chunk.trim();
    processedChunk = processedChunk.replace(/window\./g, "self.");
    if (processedChunk.endsWith(";")) {
      processedChunk = processedChunk.slice(0, -1);
    }
    return processedChunk;
  },
};
*/

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "cjs",
    preferConst: true,
    sourcemap: false,
  },
  plugins: [
    html2({
      template: "src/index.html",
    }),
    resolve(),
    transformConstToLet,
    production &&
      !useClosureCompiler &&
      terser({
        ecma: 2019,
        module: true,
        toplevel: true,
        compress: {
          passes: 5,
          keep_fargs: false,
          pure_getters: true,
          unsafe: true,
          unsafe_arrows: true,
          unsafe_comps: true,
          unsafe_math: true,
          unsafe_methods: true,
          unsafe_symbols: true,
          toplevel: true,
          booleans_as_integers: true,
        },
        // This is dangerous, and just brings a 200 byte benefit
        mangle: {
          properties: {
            keep_quoted: true,
          },
        },
        format: {
          wrap_func_args: false,
          semicolons: true,
          ecma: 2019,
          ascii_only: true,
        },
      }),
    production &&
      useClosureCompiler &&
      compiler({
        compilation_level: "ADVANCED",
      }),
    //patchMinified,
    !production &&
      serve({
        open: true,
        contentBase: "dist",
        host: "localhost",
        port: 8080,
      }),
  ],
};
