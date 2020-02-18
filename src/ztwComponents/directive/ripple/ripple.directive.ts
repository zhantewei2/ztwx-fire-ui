import {handleRipple} from '../../utils/ripple';

export const RippleDirection={
  bind(el:HTMLElement,binding:any,vnode:any){
    const params:any=binding.value||{};
    let fontSize:number|undefined;
    if(params.size){
      switch(params.size){
        case 'md':
          fontSize=40;
          break;
        case 'lg':
          fontSize=60;
          break;
      }
    }

    handleRipple(el,{
      deep:params.deep,
      size:fontSize
    });
  },
};
