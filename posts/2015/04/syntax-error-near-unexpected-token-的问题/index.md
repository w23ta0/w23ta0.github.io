# Syntax Error Near Unexpected Token 的问题


如果你在windows里写的shell脚本放到linux系统里运行就可以会提示如下错误`syntax error near unexpected token ` 这是因为两个平台下面的换行符不一样导致的。所以需要转换下格式，`Notepad&#43;&#43;`就有这个功能。

1. 首先打开Notepad&#43;&#43;,让脚本显示所有符号，发现是CR LF
 ![图片描述](http://storage.live.com/items/9A8B8BF501A38A36!1489?filename=%e6%89%80%e6%9c%89%e7%9a%84%e6%8d%a2%e8%a1%8c%e9%83%bd%e6%98%afwindows%e7%9a%84CRLF.jpg)
2. 我们需要将windows的格式转为linux格式，做如下操作即可。
 编辑-&gt;档案格式转换-&gt;转换为UNIX格式
 ![图片描述](http://storage.live.com/items/9A8B8BF501A38A36!1490?filename=cpp%20%e8%bd%ac%e6%8d%a2%e4%b8%baUnix%e6%a0%bc%e5%bc%8f.jpg)
3. 转换之后，发现回车换行符就变了。再放入linux就不会报错了。
 ![图片描述](http://storage.live.com/items/9A8B8BF501A38A36!1491?filename=%e6%89%80%e6%9c%89%e7%9a%84%e9%83%bd%e6%98%aflinux%e7%9a%84LF%e4%ba%86.jpg)


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/2015/04/syntax-error-near-unexpected-token-%E7%9A%84%E9%97%AE%E9%A2%98/  

