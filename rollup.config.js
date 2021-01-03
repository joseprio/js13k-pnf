import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import html2 from "rollup-plugin-html2";
import serve from "rollup-plugin-serve";
import compiler from "@ampproject/rollup-plugin-closure-compiler";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;
const useClosureCompiler = process.env.CLOSURE_COMPILER;

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "iife", // immediately-invoked function expression — suitable for <script> tags
    preferConst: true,
    sourcemap: false,
  },
  plugins: [
    html2({
      template: "src/index.html",
    }),
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    production &&
      !useClosureCompiler &&
      terser({
        ecma: 9,
        module: true,
        toplevel: true,
        compress: {
          passes: 10,
          keep_fargs: false,
          pure_getters: true,
          unsafe: true,
          unsafe_arrows: true,
          unsafe_comps: true,
          unsafe_math: true,
          unsafe_methods: true,
          unsafe_symbols: true,
        },
        // This is dangerous, and just brings a 200 byte benefit
        mangle: {
          properties: {
            keep_quoted: true,
          },
        },
        format: {
          wrap_func_args: false,
          quote_style: 1,
        },
      }),
    production &&
      useClosureCompiler &&
      compiler({
        compilation_level: "ADVANCED",
      }),
    !production &&
      serve({
        open: true,
        contentBase: "dist",
        host: "localhost",
        port: 8080,
      }),
  ],
};
