import { requestCnode } from "../services/example";


export default {
  namespace:"indexTest",//每一个数据仓库都需要一个命名的空间
  state: {//仓库数据
    userName:'mesa',
    cnodeData:[],

  },
  reducers:{//处理同步更改的 
    setUserName(state,payLoad){//state是更改前的state，payload是传递过来的参数,需要返回一个新的state
      console.log({
        ...state,
        ...payLoad.data
      })
      return {
        ...state,
        ...payLoad.data
      }
    },
    subscription(state,payLoad){
      console.log(state,payLoad)
      return {
        ...state,
        ...payLoad.data
      }
    }
  },
  effects:{ 
    /*  
     //处理异步更改---
     payload:dispatch传递过来的payLoad数据
      put用于派发cation；
      call用于触发异步；第一个参数是异步函数，第二个参数是传递给异步函数的参数
      select用于从 所有state 里获取数据，可以从不同model获取数据（利用namespace）。
    */
    *setUserNameAsync ({payLoad},{put,call,select}){
      const userName = yield select(state => state.indexTest.userName);
      console.log(userName)
      console.log(payLoad)
      yield put ({
        type:"setUserName",
        data:{userName:payLoad.userName}
      })
    },
    *getDataModel ({payLoad},{put,call,select}){
        const data = yield call(requestCnode,"name")
        console.log(data)
        if(data.data){
          yield put({
            type:"setUserName",
            data:{cnodeData:data.data.data}
          })
        }
        
    }
  },
  subscriptions:{
    inRouter({dispatch,history}){
      history.listen(({pathname})=>{
        if(pathname ==="/usemodel"){
          console.log("当前页面是usemodel")
          dispatch({type:"subscription"})
        }
      })
    }
  }
  /* 
  如果 url 规则比较复杂，比如 /users/:userId/search，那么匹配和 userId 的获取都会比较麻烦。
  这时推荐用 path-to-regexp
      import pathToRegexp from 'path-to-regexp';

      // in subscription
      const match = pathToRegexp('/users/:userId/search').exec(pathname);
      if (match) {
        const userId = match[1];
        // dispatch action with userId
      }
  */
    
}