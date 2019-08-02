/**
 * With cluster
 */

const cluster = require('cluster')

const todo = [1, 2, 3, 4, 5]

const work = () => {
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += Math.pow(Math.random(), 2)
  }
  return sum
}

if (cluster.isMaster) {
  console.log('Start!')
  console.time('Work')
  let closed = 0

  todo.forEach(_ => {
    cluster.fork()
  })

  cluster.on('exit', () => {
    if (todo.length <= ++closed) {
      console.timeEnd('Work')
    }
  })
} else {
  console.log(`${cluster.worker.id}: ${work()}`)
  process.exit(0)
}
