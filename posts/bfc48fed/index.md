# Nginx重定向&静动资源分离


## 域名重写
我们可以在同一个server中绑定域名www.example.com和example.com两个域名：
```nginx
server {
    listen 80;
    server_name example.com www.example.com;
  }
```
但是这样对我们的SEO非常不利，我们需要使用301（rewrite）将一个域名重定向到另一个，比如将example重定向到www.example.com。这里要依赖于正则表达式的分组（使用$1来引用分组）。

```
 server {
    listen 80;
    server_name example.com www.example.com;
    if($host!= 'www.example.com'){
      rewrite ^/(.*)$ http://www.example.com/$1 permanent;
    }}
```

## http重写到https
另一个需求是将两个域名的所有的http请求转发到https上，提高安全级别，同时实现二级域名转向一级域名。
```nginx
server {
listen 80;
server_name www.debugo.com debugo.com;
rewrite ^(.*)$  https://$host$1 permanent;
}
server {
        listen 443 ssl;
        ssl_certificate /etc/nginx/server.crt;
        ssl_certificate_key /etc/nginx/server.key;
        server_name www.debugo.com debugo.com;
        root /webrooot;
        index index.html index.htm;
        if ($host != 'debugo.com') {
              rewrite ^/(.*)$ https://debugo.com/$1 permanent;
        }
        #...
}
```

## 静动态分离
我们通常有自己的动态语言服务器（例如Python wsgi，Node.JS），而静态文件我们又希望使用Nginx来管理，提供缓存等功能。就要使用到下面的配置：
```nginx
location ~ .*\.(html|htm|gif|jpg|jpeg|bmp|png|ico|txt|js|css)$
        {
                root /web/build;
        }

location / {
              proxy_pass http://54.3.6.34:8000;
              proxy_redirect off;
              proxy_set_header HOST $host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
              client_max_body_size 10m;
              client_body_buffer_size 128k;
              proxy_connect_timeout 90;
              proxy_send_timeout 90;
              proxy_read_timeout 90;
              proxy_buffer_size 4k;
              proxy_buffers 4 32k;
              proxy_busy_buffers_size 64k;
              proxy_temp_file_write_size 64k;
        }
}
```


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/bfc48fed/  

