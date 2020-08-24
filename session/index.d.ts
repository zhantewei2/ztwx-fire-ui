export declare class Session {
    constructor();
    private sessionKey;
    private sessionValue;
    setSessionKey(key: string): void;
    setSession(value: string): void;
    isMemeroy: () => Promise<string>;
    isStorage: () => Promise<string>;
    /**
     * 清除session
     */
    clearSession: () => void;
}
export declare const session: Session;
