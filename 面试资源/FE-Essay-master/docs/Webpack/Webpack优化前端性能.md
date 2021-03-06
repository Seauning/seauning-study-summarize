# 使用 Webpack 优化前端性能  
使用 Webpack 来优化前端性能是指优化 Webpack 的输出结果，让打包的最终结果在浏览器运行更快  

1. 代码压缩：删除多余的代码、注释、简化代码的写法  
  uglifyjs-webpack-plugin  
  optimize-css-assets-webpack-plugin  
2. 利用 CDN 加速，在构建过程中将引用的静态资源路径修改为 CDN 路径  
3. treeShaking：在模块引用的时候把没有用到的代码块干掉  
  原理：ES6 模块化的静态解析能力，在解析阶段就可以输出模块的依赖关系  
4. Code Splitting：将代码按路由维度或者组件分块(chunk),这样做到按需加载，同时可以充分利用浏览器缓存  
5. 提取公共第三方库：SplitChunksPlugin 插件来进行公共模块抽取，利用浏览器缓存可以长期缓存这些无需频繁变动的公共代码  
6. Scope Hoisting：让 Webpack 打包出来的文件更小，运行更快  
  又称作用域提升，打包完之后存在大量的闭包，作用域很多，内存开销大  
  原理：按照引入顺序放在一个函数作用域里，**适当的重命名防止冲突**  
  由于 Scope Hoisting 需要分析出模块之间的依赖关系，因此源码必须采用 ES6 模块化语句  
7. 分离两套配置：一般来说在项目开发中，区分开发和生产环境两套配置，各司其职  
8. (开发优化)source-map：webpack 打包的时候改变了源码，在调试的时候非常的不方便，因为保存的行列已经对不上了，source-map 就解决这个问题  
  source-map 会生成一个映射文件，打包后的代码和源码(书写时的代码)的一个映射文件  
  出现错误的时候便于快速定位错误位置，方便调试  
  
inline-source-map  
  就是把映射文件放在打包完了的代码末尾  
cheap  
  忽略列信息，报错的时候只包行错误  