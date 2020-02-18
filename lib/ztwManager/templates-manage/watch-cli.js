"use strict";
exports.__esModule = true;
var watch_dir_1 = require("./watch-dir");
var argvs = process.argv;
var dir = argvs[2];
if (dir) {
    var m = new watch_dir_1.ManageTempalteWatchDir();
    m.watch(dir);
}
