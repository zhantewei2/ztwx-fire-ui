export class Session {
    constructor() {
        this.sessionKey = "ztwx-fire-session-key";
        this.isMemeroy = () => {
            return Promise.resolve(this.sessionValue);
        };
        this.isStorage = () => {
            return Promise.resolve(sessionStorage[this.sessionKey]);
        };
    }
    setSessionKey(key) {
        this.sessionKey = key;
    }
    setSession(value) {
        this.sessionValue = sessionStorage[this.sessionKey] = value;
    }
}
export const session = new Session();
