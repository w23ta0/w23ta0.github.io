# Kali Linux的更新及清理

## 推荐的更新源
在安装完Kali后，需要对软件及系统进行更新，选择更新源是是十分重要的，虽然网上存在各种更新源，但是如果是一个新手的话，建议只选择官方的更新源，可以避免学习过程中遇到一些不必要的麻烦，而且目前官方源更新下载的速度也是很快的。
官方源： `deb http://http.kali.org/kali kali-rolling main non-free contrib`
中科大源： `deb http://mirrors.ustc.edu.cn/kali kali-rolling main non-free contrib`

## 添加更新源
更新源路径： `/etc/apt/sources.list`
往 `sources. list` 中添加官方源，保存。

## 常用更新命令
- `apt update` //检测可更新的软件
- `apt upgrade` //自动更新并安装软件
- `apt dist-upgrade` //检测并进行系统升级

## 常用清理命令
- `apt autoremove` //卸载过期的软件包
- `apt autosudo` //清理无用的软件包
- `apt autoclean` //清理缓存
- `apt clean` //强制清理缓存

## 需要注意的问题
在下载过程中如果出现Hash检验值不符不会软件是不会安装的
可能会出现 `签名无效，GPG错误` 的提示
![mark](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/180424/76H7c2ecim.png?imageslim)执行命令：`apt-key adv --keyserver hkp://keys.gnupg.net --recv-keys 7D8D0BF6`
然后就可以正常更新了。

---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/5dbca548/  

