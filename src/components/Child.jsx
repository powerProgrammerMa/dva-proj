import { withRouter } from 'dva/router'
import React from 'react'

 function Child(props) {
    const handleToindex=()=>{
        console.log(`props`, props)
        props.history.push("/")
      }
    return (
        <div>
            <div>我是通用组件</div>
            <button onClick={handleToindex}>首页child</button>
        </div>
    )
}

export default withRouter(Child)