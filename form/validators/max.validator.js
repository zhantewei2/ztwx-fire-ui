var default_1 = /** @class */ (function () {
    function default_1(errMessage, maxValue) {
        this.name = "max";
        this.errMessage = errMessage;
        this.maxValue = maxValue;
    }
    default_1.prototype.apply = function (value) {
        if (!value && value !== 0)
            return true;
        value = Number(value);
        if (value !== 0 && !value)
            return false;
        return value <= this.maxValue;
    };
    return default_1;
}());
export default default_1;
