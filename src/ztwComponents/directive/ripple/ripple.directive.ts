import {handleRipple} from '../../utils/ripple';

export const RippleDirection={
  inserted(el:HTMLElement,binding:any,vnode:any){
    const params:any=binding.value||{};

    handleRipple(el,{
      deep:params.deep,
      autoSize:true
    });
  },
};
