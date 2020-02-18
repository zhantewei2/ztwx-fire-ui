"use strict";
exports.__esModule = true;
var common_1 = require("./common");
var baseSize = 12;
var removeTime = 400;
var removeEndTime = 400;
var body = document.body;
exports.handleRipple = function (el, opts) {
    var one, rect, x, y, halfSize = baseSize / 2, 
    //已插入的ripple
    rippleQueue = [], 
    //删除Bubbling
    removeQueueTimeout, 
    //删除touchend class:
    removeEndTimeout, clearRemoveQueue = function () {
        clearTimeout(removeQueueTimeout);
        removeQueueTimeout = null;
    }, clearTouchEnd = function () {
        clearTimeout(removeEndTimeout);
        removeEndTimeout = null;
    };
    var wrapper = document.createElement('span');
    wrapper.classList.add('ripple-wrapper', opts.deep ? 'ripple-wrapper-deep' : 'ripple-wrapper-light');
    el.appendChild(wrapper);
    var listenTouch = function (e) {
        rect = el.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
        one = document.createElement('span');
        one.className = 'ripple-bubbling';
        if (opts.size) {
            one.style.fontSize = opts.size + 'px';
            halfSize = opts.size / 2;
        }
        one.style.left = x - halfSize + 'px';
        one.style.top = y - halfSize + 'px';
        rippleQueue.push(one);
        wrapper.appendChild(one);
        if (removeQueueTimeout)
            clearRemoveQueue();
        if (removeEndTime)
            clearTouchEnd();
        removeQueueTimeout = setTimeout(function () {
            rippleQueue.forEach(function (child) {
                wrapper.removeChild(child);
            });
            rippleQueue = [];
        }, removeTime);
        wrapper.classList.add('ripple-active');
    };
    var touchEnd = function () {
        setTimeout(function () { return wrapper.classList.remove('ripple-active'); }, removeEndTime);
    };
    if (common_1.isMobile) {
        el.addEventListener('touchstart', function (e) {
            listenTouch(e.touches[0]);
        });
        el.addEventListener('touchend', touchEnd);
    }
    else {
        el.addEventListener('mousedown', function (e) {
            listenTouch(e);
            body.addEventListener('mouseup', function mouseUp() {
                touchEnd();
                body.removeEventListener('mouseup', mouseUp);
            });
        });
    }
    // el.addEventListener('contextmenu',e=>e.preventDefault());
};
