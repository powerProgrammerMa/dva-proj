## 全局安装：npm install dva-cli -g
## 创建引用：dva new my-proj
## 开启开发服务器：npm start
## 项目目录：
    mock：用于模拟后台数据接口
    public：放index.html的
    src：
        assets：静态资源文件夹
        components:存放通用组件---注意这里面的组件的props不具备路由功能，需要使用的话还是跟之前一样用withRouter
        models：存放我们的redux部分
        routes：路由组件
        services：后端接口请求文件夹
        utils：公共方法文件夹，例如我们的fetch封装就是在这里
        index.js:入口文件
        router.js：路由配置文件---dva的路由跟react的路由使用完全一样
            1.默认使用的是hash路由如果需要使用browserHistory：
            https://dvajs.com/knowledgemap/#%E5%88%87%E6%8D%A2-history-%E4%B8%BA-browserhistory
            文档引入书写错误：改为：
                import { createBrowserHistory  as createHistory} from 'history';


## models：每个配置项看models下面的indexText文件
    1.基本流程：
        可以通过 dispatch 发起一个 action，如果是同步行为会直接通过 Reducers 改变 State ，如果是异步行为（副作用）会先触发 Effects 然后流向 Reducers 最终改变 State
    2.所有的model都需要在入口文件中注入，项目中一般在全局models里面引入所有的model形成一个数组暴露出来，然后foreach来注入
        app.model(require('./models/indexTest').default);
    3.页面使用：也是需要connect来连接我们的容器组件注入到props里面进行使用数据个action,但是区别一点就是每个数据都是存放在namespace定义的名字key下的
    4.数据更改：
        （1）同步更改：
            type传递指定namespace下的reducer方法：例如：type:"indexTest/setUsername"；
            data：需要传递的数据
                props.dispatch({type:"namespace/reducerName",data:{userName:"猪猪侠"}})
            reducer里面： 
                return {
                    ...state,
                    ...payLoad.data
                }
        (2)异步更改：
            定义：
            effects:{ //需要使用generator函数
                    /*  
                    //处理异步更改---
                    payload:dispatch传递过来的payLoad数据
                    put用于派发cation；
                    call用于触发异步；第一个参数是异步函数，第二个参数是传递给异步函数的参数
                    select用于从 所有state 里获取数据，可以从不同model获取数据（利用namespace）。
                    */
                    *getDataModel ({payLoad},{put,call,select}){
                        const userName = yield select(state => state.indexTest.userName);
                        console.log(userName)
                        const data = yield call(requestCnode,userName)
                        console.log(data)
                        if(data.data){
                        yield put({
                            type:"setUserName",
                            data:{cnodeData:data.data.data}
                        })
                        }
                        
                    }
                }
            触发：
             props.dispatch({
                type:"indexTest/getDataModel",
             })
    5.subscriptions 是订阅，用于订阅一个数据源，然后根据需要 dispatch 相应的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。格式为 ({ dispatch, history }) => unsubscribe

## mock数据---查看testMock.js文件
    使用步骤：
        1.在mock文件里面建立属于自己mock的js并导出
        2.通过.roadhogrc.mock.js这个配置文件集中导出所有mock接口
        3.在services文件夹里面建立自己的发请求的方法
        4.在组件里面按照正常的调用去使用接口就可以了

