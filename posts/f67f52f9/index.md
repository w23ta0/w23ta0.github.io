# 架设Ubuntu Apt-Cacher服务


源服务器名称可能不太准确，意思是创建内网自己的私服，这样只要有Ubuntu通过该私服下载安装过软件，私服都会缓存，下一个Ubuntu的请求就直接从缓存中获取。
最近Ubuntu源服务器太慢了，北京的网络也够烂的。逼不得已！

首先安装apt-cacher

```bash
apt-get install apt-cacher
```
装的过程中选择Daemon方式。 装完后，/etc/default/apt-cacher 文件内容应该如下：

```bash
AUTOSTART=1
```
所以服务应该已经启动了。 到/etc/apt-cacher/apt-cacher.conf文件中修改一行配置，允许任何客户端访问：

```bash
allowed_hosts = *
```
重启服务 `service apt-cacher restart`
然后打开网页：http://your_ip:3142/apt-cacher
看到页面就说明服务器正常启动了。
在/etc/hosts文件中添加一行，可以帮助找到chrome依赖的dl.google.com

```bash
203.208.45.206 dl.google.com
```
在客户端的ubuntu机器上，创建文件 `/etc/apt/apt.conf`文件或者`/etc/apt/apt.conf.d/01proxy`文件
内容如下：

```bash
Acquire::http::Proxy "http://your_server:3142";
```
然后运行`apt-get update`, 为了确认真的起作用。可以查看`apt-cacher`的日志，到服务器上查看目录下的日志文件 /var/log/apt-cache,缓存存放地址 /var/cahe/apt-cacher/


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/f67f52f9/  

