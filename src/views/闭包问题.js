var o = (function () {
  var obj = {
    a: 1,
    b: 2
  }
  Object.setPrototypeOf(obj, null)
  return {
    get: function (key) {
      // if (!obj.hasOwnProperty(key)) return
      return obj[key]
    }
  }
})()

Object.defineProperty(null, 'abc', {
  get() {
    return this
  }
})
let object = o.get('abc')
object.a = '111'
object.hhh = 'jjj'
console.log(object)
