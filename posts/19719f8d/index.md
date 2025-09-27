# Win7笔记本电脑启用虚拟Wifi共享上网


今天看了一个帖子，win7系统通过笔记本的无线网卡，启用虚拟Wifi功能共享上网，自己尝试了一下，感觉很好用，至少没有无线路由的自己，手机可以上wifi了，更新软件玩微信等等，都方便多了，好了，废话不多说，先介绍下吧。

## 启动承载网络

查看笔记本网卡是否支持”启动承载网络”的功能，使用管理员运行cmd命令，

	netsh wlan show driver

显示无线网卡驱动信息，如下图所示，如果功能是”否”，说明你的无线网卡不支持这个功能，如果为”是”就继续跟我尝试这个功能吧。【确定的方法，还可以查看任务管理器，无线网卡的”驱动程序详细信息”，里面是否有vwifibus.sys驱动程序文件，大家也可以通过这个方法确定】

![Hosted network mode supported by WiFi driver ](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/wifi-driver-hosted-network-supported.jpg)

## 设置SSID和密码

确定你的无线网卡有这个功能后，开始启动virtaul wifi.同样是命令行

	netsh wlan set hostednetwork mode=allow ssid=Windows7AP key=password

启动后，可以查看”网络共享中心”-“更改适配器设置”，里面会多出一个”Microsoft Virtual WiFi Miniport Adapter”，你也可以重命名这个网络连接，当然这个对于网络连接是没有任何影响的，我重命名改成了Virtual WiFi，主要是之前看着太长了，哈哈。

## 开启共享上网

打开”网络共享中心”-“更改适配器设置”【在左侧的栏里面】-找到你现在上网用的连接，右键属性，点击共享的标签，勾选第一个选项卡【如下图】，在下面的输入框点击，弹出列表，选择你的Microsoft Virtual WiFi Miniport Adapter网络连接，我这里刚刚重命名了，所以选择Virtual WiFi，确定。

![Allow other network users to connect through this computer’s Internet connection](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/Allow-other-network-users-connect-to-Internet.jpg)

## 打开无线网

在命令行中输入：`netsh wlan start hostednetwork`
启动后，用手机搜这个无线网，就可以咯，哈哈，我现在已经通过这个方式上网了，如果你只有一台电脑能通过网线上网，又有其它需求，不妨试一下。当然，这一项有可能报错，是因为你没有启动无线网卡，哥、通过无线网卡上网，不启动怎么行呢？！好了，不废话了，我去玩微信了，大家拜咯~


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/19719f8d/  

