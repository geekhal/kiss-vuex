const { rollup } = require("rollup");
const { root } = require("./helpers");
const fs = require("fs");
const { Buffer } = require("buffer");
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const babel = require("rollup-plugin-babel");
const clean = require("rollup-plugin-clean");
const aliasPlugin = require("rollup-plugin-alias");
const progressPlugin = require("rollup-plugin-progress");
const replacePlugin = require("rollup-plugin-replace");
const uglifyPlugin = require("rollup-plugin-uglify");
const sizePlugin = require("rollup-plugin-filesize");

const pkg = require("../package.json");
const distDirName = "dist";
const pkgName = pkg.name;
const pkgVersion = pkg.version;
const pkgAuthor = pkg.author;
const pkgLicense = pkg.license;

const ENCODING = "utf-8";

const banner =
    "/*!\n" +
    ` * ${pkgName}.js v${pkgVersion}\n` +
    " * (c) 2018-" +
    new Date().getFullYear() +
    ` ${pkgAuthor}\n` +
    ` * Released under the ${pkgLicense} License.\n` +
    " */";

// see below for details on the options
const baseInputOptions = {
    //...
    input: root("src/index.js"),
    external: ["vue", "vuex"],
    plugins: [
        babel({
            babelrc: false,
            ...require("../.babelrc")
        }),
        nodeResolve(),
        commonjs(),
        clean(),
        aliasPlugin({
            src: root("src")
        }),
        progressPlugin(),
        replacePlugin({
            VERSION: `"${pkgVersion}"`
        })
    ]
};

const baseOutputOptions = {
    //...
    file: root(`${distDirName}/${pkgName}.js`),
    format: "umd",
    name: "EasyVuex",
    globals: {},
    sourcemap: true,
    banner
};

const createBundle = function createBundle(
    inputOptions = {},
    outputOptions = {}
) {
    const bundle = {
        inputOptions: {
            input: inputOptions.input || baseInputOptions.input,
            external: [].concat(
                baseInputOptions.external,
                inputOptions.external
            ),
            plugins: [].concat(baseInputOptions.plugins, inputOptions.plugins)
        },
        outputOptions: Object.assign({}, baseOutputOptions, outputOptions)
    };
    return bundle;
};

const bundles = [
    createBundle(
        {
            plugins: [
                sizePlugin({ showMinifiedSize: false, showGzippedSize: true })
            ]
        },
        {
            file: root(`${distDirName}/${pkgName}.js`),
            format: "umd"
        }
    ),
    createBundle(
        {
            plugins: [
                sizePlugin({ showMinifiedSize: false, showGzippedSize: true }),
                uglifyPlugin.uglify()
            ]
        },
        {
            file: root(`${distDirName}/${pkgName}.min.js`),
            format: "umd"
        }
    ),
    createBundle(
        {
            plugins: [
                sizePlugin({ showMinifiedSize: false, showGzippedSize: false })
            ]
        },
        {
            file: root(`${distDirName}/${pkgName}.common.js`),
            format: "cjs"
        }
    ),
    createBundle(
        {
            plugins: [
                sizePlugin({ showMinifiedSize: false, showGzippedSize: false })
            ]
        },
        {
            file: root(`${distDirName}/${pkgName}.esm.js`),
            format: "es"
        }
    )
];

async function buildOne(options = {}) {
    // create a bundle
    const file = options.outputOptions.file;
    const bundle = await rollup(options.inputOptions);
    // console.log(bundle.imports); // an array of external dependencies
    // console.log(bundle.exports); // an array of names exported by the entry point
    // console.log(bundle.modules); // an array of module objects

    // generate code and a sourcemap
    // const { code, map } = await bundle.generate(outputOptions);

    // or write the bundle to disk
    await bundle.write(options.outputOptions);

    if (/\.min\.js/i.test(file)) {
        await new Promise((resolve, reject) => {
            fs.readFile(
                file,
                { encoding: ENCODING, flag: "r" },
                (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        data = Buffer.from(banner + "\n" + data);
                        fs.writeFile(
                            file,
                            data,
                            {
                                encoding: ENCODING,
                                flag: "w+"
                            },
                            err => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve();
                                }
                            }
                        );
                    }
                }
            );
        });
    }
}

async function buildAll() {
    for (let options of bundles) {
        await buildOne(options);
    }
}

buildAll();
