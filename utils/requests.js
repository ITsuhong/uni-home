import useUserStore from '@/stores/user';

import CryptoJS from 'crypto-js';

const DEV_HOST = 'http://123.56.104.248:3000';
// const DEV_HOST = 'http://localhost:3000';
// const DEV_HOST = 'https://api.xuequbaike.com/mini/';
const PROD_HOST = 'http://123.56.104.248:3000';
// const PROD_HOST = 'https://dev.xuequbaike.com/mini/';
const cyp_iv = CryptoJS.enc.Base64.parse('kT+uMuPwUk2LH4cFbK0GiA==');
const cyp_key = CryptoJS.enc.Hex.parse('6476b3f5ec6dcaddb637e9c9654aa698');

class Ajax {
  static instance = new Ajax();
  logining = false;
  delayRequests= [];
  request;
  constructor() {
    this.request = async (url, data) => {
      const authStore = useUserStore();
      return new Promise((resolve, reject) => {
        uni.request({
          url:
            (process.env.NODE_ENV === 'production' ? PROD_HOST : DEV_HOST) +
            url,
          method: 'POST',
          data,
          header: {
            token: authStore.token //自定义请求头信息
          },
          success: (res) => {


            const { statusCode, data } = res;
            if (statusCode >= 200 && statusCode < 300) {
              // return resolve(data);
              if (typeof data === 'string' && data.trim() !== '') {
                const decodeData = JSON.parse(
                  CryptoJS.AES.decrypt(data, cyp_key, {
                    mode: CryptoJS.mode.CBC,
                    iv: cyp_iv
                  }).toString(CryptoJS.enc.Utf8)
                );

                return resolve(decodeData);
              } else {
                return resolve(data);
              }
            }

            switch (statusCode) {
              case 401 || 400:
                if (statusCode == 400) {
                  const errorLog = {
                    code: statusCode,
                    token: authStore.token,
                    userId: authStore.userId,
                    userName: authStore.nickname,
                    msg: data,
                    url
                  };
                }


                //如果正在登录，此时所有鉴权失败的请求就保存下来，等重新登录后再发起
                if (statusCode == 401) {
                  this.delayRequests.push(() => {
                    const cb = resolve;
                    console.log('401接口', resolve);
                    this.request(url, data).then((res) => {
                      cb(res);
                    });
                  });
                }
                if (!this.logining) {
                  //鉴权失败，重新登录
                  this.logining = true;
                  authStore.login().then(() => {
                    this.logining = false;
                    for (const request of this.delayRequests) {
                      request();
                    }
                    this.delayRequests = [];
                  });
                }
                break;
              case 500:
                uni.showModal({
                  title: '错误',
                  content: '错误',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定');
                    } else if (res.cancel) {
                      console.log('用户点击取消');
                    }
                  }
                });
                reject(false);
                break;
              default:
                reject(false);
                break;
            }
          },
          fail: (err) => {
            console.log(err);
            reject(err);
          }
        });
      });
    };
  }
}

export default Ajax.instance.request;
