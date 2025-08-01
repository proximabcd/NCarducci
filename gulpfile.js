import gulp from "gulp";
import sharpResponsive from "gulp-sharp-responsive";
import rename from "gulp-rename";
import { generate } from "critical";

const { src, dest, series } = gulp;

function genererImgSlider() {
    return src("./assets/images/slider/*.jpg")
        .pipe(sharpResponsive({
            formats: [
                { width: 1000, format: "webp", rename: { suffix: "-1000" } },
                { width: 1200, format: "webp", rename: { suffix: "-1200" } },
                { width: 1400, format: "webp", rename: { suffix: "-1400" } },
                { width: 1920, format: "webp", rename: { suffix: "-1920" } },
            ]
        }))
        .pipe(dest("dest/img"));
};

function genererImgPortfolio() {
    return src("./assets/images/gallery/*.jpg")
        .pipe(sharpResponsive({
            formats: [
                { width: 240, format: "webp", rename: { suffix: "-240" } },
                { width: 320, format: "webp", rename: { suffix: "-320" } },
                { width: 380, format: "webp", rename: { suffix: "-380" } },
                { width: 440, format: "webp", rename: { suffix: "-440" } },
            ]
        }))
        .pipe(dest("dest/img"));
};

function genererImgRestantes() {
    return src("./assets/images/*.png")
        .pipe(sharpResponsive({
            formats: [
                { width: 555, format: "webp", rename: { suffix: "-555" } }
            ]
        }))
        .pipe(dest("dest/img"));
};

function renommerImages() {
    return src("./assets/images/**/*.webp")
        .pipe(rename(function(path) {
            const parts = path.basename.split("-");
            path.basename = `photo-${parts[0]}-${parts[1]}-${parts[parts.length - 1]}`;
            path.extname = ".webp";
        }))
        .pipe(dest("dest/img"));
};

function genererCssCritique(cb) {
    generate({
        base: "dest/",
        src: "index.html",
        target: {
            html: "index-critical.html",
            css: "styles-critical.css"
        },
        inline: true,
        dimensions: [
            { width: 1920, height: 1080 },
        ],
    }, cb);
};

export const critical = genererCssCritique;
export const slider = genererImgSlider;
export const portfolio = genererImgPortfolio;
export const rest = genererImgRestantes;
export const rename = renommerImages;
export const build = series(genererImgSlider, genererImgPortfolio, genererImgRestantes, renommerImages, genererCssCritique);
