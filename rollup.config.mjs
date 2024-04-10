import { nodeResolve } from '@rollup/plugin-node-resolve';
// cjs plugin
import commonjs from '@rollup/plugin-commonjs';
// json
import json from '@rollup/plugin-json';
// rollup.config.js
export default {
    input: 'src/index.mjs',
    output: [
        {
            dir: 'dist',
            format: 'cjs'
        }
    ],
    plugins: [nodeResolve({
        preferBuiltins: true
    }),
    json(),
    commonjs({
        include: 'node_modules/**'
    })]
};