# .Htaccess实现网页Gzip压缩


最近抽出了一点时间，研究了使用.htaccess 开启网页gzip压缩的问题。
大家都知道网页打开速度与dns，服务器，页面代码，网站结构，统统都相关。
网页压缩的问题。因为本人的大部分网站都是PHP的，所以，基本需要.htaccess来解决。

在.htaccess文件中请加入以下代码即可：
```php
<IfModule mod_deflate.c>
ExpiresActive On
ExpiresDefault A600
ExpiresByType image/x-icon A2592000
ExpiresByType application/x-javascript A2592000
ExpiresByType text/css A604800
ExpiresByType image/gif A2592000
ExpiresByType image/png A2592000
ExpiresByType image/jpeg A2592000
ExpiresByType text/plain A86400
ExpiresByType application/x-shockwave-flash A2592000
ExpiresByType video/x-flv A2592000
ExpiresByType application/pdf A2592000
ExpiresByType text/html A600
# Insert filters
AddOutputFilter DEFLATE html xml php js css
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
AddOutputFilterByType DEFLATE application/x-httpd-php
AddOutputFilterByType DEFLATE application/x-httpd-fastphp
AddOutputFilterByType DEFLATE image/svg+xml
# Drop problematic browsers
BrowserMatch ^Mozilla/4 gzip-only-text/html
BrowserMatch ^Mozilla/4.0[678] no-gzip
BrowserMatch !no-gzip !gzip-only-text/html
# Make sure proxies don't deliver the wrong conten
Header append Vary User-Agent env=!dont-vary
</IfModule>
```
如果没有这个文件，可以自己新建。然后上传到空间就可以了。
这时候，你可以使用站长工具测试一下。
推荐chinaz.com站长工具。

---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/4ff7f2ee/  

