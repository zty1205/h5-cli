/* eslint-disable no-undef */
import axios from 'axios'
import { Toast } from 'vant'
// eslint-disable-next-line no-undef
const context = H5Utils.getH5ApiContext()
const fileContext = H5Utils.getApiContext()

// get请求
function get ({ url, params, errorInfo, noErrorToast }) {
  let dataPromise = axios({
    url: context + url,
    method: 'GET',
    params
  })
  return handlePromise(dataPromise, errorInfo, noErrorToast)
}

// post请求
function post ({ url, params, data, headers = { 'Content-Type': 'application/json; charset=utf-8' }, errorInfo, noErrorToast }) {
  let dataPromise = axios({
    url: context + url,
    method: 'POST',
    params,
    data,
    headers
  })
  return handlePromise(dataPromise, errorInfo, noErrorToast)
}

function uploadFile ({ url = 'event/uploadFileByFarm', formData, errorInfo, noErrorToast }) {
  let dataPromise = axios({
    url: fileContext + url,
    method: 'POST',
    data: formData,
    header: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }
  })
  return handlePromise(dataPromise, errorInfo, noErrorToast)
}

function getShareConfig ({ url = 'api/event/operation/internal/general/eventconfig/get', code }) {
  return get({
    url: url,
    params: {
      code
    }
  })
}

function handlePromise (promiseObj, errorInfo, noErrorToast) {
  return promiseObj.then(
    res => {
      if (res && res.data && res.data.rc === 0) {
        return Promise.resolve(res.data)
      } else {
        !noErrorToast && Toast('服务器开小差了')
        return Promise.reject(res.data)
      }
    },
    error => {
      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else {
        // 发送请求时产生错误
        console.log('Error', error.message)
      }
      !noErrorToast && Toast('服务器开小差了')
      return Promise.reject(error)
    }
  )
}
export default {
  get,
  post,
  uploadFile,
  getShareConfig
}
