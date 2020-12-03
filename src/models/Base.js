export class Base {   

    constructor(id,attack,defense,hp,spAttack,spDefense,speed){
        this.id=id;
        this.attack=attack;
        this.defense=defense;
        this.hp=hp;
        this.spAttack=spAttack;
        this.spDefense=spDefense;
        this.speed=speed;
    }

    static fromData(data) { 
        return new Base(data.id,     
            data.attack,
            data.defense,
            data.hp,
            data.spAttack,
            data.spDefense,
            data.speed);
    }
}


