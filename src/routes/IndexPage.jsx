import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { mockData } from '../services/example';

function IndexPage(props) {
  const getMock = ()=>{
    mockData().then(
      res=>{
        console.log(res)
      }
    )
  }
  return (
    <div className={styles.normal}>
        <div>我是首页</div>
        <div>我是model数据：{props.userName}</div>
        <button onClick={getMock}>点我获取mock数据</button>
    </div>
  );
}

IndexPage.propTypes = {
};

const mapStateToProps = state=>{
  console.log('state :>> ', state);
  return{
    userName:state.indexTest.userName
  }
}
export default connect(mapStateToProps)(IndexPage);
