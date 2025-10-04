# 运行yum报错Error: Cannot Retrieve Metalink for Repository: Epel


今天给Centos通过rpm -Uvh装了个epel的扩展后，执行yum list就开始报错：
```bash
Error: Cannot retrieve metalink for repository: epel. Please verify its path and try again
```

在网上查了查，解决办法是编辑`/etc/yum.repos.d/epel.repo`，把基础的恢复，镜像的地址注释掉
```bash
#baseurl
mirrorlist
```
改成
```bash
baseurl
#mirrorlist
```
**注意：**
安装epel时区分`i386 \ x86_64`，对应安装软件包，别忘了检查操作系统内核版本,如果装错包了也会报错！

哎呀，忘记把报错信息站出来了。下次把报错信息补上。


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/d3fa1f95/  

