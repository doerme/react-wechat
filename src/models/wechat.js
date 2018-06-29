/**
 * 联系人模型
 * @File   : contact.js
* @Author : Richard <xiaowei.hsueh@gmail.com> (https://www.gistop.com)
 * @Link   : http://www.gistop.com/
 * @Date   : 2018-6-21 15:33:31
 */

import { request } from '../utils/fetch';
import { NAMESPACE } from '../constant';

export default {
  namespace: NAMESPACE,
  state: {
    contacts: [],
    messages: [],
    info: {},
    isLoggedIn: false,
    token: null,
    contactInfo: {
      _id: '5b24aebe04739f15a37f3d3d',
      nick: 'Richard',
      userName: 'hsuehic',
      phone: '18958067917',
      thumb: 'data:img/jpg;base64,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',
      region: '+86',
      email: 'hsuehic@163.com',
      group: 'R',
      contact: []
    }
  },
  reducers: {
    save(state, { payload: newState }) {
      return { ...state, ...newState };
    }
  },
  effects: {
    * login({ payload: { params } }, { put, call }) {
      const res = yield call(request, '/api/login', params);
      if (res.code === 0) {
        yield put({
          type: 'save', 
          payload: {
            ...res.data,
            isLoggedIn: true
          }
        })
      }
      return res;
    },
    * register({ payload: { params } }, { call }) {
      const res = yield call(request, '/api/login', params);
      return res;
    }
  }
}