# node-cluster-example

Node.js cluster example

## Test job code

- Intel(R) COre(TM) i5-6300HQ @ 2.30GHz => 1 Job duration: `(12 ~ 13s)`

```javascript
const work = () => {
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += Math.pow(Math.random(), 2)
  }
  return sum
}
```

## Source

test_1 (without cluster)

```javascript
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
```

test_2 (with cluster)

```javascript
const cluster = require('cluster')

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
if (cluster.isMaster) {
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
```

## Result

```bash
# test_1
Start!
1: 333331470.60355943
2: 333337801.3297179
3: 333335368.61288214
4: 333333797.4544157
5: 333344521.9288007
Work: 66208.771ms

# test_2
Start!
2: 333331572.1064403
3: 333331440.51167953
4: 333330201.0465253
1: 333333504.3422722
5: 333331132.16091245
Work: 18632.193ms
```
