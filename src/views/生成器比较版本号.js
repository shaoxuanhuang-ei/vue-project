/**
 * @param {string} str
 * @return generator
 * @description 版本号：如1.5.6-alpha.1【1：主版本号，5：次版本号，6：修订版本号】
 */
function* walk(str) {
  let terminals = ['.', '+', '-'] //版本号可能存在的符号
  let part = '' //把版本号每部分切成一个个的生成器，用于后续返回比较
  for (let i = 0; i < str.length; i++) {
    if (terminals.includes(str[i])) {
      yield part //返回当前版本号
      part = '' //重置，用于下一个版本号生成
    } else {
      part += str[i]
      console.log(part, 'part')
    }
  }
}
const iterator = walk('1.5.6-alpha.1')
let n = iterator.next()
n = iterator.next()
n = iterator.next()
n = iterator.next()
n = iterator.next()
console.log(n)
