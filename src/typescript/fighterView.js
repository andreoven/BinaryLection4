var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import View from './view';
var FighterView = /** @class */ (function (_super) {
    __extends(FighterView, _super);
    function FighterView(fighter, handleClick) {
        var _this = _super.call(this) || this;
        _this.createFighter(fighter, handleClick);
        return _this;
    }
    FighterView.prototype.createFighter = function (fighter, handleClick) {
        var name = fighter.name;
        var source = fighter.source;
        var nameElement = this.createName(name);
        var imageElement = this.createImage(source);
        var attributes = { id: "fighter" + fighter._id };
        this.element = this.createElement({ tagName: 'div', className: 'fighter', attributes: attributes });
        this.element.append(imageElement, nameElement);
        this.element.addEventListener('click', function (event) { return handleClick(event, fighter); }, false);
    };
    FighterView.prototype.createName = function (name) {
        var nameElement = this.createElement({ tagName: 'span', className: 'name' });
        nameElement.innerText = name;
        return nameElement;
    };
    FighterView.prototype.createImage = function (source) {
        var attributes = { src: source };
        var imgElement = this.createElement({
            tagName: 'img',
            className: 'fighter-image',
            attributes: attributes
        });
        return imgElement;
    };
    return FighterView;
}(View));
export default FighterView;
//# sourceMappingURL=fighterView.js.map