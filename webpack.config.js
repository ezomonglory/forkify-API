
const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output :{
        path: path.resolve(__dirname, 'public'),
        filename: 'js/bundle.js'
    },
    
    devServer: {
        static :"./public"
        
    }
}
