import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Child from '../components/Child';


function IndexPage(props) {
  const handleToindex=()=>{
    console.log(`props`, props)
    props.history.push("/")
  }
  return (
    <div>
        <div>我是用户页面</div>
        <Link to="/">首页</Link>
        <button onClick={handleToindex} >点击去首页</button>
        <Child></Child>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
