# 如何知道 OpenStack Nova 的安装版本号？


安装完 OpenStack Nova 以后过段时间就很容易忘记自己装的是哪个版本，OpenStack 开发进度很快，遇到问题到 mailing list 寻求帮助的时候最好带上 Nova 的版本号。如何知道自己安装的是哪个版本的 OpenStack Nova 呢？
旧版本的 OpenStack Nova 提供了 version 的接口，不过只是针对开发人员，命令行工具没有面向系统管理员的接口，所以只能通过 python 调取 nava API 来获得version 信息：
```python
# nova-manage shell python
Python 2.7.1&#43; (r271:86832, Apr 11 2011, 18:13:53)
[GCC 4.5.2] on linux2
Type &#34;help&#34;, &#34;copyright&#34;, &#34;credits&#34; or &#34;license&#34; for more information.
(InteractiveConsole)
&gt;&gt;&gt; from nova import version
&gt;&gt;&gt; version.version_string()
&#39;2011.2&#39;
&gt;&gt;&gt; version.version_string_with_vcs()
u&#39;2011.2-workspace:tarmac-20110415024701-a9bdb77vaatk99lh&#39;
&gt;&gt;&gt;
```
新版本的 OpenStack Nova 提供了简单的管理员接口，不再需要通过 API 调用了：
```python
# nova-manage version list
2011.3-dev (2011.3-workspace:tarmac-20110428165803-elcz2wp2syfzvxm8)
```


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/2015/05/%E5%A6%82%E4%BD%95%E7%9F%A5%E9%81%93-openstack-nova-%E7%9A%84%E5%AE%89%E8%A3%85%E7%89%88%E6%9C%AC%E5%8F%B7/  

