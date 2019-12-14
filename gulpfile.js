const
    {pathes} = require('./package.json'),
    gulp = require('gulp'),
    {series, parallel} = require('gulp'),
    pug = require('gulp-pug')
    sass = require('gulp-sass')
    plumber = require('gulp-plumber'),
    rename = require("gulp-rename"),
    svgSymbols = require('gulp-svg-symbols'),
    svgmin = require('gulp-svgmin')

function compilePug(cb) {
    console.log('Pug compile started!')

    return gulp.src(`${pathes.src}/${pathes.pug}`)
        .pipe(pug({
            pretty: '    '
        }))
        .pipe(gulp.dest(pathes.dev))

    console.log('Pug compiled!')

    cb()
}

function compileScss(cb) {
    console.log('SCSS compile started!')

    gulp.src(`${pathes.src}/${pathes.scss}`)
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest(pathes.dev))

    console.log('SCSS compiled!')

    cb()
}

function moveHTML (cb) {
    gulp.src(`${pathes.src}/${pathes.html}`)
        .pipe(gulp.dest(`${pathes.dev}`))

    cb()
}

function minifyImages(cb) {
    console.log('Move Images started!')
    gulp.src(`${pathes.assets}/${pathes.images}/${pathes.all}`)
        .pipe(plumber())
        .pipe(gulp.dest(`${pathes.dev}/${pathes.images}`))

    console.log('Images moved!')

    cb()
}

function compileFonts(cb) {
    console.log('Move Fonts started!')
    gulp.src(`${pathes.assets}/${pathes.fonts}/${pathes.all}`)
        .pipe(gulp.dest(`${pathes.dev}/${pathes.fonts}`))

    console.log('Fonts moved!')

    cb()
}

function compileJS(cb) {
    console.log('Move JS started!')
    gulp.src(`${pathes.src}/${pathes.js}`)
        .pipe(gulp.dest(`${pathes.dev}`))

    console.log('JS moved!')

    cb()
}

function makeSvgSprite(cb) {
    console.log('SVG Sprite compile started!')

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
            extname: ".html"
        }))
        .pipe(gulp.dest(`${pathes.src}`))

    console.log('SVG Sprite compiled!')

    cb()
}

function watchFiles(cb) {
    gulp.watch(`${pathes.src}/${pathes.html}`, moveHTML)
    gulp.watch(`${pathes.src}/${pathes.pug}`, compilePug)
    gulp.watch(`${pathes.src}/${pathes.scss}`, compileScss)
    gulp.watch(`${pathes.src}/${pathes.js}`, compileJS)
    gulp.watch(`${pathes.assets}/${pathes.images}/${pathes.all}`, minifyImages)
    gulp.watch(`${pathes.assets}/${pathes.fonts}/${pathes.all}`, compileFonts)
    gulp.watch(`${pathes.svg}/${pathes.sprite}`, makeSvgSprite)

    console.log('Watch started!')

    cb()
}

const build = series(makeSvgSprite, minifyImages, compileFonts, parallel(compilePug, compileScss, moveHTML, compileJS, watchFiles))

exports.compileJS = compileJS
exports.compileFonts = compileFonts
exports.moveHTML = moveHTML
exports.compilePug = compilePug
exports.compileScss = compileScss
exports.minifyImages = minifyImages
exports.makeSvgSprite = makeSvgSprite
exports.watchFiles = watchFiles
exports.default = build
