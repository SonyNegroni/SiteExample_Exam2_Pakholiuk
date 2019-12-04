const
    { pathes } = require('./package.json'),
    gulp = require('gulp'),
    { series, parallel } = require('gulp'),
    pug = require('gulp-pug')
sass = require('gulp-sass')
plumber = require('gulp-plumber'),
    rename = require("gulp-rename"),
    svgSymbols = require('gulp-svg-symbols'),
    svgmin = require('gulp-svgmin')

function compilePug(cb) {
    return gulp.src(`${pathes.src}/${pathes.pug}`)
        .pipe(pug({
            pretty: '    '
        }))
        .pipe(gulp.dest(pathes.dev))

    cb()
}

function compileScss(cb) {
    gulp.src(`${pathes.src}/${pathes.scss}`)
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(pathes.dev))

    cb()
}

function minifyImages(cb) {
    gulp.src(`${pathes.assets}/${pathes.images}/${pathes.all}`)
        .pipe(plumber())
        .pipe(gulp.dest(`${pathes.dev}/${pathes.images}`))

    cb()
}

function makeSvgSprite(cb) {
    let configSvgSymbols = {
        svgAttrs: {
            class: `icon-sprite`,
            hidden: true
        },
        templates: [`default-svg`]
    }

    gulp.src(`${pathes.svg}/${pathes.sprite}`)
        .pipe(plumber())
        .pipe(svgmin())
        .pipe(svgSymbols(configSvgSymbols))
        .pipe(rename({
            basename: "sprite",
            extname: "html"
        }))
        .pipe(gulp.dest(`${pathes.src}`))

    cb()
}

function watchFiles(cb) {
    gulp.watch(pathes.pug, compilePug)
    gulp.watch(pathes.scss, compileScss)
    gulp.watch(`${pathes.svg}/${pathes.sprite}`, makeSvgSprite)

    cb()
}

const build = parallel(compilePug, compileScss, minifyImages, makeSvgSprite, watchFiles)

exports.compilePug = compilePug
exports.compileScss = compileScss
exports.minifyImages = minifyImages
exports.makeSvgSprite = makeSvgSprite
exports.default = build
