export const keepOneVue=(v:any)=>{
    if(!(window as any).Vue)(window as any).Vue=v;
};