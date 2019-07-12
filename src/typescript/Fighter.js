var Fighter = /** @class */ (function () {
    function Fighter(fighterFullInfo) {
        this.name = fighterFullInfo.name;
        this.health = fighterFullInfo.health;
        this.attack = fighterFullInfo.attack;
        this.defense = fighterFullInfo.defense;
        this.source = fighterFullInfo.source;
    }
    Fighter.prototype.getHitPower = function (attack) {
        return (attack * Math.floor(Math.random() * 2 + 1));
    };
    Fighter.prototype.getBlockPower = function (defense) {
        return (defense * Math.floor(Math.random() * 2 + 1));
    };
    return Fighter;
}());
export default Fighter;
//# sourceMappingURL=Fighter.js.map