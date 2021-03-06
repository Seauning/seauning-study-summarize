/*
  4182 - 斐波那契序列
  
  ### 题目
  
  Implement a generic Fibonacci\<T\> takes an number T and returns it's corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).
  
  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
  
  For example
  ```js
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```
  
  > 在 Github 上查看：https://tsch.js.org/4182/zh-CN
*/



type Fibonacci<T extends number,
    CurrentIndex extends any[] = [1],
            Prev extends any[] = [],
         Current extends any[] = [1]>
     = 
        CurrentIndex['length'] extends T
         ? Current['length']
         : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>


import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
]

