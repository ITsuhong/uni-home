import { defineStore } from "pinia"
import {login} from "@/api/user.js"
export default defineStore('user', {
  state: () => {
    return {
      token: uni.getStorageSync("token"),
      userId: 0,
      nickname: '',
      headimgurl: '',
      gold_coins: 0,
      teacherId: 0,
      academic_credits: 0,
      hasUnreadAnswer: false,
      hasSigninToday: true,
      canListenQuestionId: [],
      phone_number: '',
      hasUnreadComment: false
    };
  },
  actions: {
    login() {
      console.log("登陆");

      const self = this;
      return new Promise((resolve, reject) => {
        uni.login({
          provider: 'weixin', //使用微信登录
          success: function (loginRes) {
            console.log('111');
            login({
              js_code: loginRes.code
            }).then((res) => {
              console.log('login', res);
              self.token = res.data.token;
              uni.setStorageSync("token", res.data.token);
              resolve(true);
            });
          },
          fail: function (err) {
            console.log(err, '报错');
          }
        });
      });
    },



  }
});