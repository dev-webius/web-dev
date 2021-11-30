const path = (pathName) => __dirname + '/' + pathName;
const src = (fileName) => fileName === void 0 ? path('src') : path('src') + '/' + fileName;
const dist = (fileName) => fileName === void 0 ? path('dist') : path('dist') + '/' + fileName;

module.exports = {
    mode: "production",
    entry: {
        SwipeComponent: src('SwipeComponent.js')
    },
    output: {
        path: dist(),
        filename: '[name].min.js'
    }
};