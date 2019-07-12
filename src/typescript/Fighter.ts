

class Fighter {
    name: string;
    health: number;
    attack: number;
    defense: number;
    source: string;

    constructor(fighterFullInfo) {
        this.name = fighterFullInfo.name;
        this.health = fighterFullInfo.health;
        this.attack = fighterFullInfo.attack;
        this.defense = fighterFullInfo.defense;
        this.source = fighterFullInfo.source;

    }


    getHitPower(attack: number) {
        return (attack * Math.floor(Math.random() * 2 + 1));
    }

    getBlockPower(defense: number) {
        return (defense * Math.floor(Math.random() * 2 + 1));
    }
}

export default Fighter;