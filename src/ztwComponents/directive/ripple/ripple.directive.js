"use strict";
exports.__esModule = true;
var ripple_1 = require("../../utils/ripple");
exports.RippleDirection = {
    bind: function (el, binding, vnode) {
        var params = binding.value || {};
        var fontSize;
        if (params.size) {
            switch (params.size) {
                case 'md':
                    fontSize = 40;
                    break;
                case 'lg':
                    fontSize = 60;
                    break;
            }
        }
        ripple_1.handleRipple(el, {
            deep: params.deep,
            size: fontSize
        });
    }
};
