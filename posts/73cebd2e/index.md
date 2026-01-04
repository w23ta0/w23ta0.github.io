# Centos6下安装MySQL-Python时出现“error: Command 'Gcc' Failed With Exit Status 1”

## 问题描述

在MySQL-python-1.2.5源码包根目录下执行安装命令：
```bash
# python setup.py install
```
出现以下信息：
```
error: command ‘gcc’ failed with exit status 1
```

## 解决方法
在安装MySQLdb前安装以下依赖库：
```bash
# yum install python-devel mysql-devel zlib-devel openssl-devel
```
安装完以上依赖库后， 再在MySQL-python-1.2.3源码包根目录下执行以下安装命令即可：
```bash
# python setup.py install
```
如下信息表示MySQLdb安装成功：
```
Installed /usr/lib64/python2.6/site-packages/MySQL_python-1.2.5-py2.6-linux-x86_64.egg
Processing dependencies for MySQL-python==1.2.5
Finished processing dependencies for MySQL-python==1.2.5
```

## 检测模块MySQLdb是否可正常使用
```py
[root@gateway ~]# python
Python 2.6.6 (r266:84292, Aug 18 2016, 15:13:37)
[GCC 4.4.7 20120313 (Red Hat 4.4.7-17)] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import MySQLdb
>>>
```

没消息就是好消息！
OK， Enjoy it!!!


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/73cebd2e/  

