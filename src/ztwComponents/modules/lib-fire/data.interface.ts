export interface NavListItem{
  label:string;
  icon?:string;
  path?:string;
  id?:string; //数据Id
  open?:boolean;
  children?:NavListItem[];
  //父级对象
  parent?:NavListItem;
  //选中状态
  active?:boolean;
}