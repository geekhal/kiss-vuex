const { rollup } = require('rollup');
const { root } = require('./helpers');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const clean = require('rollup-plugin-clean');

// see below for details on the options
const inputOptions = {
    //...
    input: root('src/index.js'),
    external: [],
    plugins: [
        babel({
            babelrc: false,
            "plugins": [
                ["@babel/plugin-proposal-decorators", { legacy: true }]
            ],
            "presets": [
                [
                    "@babel/env",
                    {
                        "modules": false
                    }
                ]
            ]
        }),
        nodeResolve(),
        commonjs(),
        clean()
    ]
};
const outputOptions = {
    //...
    file: root('dist/bundle.js'),
    format: 'umd',
    name: 'EasyVuex',
    globals: {},
    sourcemap: true
};

async function build() {
  // create a bundle
  const bundle = await rollup(inputOptions);

//   console.log(bundle.imports); // an array of external dependencies
//   console.log(bundle.exports); // an array of names exported by the entry point
//   console.log(bundle.modules); // an array of module objects

  // generate code and a sourcemap
//   const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build();