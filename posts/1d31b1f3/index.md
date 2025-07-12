# Nginx中的upstream轮询机制介绍


Nginx中upstream有以下几种方式：

1. 轮询(weight=1)

默认选项，当weight不指定时，各服务器weight相同，
每个请求按时间顺序逐一分配到不同的后端服务器，如果后端服务器down掉，能自动剔除。

```nginx
upstream bakend {
    server 192.168.1.10;
    server 192.168.1.11;
}
```
2. weight

指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。
如果后端服务器down掉，能自动剔除。
比如下面配置，则1.11服务器的访问量为1.10服务器的两倍。

```nginx
upstream bakend {
    server 192.168.1.10 weight=1;
    server 192.168.1.11 weight=2;
}
```

3. ip_hash

每个请求按访问ip的hash结果分配，这样每个访客固定访问一个后端服务器，可以解决session不能跨服务器的问题。
如果后端服务器down掉，要手工down掉。

```nginx
upstream resinserver{
    ip_hash;
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
}
```

4. fair（第三方插件）

按后端服务器的响应时间来分配请求，响应时间短的优先分配。

```nginx
upstream resinserver{
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
    fair;
}
```

5. url_hash（第三方插件）

按访问url的hash结果来分配请求，使每个url定向到同一个后端服务器，后端服务器为缓存服务器时比较有效。
在upstream中加入hash语句，hash_method是使用的hash算法

```nginx
upstream resinserver{
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
    hash $request_uri;
    hash_method crc32;
}
```

设备的状态有:

- down 表示单前的server暂时不参与负载
- weight 权重,默认为1。 weight越大，负载的权重就越大。
- max_fails 允许请求失败的次数默认为1。当超过最大次数时，返回proxy_next_upstream 模块定义的错误
- fail_timeout max_fails次失败后，暂停的时间。
- backup 备用服务器, 其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/1d31b1f3/  

