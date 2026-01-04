# 解决Linux下取消挂载提示:device Is Busy


在我们进行远程文件操作的时候，我们经常会出现文件服务出现卸载掉哦情况。
```
umount /mnt/
umount: /mnt/: device is busy.
(In some cases useful info about processes that use
the device is found by lsof(8) or fuser(1))
```

**解决方法:**

1. 查找使用这个文件的进程和命令，具体的操作代码
```
[root@localhost ~]# lsof |grep /mnt/
lsof: WARNING: can't stat() cifs file system /mnt/
Output information may be incomplete.
bash 18841 root cwd unknown /mnt/TDDOWNLOAD/软件 (stat: No such device)
```

2. 然后执行ps命令可以查找执行此进程的命令
```
[root@localhost ~]# ps -ef|grep 18841
root 18841 18839 0 Nov29 pts/2 00:00:00 /bin/bash -l
root 29496 25604 0 16:26 pts/0 00:00:00 grep 18841
```

3. 强行结束无关进程
```
[root@localhost ~]# kill -9 18841
```

4. 然后卸载相关挂载
```
[root@localhost ~]# umount /mnt/net1
```

5. 然后可以再通过mount命令进行查看。


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/d4af459a/  

