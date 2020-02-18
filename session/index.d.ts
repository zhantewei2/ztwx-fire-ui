export declare class Session {
    constructor();
    private sessionKey;
    private sessionValue;
    setSessionKey(key: string): void;
    setSession(value: string): void;
    isMemeroy: () => Promise<string>;
    isStorage: () => Promise<string>;
}
export declare const session: Session;
