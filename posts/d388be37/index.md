# 用命令行工具 Speedtest-Cli 来测试你的网速

我们经常需要到检查家里与办公室之间的网络是否连通，那么我们要怎么做呢？打开网站Speedtest.net然后开始测试。网站是通过加载浏览器中的JavaScript脚本然后选择最佳的服务器测速然后用Flash产生图形化的结果。

那么远程服务器呢？要知道大多数远程服务器是没有浏览器可以打开web页面的。用浏览器打开网页测速的瓶颈就在此，你不能按计划的对服务器进行定期的常规测试。这时需要到一个名为Speedtest-cli的软件来打破这个瓶颈，它能让你通过命令行来测试互联网连接的速度。

## Speedtest-cli是什么
此程序是基于Python开发的脚本程序，利用了speedtest.net的服务来测量出上下行的宽带。Speedtest-cli能根据机房离测速服务器的物理距离来列出测速服务器，或者针对某一服务器进行测速，同时还能为你生成一个URL以便你分享你的测速结果。

要在Linux上安装最新版本的speedtest-cli，你必须安装2.4-3.4或者更高版本的Python。

## 在Linux上安装speedtest-cli
有两种方法可以安装speedtest-cli。第一种方法需要用到python-pip包管理器，第二种方法需要安装Python脚本，生成安装文件然后运行，这里我们分别介绍两种方法：

1. 使用pythin-pip安装speedtest-cli
首先你需要安装python-pip包管理器，之后你就可以用pip命令来安装speedtest-cli
```bash
$ sudo apt-get install python-pip
$ sudo pip install speedtest-cli
```
 如果要把speedtest-cli升级至最新版本，你需要输入以下命令
```bash
$ sudo pip install speedtest-cli --upgrade
```

2. 通过Pyhton脚本来安装speedtest-cli
首先要用wget命令从github上下来Python脚本，然后解压提取下载的文件（master.zip)
```bash
$ wget https://github.com/sivel/speedtest-cli/archive/master.zip
$ unzip master.zip
```
 提取出文件后，进入提取出的目录speedtest-cli-master然后使脚本可以执行。
```bash
$ cd speedtest-cli-master/
$ chmod 755 speedtest_cli.py
```
 下一步，把可执行的脚本移动到/usr/bin文件夹，这样你就不用每次都输入完整的脚本路径了。
```bash
$ sudo mv speedtest_cli.py /usr/bin/
```

## 用speedtest-cli测试互联网连通速度
1. 要测试你的下载与上传速度，只需要运行speedtest-cli命令，不需要带参数。
```
$ speedtest_cli.py
```

 ![在Linux下测试上传下载速度](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/180425/211Jdfc8m3.png?imageslim, "在Linux下测试上传下载速度")

2. 测试上传下载的速度（以字节计算）
```
$ speedtest_cli.py --bytes
```
 ![mark](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/180425/FafLhCgFDL.png?imageslim, "测试bytes的速度")


3. 工具提供一个链接来下载由你的宽带测试结果生成的图片，你可以分享给你的家人朋友。
 ![分享测速结果](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/180425/jmG591hiGm.png?imageslim, "分享测速结果")

 下面的图片就是你通过以上的命令行测速而生成的图片
 ![测速结果](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/180425/4125e5iAgf.png?imageslim, "测速结果")

4. 如果你仅仅需要Ping，上传，下载的结果，就运行以下命令：
```
$ speedtest_cli.py --simple
```
 ![测试Ping，上传，下载的速度](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/180425/JhLm1296A2.png?imageslim, "测试Ping，上传，下载的速度")

5. 列出speedtest.net所有的服务器距离你的物理距离，单位是千米（km）
```
$ speedtest_cli.py --list
```

 ![列出Speedtest.net的服务器](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/180425/Jl0lcci8ai.png?imageslim, "列出Speedtest.net的服务器")


6. 当获得一个非常长的服务器列表之后，怎么列出我想要的某个服务器？如果我要在speedtest.net服务器列表中找出位于Mumbai（印度）的服务器呢？
```
$ speedtest_cli.py --list | grep -i Mumbai
```
 ![列出最近的服务器](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/180425/AlKLBdL3i3.png?imageslim, "列出最近的服务器")


7. 对指定的服务器进行测速。我们使用上面例子5和例子6中获取的服务器ID:
```bash
$ speedtest_cli.py --server [server ID]
$ speedtest_cli.py --server [5060]              ## 这里使用服务器ID为5060作为例子
```

 ![对指定的服务器进行测速](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/180425/G1K0F4f0b5.png?imageslim, "对指定的服务器进行测速")

8. 输出speedtest-cli的版本信息和帮助文档
```
$ speedtest_cli.py --version
```
 ![输出版本号](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/180425/dHaFDe39gh.png?imageslim, "输出版本号")

 ```
 $ speedtest_cli.py --help
 ```

 ![输出帮助文档](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/180425/hcKJh9Ggah.png?imageslim, "输出帮助文档")


**提醒**
报告中的延迟并不是确切的结果，不应该过于依赖它；这个数值可以当作相对延迟，这对你选择某一测试服务器来说是可靠的。同时，CPU和内存的容量会影响结果的准确度。

**结论**
系统管理员和开发者应该必备这个简单的脚本工具，这个轻量级的工具功能齐全，真是太赞了。我不喜欢Speedtest.net的原因是它使用来flash，相反speedtest-cli刚好戳中了我的痛点。

speedtest_cli是一个第三方工具，也不能自动地记录下宽带速度。Speedtest.net拥有上百万的用户，你可以自己[配制一个小型的测速服务器](http://www.tecmint.com/speedtest-mini-server-to-test-bandwidth-speed/)。


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/d388be37/  

