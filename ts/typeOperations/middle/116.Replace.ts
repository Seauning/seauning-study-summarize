/*
  116 - Replace
  
  ### 题目
  
  实现 `Replace<S, From, To>` 将字符串 `S` 中的第一个子字符串 `From` 替换为 `To` 。
  
  例如
  
  ```ts
  type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
  ```
*/



type Replace<S extends string,
          From extends string,
            To extends string> = From extends ''
                                    ? S
                                    : S extends `${infer L}${From}${infer R}`
                                        ? `${L}${To}${R}`
                                        : S ;

type ReplaceCase<S extends string,
          From extends string,
            To extends string> = S extends `${infer L}${From}${infer R}`
                                        ? `${L}${From extends '' ? '' : To}${R}`
                                        : S ;

import type { Equal, Expect } from '@type-challenges/utils'

type Replace1 = Replace<'foobar', 'bar', 'foo'>;
type Replace2 = Replace<'foobarbar', 'bar', 'foo'>;
type Replace3 = Replace<'foobarbar', '', 'foo'>;
type Replace4 = Replace<'foobarbar', 'bar', ''>;
type Replace5 = Replace<'foobarbar', 'bra', 'foo'>;
type Replace6 = Replace<'', '', ''>;

type ReplaceCase1 = ReplaceCase<'foobar', 'bar', 'foo'>;
type ReplaceCase2 = ReplaceCase<'foobarbar', 'bar', 'foo'>;
type ReplaceCase3 = ReplaceCase<'foobarbar', '', 'foo'>;
type ReplaceCase4 = ReplaceCase<'foobarbar', 'bar', ''>;
type ReplaceCase5 = ReplaceCase<'foobarbar', 'bra', 'foo'>;
type ReplaceCase6 = ReplaceCase<'', '', ''>;

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]