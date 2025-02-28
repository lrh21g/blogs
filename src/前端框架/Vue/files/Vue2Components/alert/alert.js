import Notification from './notification.js'

let messageInstance

// getMessageInstance 函数用来获取实例，
// 它不会重复创建，如果 messageInstance 已经存在，就直接返回了
// 只在第一次调用 Notification 的 newInstance 时来创建实例。
function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance()
  return messageInstance
}

function notice({ duration = 1.5, content = '' }) {
  const instance = getMessageInstance()

  instance.add({
    content,
    duration,
  })
}

// alert.js 对外提供 info方法
// 如果需要各种显示效果，比如成功的、失败的、警告的，可以在 info 下面提供更多的方法，比如 success、fail、warning 等，并传递不同参数让 Alert.vue 知道显示哪种状态的图标。
export default {
  info(options) {
    return notice(options)
  },
}
