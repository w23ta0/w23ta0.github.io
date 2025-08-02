# 让Centos支持打包、解压RAR文件包


有些朋友购买了vps后由于他是从原来的win主机搬迁过来，备份打包的数据是rar格式的，那在CentOS下怎么解压呢？

Google一下，找到解决办法：
```bash
wget http://www.rarsoft.com/rar/rarlinux-3.9.3.tar.gz
tar -xvf rarlinux-3.9.3.tar.gz
cd rar
make
```
看见下面这些信息就是安装成功了
```bash
mkdir -p /wp-content/local/bin
mkdir -p /wp-content/local/lib
cp rar unrar /wp-content/local/bin
cp rarfiles.lst /etc
cp default.sfx /wp-content/local/lib
```
但有的时候在运行命令rar时,出现下面这个问题:
```bash
rar: /lib/i686/nosegneg/libc.so.6: version `GLIBC_2.7′ not found (required by rar)
```
解决办法：
```
cp rar_static /wp-content/local/bin/rar
```

**使用举例**
```bash
rar x lvtao.rar //解压 lvtao.rar 到当前目录
rar lvtao.rar ./lvtao.net/ //将 lvtao.net 目录打包为lvtao.rar
```


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/e41f398b/  

