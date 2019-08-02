/**
 * Without cluster
 */

const todo = [1, 2, 3, 4, 5]

const work = () => {
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += Math.pow(Math.random(), 2)
  }
  return sum
}

console.log('Start!')
console.time('Work')
todo.forEach(n => {
  console.log(`${n}: ${work()}`)
})
console.timeEnd('Work')
