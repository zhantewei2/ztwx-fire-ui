var default_1 = /** @class */ (function () {
    function default_1(errMessage) {
        this.name = "required";
        this.errMessage = errMessage;
    }
    default_1.prototype.apply = function (value) {
        return value === 0 || !!value;
    };
    return default_1;
}());
export default default_1;
