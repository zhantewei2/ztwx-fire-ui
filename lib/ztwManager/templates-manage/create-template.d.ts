import { TemplateManagePlugin, TemplatePlugin } from "./plugin-template";
export declare type TpType = "vuePage";
export declare class CreateTemplate extends TemplateManagePlugin {
    private baseData;
    constructor();
    /**
     * 返回处理过后的文件名。
     * 如 将 aaa-xx转为aaaXx.
     * 并抛出错误-含中文名的文件目录
     * @param outDir
     *
     * @return 返回 处理后名称，文件夹名
     */
    adjustmentName(outDir: string): string[];
    createSimple(templatePlugin: TemplatePlugin, outDir: string): void;
    /**创建模板
     *
     * @param templatePlugin 作用的插件
     * @param tpFileName 模板的文件名称
     * @param tpName 模板名称
     * @param outDir 生成的路径位置
     */
    create: (templatePlugin: TemplatePlugin, tpFileName: string, tpName: string, outDir: string) => void;
    /** 替换模板内容
     * 返回新的内容
     *
     * @param replaceDict
     * @param tpContent
     */
    replaceTp: (replaceDict: Record<string, string>, tpContent: string) => string;
    /**生成文件
     * 判断文件，如果存在，则不创建  2020/2/24
     * @param targetFilePath
     * @param fileContent
     */
    generateFile: (targetFilePath: string, fileContent: string) => void;
    /**
     * 获得目标文件的文件名
     * @param tpName
     * @param sourceFileName
     */
    getTargetFilename: (tpName: string, sourceFileName: string) => string;
    /**
     * 检查outDir目录是否存在
     * 如果不存在，则递归创建该目录
     * @param dirPath
     */
    checkOutDirExists: (dirPath: string) => void;
}
