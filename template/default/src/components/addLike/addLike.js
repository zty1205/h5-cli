import Vue from 'vue'
import AddLike from '@/components/addLike/Index.vue'     // 引入组件
let domConstructor  = Vue.extend(AddLike) // 返回一个“扩展实例构造器”
let addLike = (targetContainer, time)=>{
  if (!targetContainer) {
    return;
  }
  let dom = new domConstructor({
    el:document.createElement('div')    
  })
  targetContainer.appendChild(dom.$el);
  dom.addLike(time);
}
export default addLike;