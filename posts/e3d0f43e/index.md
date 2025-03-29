# Apache访问日志分析


当前WEB服务器中联接次数最多的ip地址

```bash
$ netstat -ntu |awk &#39;{print $5}&#39; |sort | uniq -c| sort -nr
```

查看日志中访问次数最多的前10个IP

```bash
$ cat access.log |cut -d &#39; &#39; -f 1 |sort |uniq -c | sort -nr | awk &#39;{print $0 }&#39; | head -n 10 |less
```

查看日志中出现100次以上的IP

```bash
$ cat access.log |cut -d &#39; &#39; -f 1 |sort |uniq -c | awk &#39;{if ($1 &gt; 100) print $0}&#39;｜sort -nr |less
```

查看最近访问量最高的文件

```bash
$ cat access.log |tail -10000|awk &#39;{print $7}&#39;|sort|uniq -c|sort -nr|less
```

查看日志中访问超过100次的页面

```bash
$ cat access.log | cut -d &#39; &#39; -f 7 | sort |uniq -c | awk &#39;{if ($1 &gt; 100) print $0}&#39; | less
```

统计某url，一天的访问次数

```bash
$ cat access.log|grep &#39;12/Aug/2009&#39;|grep &#39;/images/index/e1.gif&#39;|wc|awk &#39;{print $1}&#39;
```

前五天的访问次数最多的网页

```bash
$ cat access.log|awk &#39;{print $7}&#39;|uniq -c |sort -n -r|head -20
```

从日志里查看该ip在干嘛

```bash
$ cat access.log | grep 218.66.36.119| awk &#39;{print $1″\t”$7}&#39; | sort | uniq -c | sort -nr | less
```

列出传输时间超过 30 秒的文件

```bash
$ cat access.log|awk &#39;($NF &gt; 30){print $7}&#39; |sort -n|uniq -c|sort -nr|head -20
```

列出最最耗时的页面(超过60秒的)

```bash
$ cat access.log |awk &#39;($NF &gt; 60 &amp;&amp; $7~/\.php/){print $7}&#39; |sort -n|uniq -c|sort -nr|head -100
```


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/e3d0f43e/  

