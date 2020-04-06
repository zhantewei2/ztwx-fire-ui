export declare const tpDict: {
    'vuePage': string;
};
export interface TemplateBaseData {
    dirName: string;
    completeName: string;
    gitName?: string;
    gitEmail?: string;
    userComputer?: string;
    nowDate?: string;
}
export declare class BaseData {
    constructor();
    appendBaseData(tb: TemplateBaseData): TemplateBaseData;
}
