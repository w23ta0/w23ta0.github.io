# XAMPP 和 VMWare 的端口443冲突的解决


在电脑里装了VMware后，再要装xampp，十有八九就会出现这个问题：

	10:21:18  [Apache]  Problem detected!
	10:21:18  [Apache]  Port 443 in use by ""d:\Program Files (x86)\VM\vmware-hostd.exe" -u "C:\ProgramData\VMware\hostd\config.xml"" with PID 2764!
	10:21:18  [Apache]  Apache WILL NOT start without the configured ports free!
	10:21:18  [Apache]  You need to uninstall/disable/reconfigure the blocking application
	10:21:18  [Apache]  or reconfigure Apache and the Control Panel to listen on a different port

这个问题是处在VMware上，VMware将443端口占用了，而apache也需要443端口。所以，想要开启apache的服务，必须要将VMware端口改变。


操作如下：

1. 打开菜单 编辑→参数（Edit–> Preferences），如下图：
 ![img](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20190703175424323.png)

2. 选择 共享虚拟机（Shared VMs），点击禁用共享。这里的HTTPS端口是443，正是apache需要的。

![img](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20190703175632666.png)

3. 为了方便vmware的使用,我们把443修改成任意一个空闲端口即可，如下图：
  ![img](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20190703175945266.png)

接下来启用共享，在开启apache，是不是问题就解决了呢？


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/3123c592/  

