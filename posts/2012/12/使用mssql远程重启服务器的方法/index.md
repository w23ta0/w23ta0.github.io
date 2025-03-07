# 使用MSSQL远程重启服务器的方法


单位托管有服务器,或者经常在家里休息时单位服务器出现问题时,相信用远程桌面或`pcanywhere`的朋友遇到过莫名其妙断线而不能再连接的情况。这时,如果服务器如果安装有SQL server,则可用如下的方法重启服务器解决。

本地用SQL server连接上服务器后,在SQL查询工具里执行如下命令:

```
xp_cmdshell &#39;shutdown -r -t 80&#39; 用SQL在80秒后重新启动电脑

shutdown -a 取消重新启动
shutdown.exe -a 取消关机
shutdown.exe -d [p]:xx:yy 列出系统关闭的原因代码。
shutdown.exe -f 强行关闭应用程序。
shutdown.exe -m \计算机名　控制远程计算机。
shutdown.exe -i 显示图形用户界面，但必须是Shutdown的第一个参数。
shutdown.exe -l 注销当前用户。
shutdown.exe -r 关机并重启。
shutdown.exe -t 时间 设置关机倒计时。默认值是 30 秒。
shutdown.exe -c &#34;消息内容&#34; 输入关机对话框中的消息内容(不能超127个字符)。
```
远程关闭/重启pcanywhere
```
xp_cmdshell net stop awhost32
xp_cmdshell net start awhost32
```


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/2012/12/%E4%BD%BF%E7%94%A8mssql%E8%BF%9C%E7%A8%8B%E9%87%8D%E5%90%AF%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%9A%84%E6%96%B9%E6%B3%95/  

