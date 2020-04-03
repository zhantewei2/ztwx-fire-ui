var default_1 = /** @class */function () {
    function default_1(errMessage) {
        this.name = "email";
        this.reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        this.errMessage = errMessage;
    }
    default_1.prototype.apply = function (value) {
        return !value || typeof value == "string" && this.reg.test(value);
    };
    return default_1;
}();
export default default_1;