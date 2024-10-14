class SuperTask {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount //并发数量
    this.runningCount = 0 //正在执行任务数
    this.tasks = []
  }
  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject
      }) //添加了任务，但是现在不调用，通过_run来调度任务，而此时的resolve和reject是没法执行的，所以要把resolve和reject保留下来，给到_run去执行
      this._run()
    })
  }
  // 依次执行tasks中的所有任务
  _run() {
    //限制：每个时间点只能有两个任务并发运行(并且还有任务，才去循环执行)
    while (this.runningCount < this.parallelCount && this.tasks.length) {
      const { task, resolve, reject } = this.tasks.shift()
      //任务运行完成之后，才能调用任务的resolve和reject,这里假设task一定是一个异步任务，返回的是promise
      this.runningCount++ //每调用一个任务，当前执行数+1，完成后再-1
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount-- //空出来的位置又可以往下执行任务
          this._run() //递归调用执行
        })
    }
  }
}
function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), time)
  })
}
const superTask = new SuperTask()
function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`)
    })
}
// addTask(10000, 1) //10秒后输入，任务1完成
// addTask(5000, 2) //5秒后输入，任务2完成
// addTask(3000, 3) //8秒后输入，任务3完成【同时只能进行两个：10和5,5打印后3才进行】
// addTask(4000, 4) //12秒后输入，任务4完成
// addTask(5000, 5) //15秒后输入，任务5完成

// addTask(3000, 1) 时间一致的话，两个两个顺序执行
// addTask(3000, 2)
// addTask(3000, 3)
// addTask(3000, 4)
// addTask(3000, 5)
Number.prototype.add = function (n) {
  return this.valueOf() + n
}
Number.prototype.minus = function (n) {
  return this.valueOf() - n
}
// console.log((5).add(3.1).minus(2.2))
// console.log(parseInt('10', 2))

function flat(arr) {
  const result = []
  const stack = [].concat(arr) // 将数组元素拷贝至栈，直接赋值会改变原数组
  //如果栈不为空，则循环遍历
  while (stack.length !== 0) {
    const val = stack.pop()
    if (Array.isArray(val)) {
      stack.push(...val) //如果是数组再次入栈，并且展开了一层
    } else {
      result.unshift(val) //如果不是数组就将其取出来放入结果数组中
    }
  }
  return result
}
console.log(flat([1, 2, 3, [4, 6], [7, [8, 9]]]))
