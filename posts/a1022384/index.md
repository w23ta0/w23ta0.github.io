# 如何知道 OpenStack Nova 的安装版本号？


安装完 OpenStack Nova 以后过段时间就很容易忘记自己装的是哪个版本，OpenStack 开发进度很快，遇到问题到 mailing list 寻求帮助的时候最好带上 Nova 的版本号。如何知道自己安装的是哪个版本的 OpenStack Nova 呢？
旧版本的 OpenStack Nova 提供了 version 的接口，不过只是针对开发人员，命令行工具没有面向系统管理员的接口，所以只能通过 python 调取 nava API 来获得version 信息：
```python
# nova-manage shell python
Python 2.7.1+ (r271:86832, Apr 11 2011, 18:13:53)
[GCC 4.5.2] on linux2
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
>>> from nova import version
>>> version.version_string()
'2011.2'
>>> version.version_string_with_vcs()
u'2011.2-workspace:tarmac-20110415024701-a9bdb77vaatk99lh'
>>>
```
新版本的 OpenStack Nova 提供了简单的管理员接口，不再需要通过 API 调用了：
```python
# nova-manage version list
2011.3-dev (2011.3-workspace:tarmac-20110428165803-elcz2wp2syfzvxm8)
```


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/a1022384/  

