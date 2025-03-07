# Docker私有仓库pull镜像报错：server Gave HTTP Response to HTTPS Client


执行docker pull过程中报错：

```bash
Error response from daemon: 
Get  https://xxx.xxx.xxx.xxx:5000/v2/ : 
http: server gave HTTP response to HTTPS client
```

&lt;blockquote class=&#34;question&#34;&gt;这是由于Registry为了安全性考虑，默认是需要https证书支持的。&lt;/blockquote&gt;
解决方法：

在/etc/docker/daemon.json文件中新增一行&#34;insecure-registries&#34;:[&#34;xxx.xxx.xxx:5000&#34;]，没有则新建此文件。

```bash
vi /etc/docker/daemon.json
{ 
	&#34;insecure-registries&#34;:[&#34;xxx.xxx.xxx.xxx:5000&#34;] 
}
#重启docker
sudo /etc/init.d/docker restart
```
&lt;div class=&#34;note warning&#34;&gt;&lt;p&gt;需要访问私有registry的节点都需要执行此操作。&lt;/p&gt;&lt;/div&gt;
参考：&lt;https://stackoverflow.com/questions/38695515/can-not-pull-push-images-after-update-docker-to-1-12&gt;

---

> 作者: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/20171229-docker%E7%A7%81%E6%9C%89%E4%BB%93%E5%BA%93pull%E9%95%9C%E5%83%8F%E6%8A%A5%E9%94%99server-gave-http-response-to-https-client/  

