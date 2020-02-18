export class Session{
    constructor() {

    }

    private sessionKey:string="ztwx-fire-session-key";

    private sessionValue:string;
    public setSessionKey(key:string){
        this.sessionKey=key;
    }

    public setSession(value:string){
        this.sessionValue=sessionStorage[this.sessionKey]=value;
    }

    public isMemeroy=():Promise<string>=>{
        return Promise.resolve(this.sessionValue);
    };

    public isStorage=():Promise<string>=>{
        return Promise.resolve(sessionStorage[this.sessionKey]);
    }
}

export const session:Session=new Session();