import { createStore } from 'vuex'
import ModuleUser from './user'
// vuex,vue中实现一个去全局变量，有利于平行组件之间的通信
export default createStore({
  // state存储所有数据
  state: {

  },
  //获取state中的内容，但是不能直接获取，需要一些计算才能获取的时候
  getters: {
  },
  //唯一的可以对state中的内容进行修改的
  //mutations不能执行异步操作
  mutations: {
  },
  //可以定义我们对state的各种操作,例如更新方式等
  actions: {
      

  },
  //将state进行分割
  modules: {
    user:ModuleUser,
  } 
})
