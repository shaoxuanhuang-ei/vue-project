function aaa(lists) {
  return new Promise((resolve, reject) => {
    let result = [],
      count = 0,
      fulfillCount = 0
    for (let item of lists) {
      let index = count
      count++
      Promise.resolve(item).then((res) => {
        result[index] = res
        fulfillCount++
        if (fulfillCount === count) {
          resolve(result)
        }
      }, reject)
    }
    if (count === 0) {
      resolve(result)
    }
  })
}
aaa([1, 2, 3, 6]).then((data) => {
  console.log(data)
})
