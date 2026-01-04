# 让Linux主机开启.htaccess支持


国内的很多Linux型主机默认是不开启.htaccess的，从而导致不支持伪静态。而国外的虚拟主机基本上都是支持此服务的，我曾经问过国内的主机提供商为何不开启.htaccess服务，他们的回答很可笑，说是减轻服务器的负担，呵，这真是符合了中国的国情，真让你不知以何种语言反击之。

这里给一些菜鸟扫扫盲，很多站长都单纯的以为.htaccess就是伪静态，把.htaccess当成伪静态的代名词，以为.htaccess就起到.htaccess的作用，其实它的作用比你想象的大得多，除了伪静态，还有我们熟知的404啊、301跳转啊等，都可以通过.htaccess来实现，下面来给大家介绍一下如何在Linux型主机下开启.htaccess的支持，前提你有这个权限，一般这个针对的是服务器或者VPS，虚拟主机基本上是没门，除非你要求提供商帮你开启。另一种情况是有些童鞋在本地搭建PHP+MySQL+Apache的时候用得着此方法，本地的一键安装包有xampp 和phpnow等，我个人推荐使用phpnow，简单易用，完全傻瓜式。如果你使用phpnow搭建的话你就不用往下看了，因为默认是开启的。

**方法如下：**

第一：在Apache文件夹下的conf文件夹中找到httpd.conf，记事本或者类似的编辑工具打开后Ctrl+F查找 `LoadModule rewrite_module`，找到 `LoadModule rewrite_module modules/mod_rewrite.so` 所在的那一行，确定这一行前面没有`#`，就说明已经加载了伪静态模块，假如这一行前面有#，请去掉，phpnow安装后默认是没有#的。

第二：让Apache服务器支持.htaccess，如何让自己的本地Apache服务器支持".htaccess"呢?其实只要简单修改一下 apache的httpd.conf设置就可以让支持.htaccess了。打开httpd.conf文件，用文本编辑器打开后,查找

	Options FollowSymLinks AllowOverride None
改为

	Options FollowSymLinks AllowOverride All

1. 是确定是否已经加载了伪静态模块
2. 是修改这一处的设置。操作完后测试一下.htaccess是否已生效，如还未生效，请重启Apache服务。


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/28e6d681/  

