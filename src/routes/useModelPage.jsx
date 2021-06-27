import React from 'react';
import { connect } from 'dva';
import { requestCnode } from '../services/example';

import styles from './IndexPage.css';

function useModelPage(props) {
  const handleSetName=()=>{
    props.dispatch({
      type:"indexTest/setUserName",
      data:{
        userName:"猪猪侠"
      }
    })
  }
  const handleAsyncSetName = ()=>{
    props.dispatch({
      type:"indexTest/setUserNameAsync",
      payLoad:{
        userName:"猪猪侠xxxxx"
      }
    })
  }
  const getData = ()=>{
    requestCnode().then(
      res=>{
        console.log(res)
      }
    )
  }
  const getDataModel = ()=>{
    props.dispatch({
      type:"indexTest/getDataModel",
    })
  }
  console.log(props.cnodeData)
  return (
    <div className={styles.normal}>
        <div>我是使用model的页面</div>
        <div>我是model数据userName：{props.userName}</div>
        <button onClick={handleSetName}>点我更改名字</button>
        <button onClick={handleAsyncSetName}>点我async更改名字</button>
        <button onClick={getData}>点我在页面请求数据</button>
        <button onClick={getDataModel}>点我在model请求数据</button>

    </div>
  );
}

useModelPage.propTypes = {
};

const mapStateToProps = state=>{
  return{
    userName:state.indexTest.userName,
    cnodeData:state.indexTest.cnodeData
  }
}
export default connect(mapStateToProps)(useModelPage);
