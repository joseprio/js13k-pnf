import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import html2 from 'rollup-plugin-html2';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife', // immediately-invoked function expression — suitable for <script> tags
        sourcemap: false,
    },
    plugins: [
        html2({
            template: "src/index.html",
        }),
        resolve(), // tells Rollup how to find date-fns in node_modules
        commonjs(), // converts date-fns to ES modules
        production && terser() // minify, but only in production
    ]
};