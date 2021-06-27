import request from '../utils/request';
const pox = "/apis/"

export function query() {
  return request('/api/users');
}
export function requestCnode(name) {
  console.log(name)
  return request(`${pox}/api/v1/topics`);
}
// 注册mock方法
export function mockData() {
  return request(`api/mockData`);
}
