let [n, p, x] = readline().split(' ').map((num) => (+num));
const arr = readline().split(' ').map((num) => (+num));
let plans = 0;
let sum = arr.reduce((a, b) => a + b, 0);
for (let i = 0; i < arr.length; i++) {
  let curNum = arr[i];
  let tmp = sum - curNum;    // 先减去当前的
  let fit = tmp % x ? x - tmp % x : x;    // 差多少能满足解
  let counts = p === fit ? 1 : p < fit ? 0 : ~~((p + tmp % x) / x);    // 计算满足的次数
  if (sum % x === 0 && curNum <= p) counts--;    // 如果这个数本身也满足则减一
  plans += counts;
}
console.log(plans);