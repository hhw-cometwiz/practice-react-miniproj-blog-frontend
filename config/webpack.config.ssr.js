"use strict";

const fs = require('fs');
const path = require("path");
const webpack = require("webpack");
const resolve = require('resolve');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const paths = require("./paths");
const modules = require('./modules');
const getClientEnvironment = require("./env");
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWebpackPlugin');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
// @remove-on-eject-begin
const getCacheIdentifier = require('react-dev-utils/getCacheIdentifier');
// @remove-on-eject-end
const postcssNormalize = require('postcss-normalize')

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// Some apps do not need the benefits of saving a web request, so not inlining the chunk
// makes for a smoother build process.
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

// This is the production and development configuration.
// It is focused on developer experience, fast rebuilds, and a minimal bundle.
module.exports = function(webpackEnv) {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';
    
    // Webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    // In development, we always serve from the root. This makes config easier.
    const publicPath = isEnvProduction
        ? paths.servedPath
        : isEnvDevelopment && '/';
    // Some apps do not use client-side routing with pushState.
    // For these, "homepage" can be set to "." to enable relative asset paths.
    const shouldUseRelativeAssetPaths = publicPath === './';

    // `publicUrl` is just like `publicPath`, but we will provide it to our app
    // as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
    // Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
    const publicUrl = isEnvProduction
        ? publicPath.slice(0, -1)
        : isEnvDevelopment && '';
    // Get environment variables to inject into our app.
    const env = getClientEnvironment(publicUrl);

    // common function to get style loaders
    const getStyleLoaders = (cssOptions, preProcessor) => {
        const loaders = [
            isEnvDevelopment && require.resolve('isomorphic-style-loader'),
            isEnvProduction && {
                loader: MiniCssExtractPlugin.loader,
                options: shouldUseRelativeAssetPaths ? { publicPath: '../../' } : {},
            },
            {
                loader: require.resolve('css-loader'),
                options: cssOptions,
            },
            {
                // Options for PostCSS as we reference these options twice
                // Adds vendor prefixing based on your specified browser support in
                // package.json
                loader: require.resolve('postcss-loader'),
                options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebook/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                        flexbox: 'no-2009',
                        },
                        stage: 3,
                    }),
                    // Adds PostCSS Normalize as the reset css with default options,
                    // so that it honors browserslist config in package.json
                    // which in turn let's users customize the target behavior as per their needs.
                    postcssNormalize(),
                    ],
                    sourceMap: isEnvProduction && shouldUseSourceMap,
                },
            },
        ].filter(Boolean);
        if(preProcessor) {
            loaders.push({
                loader: require.resolve(preProcessor),
                options: {
                    sourceMap: isEnvProduction && shouldUseSourceMap,
                },
            });
        }
        return loaders;
    };

    return ({
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        // Stop compilation early in production
        bail: isEnvProduction,
        devtool: isEnvProduction
            ? shouldUseSourceMap
                ? 'source-map'
                : false
            : isEnvDevelopment && 'cheap-module-source-map',
        // These are the "entry points" to our application.
        // This means they will be the "root" imports that are included in JS bundle.
        entry : paths.ssrJs,
        target : "node",
        output : {
            path : paths.ssrBuild,
            filename : "render.js",
            libraryTarget : "commonjs2"
        },
        module : {
            strictExportPresence: true,
            rules : [
                // Disable require.ensure as it's not a standard language feature.
                {
                    parser: { requireEnsure: false }
                },
                // First, run the linter.
                // It's important to do this before Babel processes the JS.
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    enforce: 'pre',
                    use: [
                        {
                        options: {
                            formatter: require.resolve('react-dev-utils/eslintFormatter'),
                            eslintPath: require.resolve('eslint'),
                            // @remove-on-eject-begin
                            baseConfig: {
                            extends: [require.resolve('eslint-config-react-app')],
                            },
                            ignore: false,
                            useEslintrc: false,
                            // @remove-on-eject-end
                        },
                        loader: require.resolve('eslint-loader'),
                        },
                    ],
                    include: paths.appSrc,
                },
                {
                    oneOf : [
                        // Process application JS with Babel.
                        // The preset includes JSX, Flow, TypeScript, and some ESnext features.
                        {
                            test: /\.(js|mjs|jsx|ts|tsx)$/,
                            include: paths.appSrc,
                            loader: require.resolve('babel-loader'),
                            options: {
                                customize: require.resolve(
                                'babel-preset-react-app/webpack-overrides'
                                ),
                                // @remove-on-eject-begin
                                babelrc: false,
                                configFile: false,
                                presets: [require.resolve('babel-preset-react-app')],
                                // Make sure we have a unique cache identifier, erring on the
                                // side of caution.
                                // We remove this when the user ejects because the default
                                // is sane and uses Babel options. Instead of options, we use
                                // the react-scripts and babel-preset-react-app versions.
                                cacheIdentifier: getCacheIdentifier(
                                isEnvProduction
                                    ? 'production'
                                    : isEnvDevelopment && 'development',
                                [
                                    'babel-plugin-named-asset-import',
                                    'babel-preset-react-app',
                                    'react-dev-utils',
                                    'react-scripts',
                                ]
                                ),
                                // @remove-on-eject-end
                                plugins: [
                                [
                                    require.resolve('babel-plugin-named-asset-import'),
                                    {
                                    loaderMap: {
                                        svg: {
                                        ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
                                        },
                                    },
                                    },
                                ],
                                ],
                                // This is a feature of `babel-loader` for webpack (not Babel itself).
                                // It enables caching results in ./node_modules/.cache/babel-loader/
                                // directory for faster rebuilds.
                                cacheDirectory: true,
                                cacheCompression: isEnvProduction,
                                compact: isEnvProduction,
                            },
                        },
                        // Process any JS outside of the app with Babel.
                        // Unlike the application JS, we only compile the standard ES features.
                        {
                            test: /\.(js|mjs)$/,
                            exclude: /@babel(?:\/|\\{1,2})runtime/,
                            loader: require.resolve('babel-loader'),
                            options: {
                                babelrc: false,
                                configFile: false,
                                compact: false,
                                presets: [
                                [
                                    require.resolve('babel-preset-react-app/dependencies'),
                                    { helpers: true },
                                ],
                                ],
                                cacheDirectory: true,
                                cacheCompression: isEnvProduction,
                                // @remove-on-eject-begin
                                cacheIdentifier: getCacheIdentifier(
                                isEnvProduction
                                    ? 'production'
                                    : isEnvDevelopment && 'development',
                                [
                                    'babel-plugin-named-asset-import',
                                    'babel-preset-react-app',
                                    'react-dev-utils',
                                    'react-scripts',
                                ]
                                ),
                                // @remove-on-eject-end
                                // If an error happens in a package, it's possible to be
                                // because it was compiled. Thus, we don't want the browser
                                // debugger to show the original code. Instead, the code
                                // being evaluated would be much more helpful.
                                sourceMaps: false,
                            },
                        },
                        // "postcss" loader applies autoprefixer to our CSS.
                        // "css" loader resolves paths in CSS and adds assets as dependencies.
                        // "style" loader turns CSS into JS modules that inject <style> tags.
                        // In production, we use MiniCSSExtractPlugin to extract that CSS
                        // to a file, but in development "style" loader enables hot editing
                        // of CSS.
                        // By default we support CSS Modules with the extension .module.css
                        {
                            test: cssRegex,
                            exclude: cssModuleRegex,
                            use: getStyleLoaders({
                                importLoaders: 1,
                                sourceMap: isEnvProduction && shouldUseSourceMap,
                            }),
                            // Don't consider CSS imports dead code even if the
                            // containing package claims to have no side effects.
                            // Remove this when webpack adds a warning or an error for this.
                            // See https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                            },
                            // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
                            // using the extension .module.css
                            {
                            test: cssModuleRegex,
                            use: getStyleLoaders({
                                importLoaders: 1,
                                sourceMap: isEnvProduction && shouldUseSourceMap,
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent,
                            }),
                        },
                        // Opt-in support for SASS (using .scss or .sass extensions).
                        // By default we support SASS Modules with the
                        // extensions .module.scss or .module.sass
                        {
                            test: sassRegex,
                            exclude: sassModuleRegex,
                            use: getStyleLoaders(
                                {
                                importLoaders: 2,
                                sourceMap: isEnvProduction && shouldUseSourceMap,
                                },
                                'sass-loader'
                            ),
                            // Don't consider CSS imports dead code even if the
                            // containing package claims to have no side effects.
                            // Remove this when webpack adds a warning or an error for this.
                            // See https://github.com/webpack/webpack/issues/6571
                            sideEffects: true,
                            },
                            // Adds support for CSS Modules, but using SASS
                            // using the extension .module.scss or .module.sass
                            {
                            test: sassModuleRegex,
                            use: getStyleLoaders(
                                {
                                importLoaders: 2,
                                sourceMap: isEnvProduction && shouldUseSourceMap,
                                modules: true,
                                getLocalIdent: getCSSModuleLocalIdent,
                                },
                                'sass-loader'
                            ),
                        },
                        // "file" loader makes sure those assets get served by WebpackDevServer.
                        // When you `import` an asset, you get its (virtual) filename.
                        // In production, they would get copied to the `build` folder.
                        // This loader doesn't use a "test" so it will catch all modules
                        // that fall through the other loaders.
                        {
                            loader: require.resolve('file-loader'),
                            // Exclude `js` files to keep "css" loader working as it injects
                            // its runtime that would otherwise be processed through "file" loader.
                            // Also exclude `html` and `json` extensions so they get processed
                            // by webpacks internal loaders.
                            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                            options: {
                                name: 'static/media/[name].[hash:8].[ext]',
                            },
                        },
                        // ** STOP ** Are you adding a new loader?
                        // Make sure to add the new loader(s) before the "file" loader.
                    ]
                }
            ]
        },
        resolve : {
            // This allows you to set a fallback for where Webpack should look for modules.
            // We placed these paths second because we want `node_modules` to "win"
            // if there are any conflicts. This matches Node resolution mechanism.
            // https://github.com/facebook/create-react-app/issues/253
            modules : ['node_modules', paths.appNodeModules].concat(
                modules.additionalModulePaths || []
            ),
        },
        plugins : [
            // Generates an `index.html` file with the <script> injected.
            new HtmlWebpackPlugin(
                Object.assign(
                {},
                {
                    inject: true,
                    template: paths.appHtml,
                },
                isEnvProduction
                    ? {
                        minify: {
                            removeComments: true,
                            collapseWhitespace: true,
                            removeRedundantAttributes: true,
                            useShortDoctype: true,
                            removeEmptyAttributes: true,
                            removeStyleLinkTypeAttributes: true,
                            keepClosingSlash: true,
                            minifyJS: true,
                            minifyCSS: true,
                            minifyURLs: true,
                        },
                    }
                    : undefined
                )
            ),
            // Inlines the webpack runtime script. This script is too small to warrant
            // a network request.
            isEnvProduction &&
                shouldInlineRuntimeChunk &&
                new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
            // Makes some environment variables available in index.html.
            // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
            // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
            // In production, it will be an empty string unless you specify "homepage"
            // in `package.json`, in which case it will be the pathname of that URL.
            // In development, this will be an empty string.
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
            // This gives some necessary context to module not found errors, such as
            // the requesting resource.
            new ModuleNotFoundPlugin(paths.appPath),
            // Makes some environment variables available to the JS code, for example:
            // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
            // It is absolutely essential that NODE_ENV is set to production
            // during a production build.
            // Otherwise React will be compiled in the very slow development mode.
            new webpack.DefinePlugin(env.stringified),
            // This is necessary to emit hot updates (currently CSS only):
            isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
            // Watcher doesn't work well if you mistype casing in a path so we use
            // a plugin that prints an error when you attempt to do this.
            // See https://github.com/facebook/create-react-app/issues/240
            isEnvDevelopment && new CaseSensitivePathsPlugin(),
            // If you require a missing module and then `npm install` it, you still have
            // to restart the development server for Webpack to discover it. This plugin
            // makes the discovery automatic so you don't have to restart.
            // See https://github.com/facebook/create-react-app/issues/186
            isEnvDevelopment &&
                new WatchMissingNodeModulesPlugin(paths.appNodeModules),
            isEnvProduction &&
                new MiniCssExtractPlugin({
                    // Options similar to the same options in webpackOptions.output
                    // both options are optional
                    filename: 'static/css/[name].[contenthash:8].css',
                    chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
                }),
        ].filter(Boolean),
    });
};
