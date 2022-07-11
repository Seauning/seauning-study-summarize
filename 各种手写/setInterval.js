function mySetInterval (callback, time) {
  let timer = null
  let interv = function () {
    callback();
    timer = setTimeout(interv, time)
  }
  timer = setTimeout(interv, time)
  return timer;
}

let timer = mySetInterval(() => {
  console.log(1)
}, 1000)

if (timer) {
  clearInterval(timer)
  timer = null
}

function mySetTimeout (callback, time) {
  let timer = setInterval(() => {
    clearInterval(timer)  // 先清除再执行，因为回调的执行时间可能很久
    callback()
  }, time)
  return timer
}
const start = new Date()
timer = mySetTimeout(() => {
  console.log(1);
}, 5000)

if (timer) {
  clearTimeout(timer)
}