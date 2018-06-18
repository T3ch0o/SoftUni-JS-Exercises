const fs = require("fs");

for (const fileSystemObject of fs.readdirSync(__dirname)) {
    if (fileSystemObject.endsWith("Controller.js")) {
        module.exports[fileSystemObject.replace("Controller.js", "")] = require(`./${fileSystemObject}`);
    }
}