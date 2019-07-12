import View from './view';
import FighterView from './fighterView';
import {fighterService} from './services/fightersService';
import Fighter from './Fighter';
import anime from 'animejs/lib/anime.es.js'
import {IfightersPick, IFighter, IFighterString} from './Interfaces';

class FightersView extends View {
    handleClick: void;

    constructor(fighters: IfightersPick[]) {
        super();

        this.handleClick  = this.handleFighterClick.bind(this);
        this.createFighters(fighters);
    }

    fightersDetailsMap: Map<number, object> = new Map();
    fightersPick: IfightersPick[] = []; //Array of data of picked fighters


    createFighters(fighters: IfightersPick[]): void {
        const fighterElements = fighters.map(fighter => {
            const fighterView = new FighterView(fighter, this.handleClick);
            return fighterView.element;
        });

        this.element = this.createElement({tagName: 'div', className: 'fighters'});
        this.element.append(...fighterElements);

        //Listener to button that starts fighting
        document.getElementById('fight-button').addEventListener('click', event => this.startFight(event, this.fightersPick), false);

    }

    async handleFighterClick(event: Event, fighter: IFighter): Promise<void> {
        if (this.fightersDetailsMap.get(fighter._id) == undefined) {

            //Fetch and set fighter data
            let fighterInfo: object = await fighterService.getFighterDetails(fighter._id);
            this.fightersDetailsMap.set(fighter._id, fighterInfo);

            let fighterPickElement: HTMLElement = document.getElementById(`fighter${fighter._id}`);

            //If more than two fighters picked, reload the page to clear the state
            if (this.fightersPick.length < 2) {
                this.fightersPick.push(<IfightersPick>fighterInfo);
                fighterPickElement.className = "fighter-pick";
            } else {
                location.reload();
            }

            //Create fighter-info div
            let fighterInfoElement: HTMLElement = this.createElement({tagName: 'div', className: 'fighter-info'});
            fighterPickElement.appendChild(fighterInfoElement);
            fighterInfoElement.innerHTML = `
            <div class="attack">
              <label class="label-attack" for="attack-input">Attack:</label>
              <input class="fighter-input" name="attack-input" id="attack-input${fighter._id}" value=${fighterInfo["attack"]}>
            </div>
            <div class="defense">
              <label class="label-defense" for="defense-input">Defense:</label><br>
              <input class="fighter-input" name="defense-input" id="defense-input${fighter._id}" value=${fighterInfo["defense"]}>
            </div>
            <div class="health">
              <label class="label-health" for="health-input">Health:</label><br>
              <input class="fighter-input" name="health-input" id="health-input${fighter._id}" value=${fighterInfo["health"]}>
            </div>
            <div class="save">
                <p class="save-button" id="save-button${fighter._id}" >Save</p>
            </div>
            `;



            document.getElementById(`save-button${fighter._id}`).addEventListener('click', event => this.updateFighter(event, fighter), false);

        }
    }

    //Update fighter stats
    updateFighter(event: Event, fighter: IFighter) {
        //Get data from inputs
        let attackInput = (<HTMLInputElement>document.getElementById(`attack-input${fighter._id}`)).value;
        let defenseInput = (<HTMLInputElement>document.getElementById(`defense-input${fighter._id}`)).value;
        let healthInput = (<HTMLInputElement>document.getElementById(`health-input${fighter._id}`)).value;

        //Update fightersDetailsMap
        let updateFighter: object = this.fightersDetailsMap.get(fighter._id);
        updateFighter['attack'] = Number(attackInput);
        updateFighter['defense'] = Number(defenseInput);
        updateFighter['health'] = Number(healthInput);
    }

    //Creates arena and fighters elements
    startFight(event: Event, fightersPick: IfightersPick[]): void {
        const fighter1: Fighter = new Fighter(fightersPick[0]);
        const fighter2: Fighter = new Fighter(fightersPick[1]);

        document.getElementById('root').innerHTML = `
        <div class="finish">
            <span id="congratulations">
             </span>
            <div class="restart">
            <p class="restart-button">Play again</p>
            </div>
        </div>
      <div class="arena">
          <div class="health">

              <div class="left-bar">
                <div class="icon-group">
                  <div class="icon-row">
                        <img  class="icon" src="icons8-sword-50.svg">
                        <p class="">Attack: ${fighter1.attack}</p>
                    </div>
                    <div class="icon-row">
                        <img  class="icon" src="icons8-shield-50.svg">
                        <p class="">Defense: ${fighter1.defense}</p>
                    </div>
                </div>
                <div class="icon-row-hp">
                    <img  class="icon" src="icons8-heart-50.svg">
                    <p class="hp-left">HP: ${fighter1.health}</p>
                  </div>
                  
                <div class="progress-reversed">
                    <div id="bar-left" style="width: 100%"></div>
                </div>
              </div>
              
              <div class="right-bar">
              <div class="icon-group">
                  <div class="icon-row">
                        <img  class="icon" src="icons8-sword-50.svg">
                        <p class="">Attack: ${fighter2.attack}</p>
                    </div>
                    <div class="icon-row">
                        <img  class="icon" src="icons8-shield-50.svg">
                        <p class="">Defense: ${fighter2.defense}</p>
                    </div>
                </div>
                <div class="icon-row-hp">
                    <img  class="icon" src="icons8-heart-50.svg">
                    <p class="hp-right">HP: ${fighter2.health}</p>
                  </div>
                
                <div class="progress">
                  <div id="bar-right" style="width: 100%"></div>
                </div>
              </div>
        
          </div>

          <div class="fighters-arena">
            <div class="fighter1-arena">
            <div class="notification-left">
            <p class="notification-text-left">-5 HP</p>
            </div>
              <img class="fighter-image" id="fighter-image${fighter1.name}" src="${fighter1.source}">
              <span class="name">${fighter1.name}</span>
            </div>
    
            <div class="fighter2-arena">
                <div class="notification-right">
                <p class="notification-text-right"></p>
                </div>
              <img class="fighter-image" id="fighter-image${fighter2.name}" src="${fighter2.source}" style="transform: scaleX(-1);">
              <span class="name">${fighter2.name}</span>
            </div>
          </div>    
      </div>
    `;
        //Play again button
        document.getElementsByClassName('restart-button')[0].addEventListener('click', () => location.reload());
        document.getElementById('root').style.backgroundImage = "url('arena-background.jpg')";
        setTimeout( () => this.fight(fighter1, fighter2), 1000);
    }


    fight(fighter1: Fighter, fighter2: Fighter): void {
        const fighter1BaseHealth: number = fighter1.health;
        const fighter2BaseHealth: number = fighter2.health;


        check();
        function check(): void {
            if (fighter1.health > 0 && fighter2.health > 0) {
                damagePlayer();
            } else {
                (<HTMLElement>document.getElementsByClassName('finish')[0]).style.visibility = 'visible';
                document.getElementById('congratulations').innerHTML = `CONGRATULATIONS! <br>
                ${fighter1.health > fighter2.health ? fighter1.name : fighter2.name} WINS!`;
            }
        }

        //Delay any next code
        function fighterDelay(delay): Promise<void> {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve();
                }, delay);
            });
        }

        async function damagePlayer(): Promise<void> {

            //Player1 attacks
            let damageNotification: string;
            let damage: number = fighter1.getHitPower(fighter1.attack) - fighter2.getBlockPower(fighter2.defense);
            if (damage <= 0) {
                damage = 0;

                damageNotification =  'Blocked!';
            } else {
                damageNotification =  `-${damage} HP`;
            }
            fighter2.health -= damage;
            if ( fighter2.health < 0 ) {
                fighter2.health = 0;
            }
            anime({
                targets: `#fighter-image${fighter1.name}`,
                translateX: 300,
            });
            await fighterDelay(200);
            document.getElementsByClassName('notification-text-right')[0].innerHTML = damageNotification;
            (<HTMLElement>document.getElementsByClassName('notification-right')[0]).style.visibility = 'visible';
            document.getElementsByClassName('hp-right')[0].innerHTML = `HP: ${fighter2.health}`;
            document.getElementById('bar-right').style.width = `${(fighter2.health / (fighter2BaseHealth)) * 100}%`;
            await fighterDelay(500);
            anime({
                targets: `#fighter-image${fighter1.name}`,
                translateX: 0,

            });
            await fighterDelay(800);
            (<HTMLElement>document.getElementsByClassName('notification-right')[0]).style.visibility = 'hidden';
            await fighterDelay(400);
            if (fighter2.health <= 0) {
                check();
                return;
            }

            //Player2 attacks
            damage = fighter2.getHitPower(fighter2.attack) - fighter1.getBlockPower(fighter1.defense);
            if (damage <= 0) {
                damage = 0;
                damageNotification =  'Blocked!';
            } else {
                damageNotification =  `-${damage} HP`;
            }
            fighter1.health = fighter1.health - damage;
            if ( fighter1.health < 0 ) {
                fighter1.health = 0;
            }
            anime({
                targets: `#fighter-image${fighter2.name}`,
                translateX: 300
            });
            await fighterDelay(200);
            document.getElementsByClassName('notification-text-left')[0].innerHTML = damageNotification;
            (<HTMLElement>document.getElementsByClassName('notification-left')[0]).style.visibility = 'visible';
            document.getElementsByClassName('hp-left')[0].innerHTML = `HP: ${fighter1.health}`;
            document.getElementById('bar-left').style.width = `${(fighter1.health / (fighter1BaseHealth)) * 100}%`;
            await fighterDelay(500);
            anime({
                targets: `#fighter-image${fighter2.name}`,
                translateX: 0,

            });
            await fighterDelay(800);
            (<HTMLElement>document.getElementsByClassName('notification-left')[0]).style.visibility = 'hidden';
            await fighterDelay(400);
            check();
        }
    }

}

export default FightersView;