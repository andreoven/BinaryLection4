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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import View from './view';
import FighterView from './fighterView';
import { fighterService } from './services/fightersService';
import Fighter from './Fighter';
import anime from 'animejs/lib/anime.es.js';
var FightersView = /** @class */ (function (_super) {
    __extends(FightersView, _super);
    function FightersView(fighters) {
        var _this = _super.call(this) || this;
        _this.fightersDetailsMap = new Map();
        _this.fightersPick = []; //Array of data of picked fighters
        _this.handleClick = _this.handleFighterClick.bind(_this);
        _this.createFighters(fighters);
        return _this;
    }
    FightersView.prototype.createFighters = function (fighters) {
        var _this = this;
        var _a;
        var fighterElements = fighters.map(function (fighter) {
            var fighterView = new FighterView(fighter, _this.handleClick);
            return fighterView.element;
        });
        this.element = this.createElement({ tagName: 'div', className: 'fighters' });
        (_a = this.element).append.apply(_a, fighterElements);
        //Listener to button that starts fighting
        document.getElementById('fight-button').addEventListener('click', function (event) { return _this.startFight(event, _this.fightersPick); }, false);
    };
    FightersView.prototype.handleFighterClick = function (event, fighter) {
        return __awaiter(this, void 0, void 0, function () {
            var fighterInfo, fighterPickElement, fighterInfoElement;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.fightersDetailsMap.get(fighter._id) == undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fighterService.getFighterDetails(fighter._id)];
                    case 1:
                        fighterInfo = _a.sent();
                        this.fightersDetailsMap.set(fighter._id, fighterInfo);
                        fighterPickElement = document.getElementById("fighter" + fighter._id);
                        //If more than two fighters picked, reload the page to clear the state
                        if (this.fightersPick.length < 2) {
                            this.fightersPick.push(fighterInfo);
                            fighterPickElement.className = "fighter-pick";
                        }
                        else {
                            location.reload();
                        }
                        fighterInfoElement = this.createElement({ tagName: 'div', className: 'fighter-info' });
                        fighterPickElement.appendChild(fighterInfoElement);
                        fighterInfoElement.innerHTML = "\n            <div class=\"attack\">\n              <label class=\"label-attack\" for=\"attack-input\">Attack:</label>\n              <input class=\"fighter-input\" name=\"attack-input\" id=\"attack-input" + fighter._id + "\" value=" + fighterInfo.attack + ">\n            </div>\n            <div class=\"defense\">\n              <label class=\"label-defense\" for=\"defense-input\">Defense:</label><br>\n              <input class=\"fighter-input\" name=\"defense-input\" id=\"defense-input" + fighter._id + "\" value=" + fighterInfo.defense + ">\n            </div>\n            <div class=\"health\">\n              <label class=\"label-health\" for=\"health-input\">Health:</label><br>\n              <input class=\"fighter-input\" name=\"health-input\" id=\"health-input" + fighter._id + "\" value=" + fighterInfo.health + ">\n            </div>\n            <div class=\"save\">\n                <p class=\"save-button\" id=\"save-button" + fighter._id + "\" >Save</p>\n            </div>\n            ";
                        document.getElementById("save-button" + fighter._id).addEventListener('click', function (event) { return _this.updateFighter(event, fighter); }, false);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    //Update fighter stats
    FightersView.prototype.updateFighter = function (event, fighter) {
        //Get data from inputs
        var attackInput = document.getElementById("attack-input" + fighter._id).value;
        var defenseInput = document.getElementById("defense-input" + fighter._id).value;
        var healthInput = document.getElementById("health-input" + fighter._id).value;
        //Update fightersDetailsMap
        var updateFighter = this.fightersDetailsMap.get(fighter._id);
        updateFighter['attack'] = Number(attackInput);
        updateFighter['defense'] = Number(defenseInput);
        updateFighter['health'] = Number(healthInput);
    };
    //Creates arena and fighters elements
    FightersView.prototype.startFight = function (event, fightersPick) {
        var _this = this;
        var fighter1 = new Fighter(fightersPick[0]);
        var fighter2 = new Fighter(fightersPick[1]);
        document.getElementById('root').innerHTML = "\n        <div class=\"finish\">\n            <span id=\"congratulations\">\n             </span>\n            <div class=\"restart\">\n            <p class=\"restart-button\">Play again</p>\n            </div>\n        </div>\n      <div class=\"arena\">\n          <div class=\"health\">\n\n              <div class=\"left-bar\">\n                <div class=\"icon-group\">\n                  <div class=\"icon-row\">\n                        <img  class=\"icon\" src=\"icons8-sword-50.svg\">\n                        <p class=\"\">Attack: " + fighter1.attack + "</p>\n                    </div>\n                    <div class=\"icon-row\">\n                        <img  class=\"icon\" src=\"icons8-shield-50.svg\">\n                        <p class=\"\">Defense: " + fighter1.defense + "</p>\n                    </div>\n                </div>\n                <div class=\"icon-row-hp\">\n                    <img  class=\"icon\" src=\"icons8-heart-50.svg\">\n                    <p class=\"hp-left\">HP: " + fighter1.health + "</p>\n                  </div>\n                  \n                <div class=\"progress-reversed\">\n                    <div id=\"bar-left\" style=\"width: 100%\"></div>\n                </div>\n              </div>\n              \n              <div class=\"right-bar\">\n              <div class=\"icon-group\">\n                  <div class=\"icon-row\">\n                        <img  class=\"icon\" src=\"icons8-sword-50.svg\">\n                        <p class=\"\">Attack: " + fighter2.attack + "</p>\n                    </div>\n                    <div class=\"icon-row\">\n                        <img  class=\"icon\" src=\"icons8-shield-50.svg\">\n                        <p class=\"\">Defense: " + fighter2.defense + "</p>\n                    </div>\n                </div>\n                <div class=\"icon-row-hp\">\n                    <img  class=\"icon\" src=\"icons8-heart-50.svg\">\n                    <p class=\"hp-right\">HP: " + fighter2.health + "</p>\n                  </div>\n                \n                <div class=\"progress\">\n                  <div id=\"bar-right\" style=\"width: 100%\"></div>\n                </div>\n              </div>\n        \n          </div>\n\n          <div class=\"fighters-arena\">\n            <div class=\"fighter1-arena\">\n            <div class=\"notification-left\">\n            <p class=\"notification-text-left\">-5 HP</p>\n            </div>\n              <img class=\"fighter-image\" id=\"fighter-image" + fighter1.name + "\" src=\"" + fighter1.source + "\">\n              <span class=\"name\">" + fighter1.name + "</span>\n            </div>\n    \n            <div class=\"fighter2-arena\">\n                <div class=\"notification-right\">\n                <p class=\"notification-text-right\"></p>\n                </div>\n              <img class=\"fighter-image\" id=\"fighter-image" + fighter2.name + "\" src=\"" + fighter2.source + "\" style=\"transform: scaleX(-1);\">\n              <span class=\"name\">" + fighter2.name + "</span>\n            </div>\n          </div>    \n      </div>\n    ";
        //Play again button
        document.getElementsByClassName('restart-button')[0].addEventListener('click', function () { return location.reload(); });
        document.getElementById('root').style.backgroundImage = "url('arena-background.jpg')";
        setTimeout(function () { return _this.fight(fighter1, fighter2); }, 1000);
    };
    FightersView.prototype.fight = function (fighter1, fighter2) {
        var fighter1BaseHealth = fighter1.health;
        var fighter2BaseHealth = fighter2.health;
        check();
        function check() {
            if (fighter1.health > 0 && fighter2.health > 0) {
                damagePlayer();
            }
            else {
                document.getElementsByClassName('finish')[0].style.visibility = 'visible';
                document.getElementById('congratulations').innerHTML = "CONGRATULATIONS! <br>\n                " + (fighter1.health > fighter2.health ? fighter1.name : fighter2.name) + " WINS!";
            }
        }
        //Delay any next code
        function fighterDelay(delay) {
            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, delay);
            });
        }
        function damagePlayer() {
            return __awaiter(this, void 0, void 0, function () {
                var damageNotification, damage;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            damage = fighter1.getHitPower(fighter1.attack) - fighter2.getBlockPower(fighter2.defense);
                            if (damage <= 0) {
                                damage = 0;
                                damageNotification = 'Blocked!';
                            }
                            else {
                                damageNotification = "-" + damage + " HP";
                            }
                            fighter2.health -= damage;
                            if (fighter2.health < 0) {
                                fighter2.health = 0;
                            }
                            anime({
                                targets: "#fighter-image" + fighter1.name,
                                translateX: 300,
                            });
                            return [4 /*yield*/, fighterDelay(200)];
                        case 1:
                            _a.sent();
                            document.getElementsByClassName('notification-text-right')[0].innerHTML = damageNotification;
                            document.getElementsByClassName('notification-right')[0].style.visibility = 'visible';
                            document.getElementsByClassName('hp-right')[0].innerHTML = "HP: " + fighter2.health;
                            document.getElementById('bar-right').style.width = (fighter2.health / (fighter2BaseHealth)) * 100 + "%";
                            return [4 /*yield*/, fighterDelay(500)];
                        case 2:
                            _a.sent();
                            anime({
                                targets: "#fighter-image" + fighter1.name,
                                translateX: 0,
                            });
                            return [4 /*yield*/, fighterDelay(800)];
                        case 3:
                            _a.sent();
                            document.getElementsByClassName('notification-right')[0].style.visibility = 'hidden';
                            return [4 /*yield*/, fighterDelay(400)];
                        case 4:
                            _a.sent();
                            if (fighter2.health <= 0) {
                                check();
                                return [2 /*return*/];
                            }
                            //Player2 attacks
                            damage = fighter2.getHitPower(fighter2.attack) - fighter1.getBlockPower(fighter1.defense);
                            if (damage <= 0) {
                                damage = 0;
                                damageNotification = 'Blocked!';
                            }
                            else {
                                damageNotification = "-" + damage + " HP";
                            }
                            fighter1.health = fighter1.health - damage;
                            if (fighter1.health < 0) {
                                fighter1.health = 0;
                            }
                            anime({
                                targets: "#fighter-image" + fighter2.name,
                                translateX: 300
                            });
                            return [4 /*yield*/, fighterDelay(200)];
                        case 5:
                            _a.sent();
                            document.getElementsByClassName('notification-text-left')[0].innerHTML = damageNotification;
                            document.getElementsByClassName('notification-left')[0].style.visibility = 'visible';
                            document.getElementsByClassName('hp-left')[0].innerHTML = "HP: " + fighter1.health;
                            document.getElementById('bar-left').style.width = (fighter1.health / (fighter1BaseHealth)) * 100 + "%";
                            return [4 /*yield*/, fighterDelay(500)];
                        case 6:
                            _a.sent();
                            anime({
                                targets: "#fighter-image" + fighter2.name,
                                translateX: 0,
                            });
                            return [4 /*yield*/, fighterDelay(800)];
                        case 7:
                            _a.sent();
                            document.getElementsByClassName('notification-left')[0].style.visibility = 'hidden';
                            return [4 /*yield*/, fighterDelay(400)];
                        case 8:
                            _a.sent();
                            check();
                            return [2 /*return*/];
                    }
                });
            });
        }
    };
    return FightersView;
}(View));
export default FightersView;
//# sourceMappingURL=fightersView.js.map