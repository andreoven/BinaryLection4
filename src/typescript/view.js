var View = /** @class */ (function () {
    function View() {
    }
    View.prototype.createElement = function (_a) {
        var tagName = _a.tagName, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.attributes, attributes = _c === void 0 ? {} : _c;
        var element = document.createElement(tagName);
        if (className) {
            element.classList.add(className);
        }
        Object.keys(attributes).forEach(function (key) { return element.setAttribute(key, attributes[key]); });
        return element;
    };
    return View;
}());
export default View;
//# sourceMappingURL=view.js.map