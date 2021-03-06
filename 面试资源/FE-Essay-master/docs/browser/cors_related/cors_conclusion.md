# 跨域系列总结  
## 什么是跨域？  
  一个域下的文档或脚本试图去请求另一个域下的资源  
  是浏览器施加的安全限制  
## 同源策略  
  同源策略是一种约定，是浏览器最核心最基本的安全功能，缺少同源策略，浏览器容易受到 XSS、CSRF 等攻击  
  所谓同源是指 "协议 + 域名 + 端口" 三者相同，即便两个不同的域名指向同一个 ip 地址，也非同源  

***注意的点：***  
1. 如果是协议和端口造成的跨域，前端无法处理  
2. 是否跨域，仅仅通过 URL 的首部来判断，不会通过域名对应的 IP 是否相同来判断  
  "URL 的首部" 可以理解为 "协议、域名和端口必须匹配"  
3. 跨域并不是请求发不出去了，而是请求发出去了，也正常返回结果了，但是结果被浏览器拦截了  

## 跨域解决方案  

### JSONP  
  JSONP 本质是一个 Hack，利用 `<script>` 标签不受同源策略限制的特性进行跨域操作  
  通过动态创建script，再请求一个带参网址实现跨域通信  
  - 优点：  
    1. 实现简单  
    2. 兼容性好  
  - 缺点：  
    1. 只支持 get 请求(`<script>`标签只能 get)  
    2. 有安全性问题，容易受到 XSS 攻击(跨站脚本)  
    3. 需要服务端配合 JSONP 进行一定程度的改造  
  - 实现流程：  
    1. 声明一个回调函数，将回调函数名作为参数传递给跨域请求的服务器，函数形参为要获取的数据(服务器端返回的数据)  
    2. 创建一个 script 标签，跨域请求地址作为 script 标签的 src 属性值  
    3. 服务器收到请求后取出参数和回调函数名，将相应的数据作为回调函数的参数并返回给客户端调用回调函数  
    实现见 JSONP 文件夹下  

### CORS  
  CORS 是目前主流的跨域解决方案，跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器，让运行在一个 origin (domain) 上的Web 应用被准许访问来自不同源服务器上的指定的资源。  
  CORS 需要浏览器和后端同时支持  
  服务端设置 Access-Control-Allow-Origin 就可以开启 CORS  
  - 简单请求  
    1. GET、HEAD、POST 请求  
    2. Content-Type 为：text/plain、multipart/form-data、application/x-www-form-urlencoded(form 标签可以请求的类型)  
  - 复杂请求  
    简单请求之外的请求  
  **复杂请求跨域在正式通信前会先发送一个 OPTIONS 请求 --- "预检"请求，确认后端是否允许跨域请求**  
  1. Access-Control-Allow-Origin 设置哪个源可以访问我  
  2. Access-Control-Allow-Headers 允许携带哪个头访问我  
  3. Access-Control-Allow-Methods 允许哪个方法访问我  
  4. Access-Control-Allow-Credentials 允许携带 cookie  
  5. Access-Control-Max-Age 预检的存活时间  
  6. Access-Control-Expose-Headers 允许返回的头，把响应头暴露出去给前端  

### postMessage  
  postMessage 是 HTML5 XMLHttRequest Level 2 中的 API，允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递  
  `otherWindow.postMessage(message, targetOrigin, [transfer])`  
  1. otherWindow：其他窗口的一个引用  
  2. message：将要发送到其他窗口的信息  
  3. targetOrigin：指定哪些窗口能接收到消息事件  
  4. transfer：可选，一串和message 同时传递的 Transferable 对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权

### websocket  
  webSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了，因此可以跨域  

  WebSocket 协议本质是一个基于 TCP 的协议，为了建立一个 WebSocket 连接，客户端浏览器首先要向服务器发起一个 HTTP 请求，其中附加头信息 "Upgrade:WebSocket"，表明这是一个申请协议升级的 HTTP 请求，服务器端解析这些附加的头信息然后产生应答信息返回给客户端，客户端和服务器端的 WebSocket 连接就建立起来了，双方就可以通过这个连接通道自由的传递信息，并且这个连接会持续存在直到客户端或者服务器端的某一方主动的关闭连接  

  Socket.io  
  前端：  
  new webSocket()  
  socket.onopen()  
  socket.onmessage()  
  后端：  
  new WebSocket.Server({port})  
  on('connection')  
  ws.on('message')  

### node中间件代理(两次跨域)  
  实现原理: **同源策略是浏览器需要遵循的标准,而如果是服务器向服务器请求就无需遵循同源策略。**  
  1. 接收客户端请求  
  2. 将请求转发给服务器  
  3. 拿到服务器响应数据  
  4. 将响应转发给客户端  

## Nginx 反向代理  
  即所有客户端的请求都必须先经过 nginx 的处理，nginx 作为代理服务器再讲请求转发给 node 或者 java 服务，这样就规避了同源策略  
  
## document.domain + iframe  
  该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com，只需要给页面添加 document.domain ='test.com' 表示二级域名都相同就可以实现跨域，两个页面都通过 js 强制设置 document.domain 为基础主域，就实现了同域  

## location.hash + iframe  
  原理就是改变URL的hash部分来进行双向通信  
  a.html 要和 c.html 跨域相互通信，通过中间页 b.html 来实现。 三个页面，不同域之间利用 iframe 的 location.hash 传值，相同域之间直接 js 访问来通信  
  - 缺点：  
    数据直接暴露在了url中，数据容量和类型都有限等  

## window.name + iframe  
  window 对象有 name 属性，该属性有个特征：即在一个窗口(window)的生命周期内，窗口载入的所有的页面都是共享一个 window.name，每个页面对 window.name 都有读写的权限，window.name 是持久存在一个窗口载入过的所有页面中的，在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值，可以利用这个特点进行跨域  