/*
  533 - Concat
  
  ### 题目
  
  在类型系统里实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，
  返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。
  
  举例，
  
  ```ts
  type Result = Concat<[1], [2]> // expected to be [1, 2]
  ```
*/

type Concat<T extends any[], U extends any[]> = [...T, ...U]

type Concat1 = Concat<[], []>;
type Concat2 = Concat<[], [1]>;
type Concat3 = Concat<[1, 2], [3, 4]>;
type Concat4 = Concat<['1', 2, '3'], [false, boolean, '4']>;

