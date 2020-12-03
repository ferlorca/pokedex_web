import {Translations} from "./Translations";
import {Base} from "./Base"

export class Pokemon{  
    constructor(id,name,type) {
        this.name= name;
        this.type= type;
        this.id = id;      
        this.base = null;
    }

    static fromData(data) {
        const id = data.id;       
        const name= new Translations(data.name.chinese,data.name.french,data.name.english,data.name.japanese);
        const type= [...data.type];
        return new this(id ,name,type);
    }

    addBase(base) {
        this.base = new Base.fromData(base);
    }
}
