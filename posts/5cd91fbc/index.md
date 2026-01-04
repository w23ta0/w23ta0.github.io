# Linux基础：文件管理

在 Linux 下，所有的文件与目录都是由根目录（/）开始的。然后再一个一个分支下来，形成一棵繁杂的树。因此我们也称这种目录配置方式为“目录树”。那目录树与文件系统有什么关系，目录树是怎么实现的呢？


## 目录
在 Linux 系统中，目录也是一种文件。我们可以使用 `$ls -li`来查看一个目录的属性。
```bash
$ls -li  /home/user01
141494  drwxr-xr-x 18 user01 user01    4096 12月  2  2013 hadoop-1.1.1
1715845 drwxrwxr-x  2 user01 user01    4096  7月 12 09:07 input
1718481 -rw-rw-r--  1 user01 user01       0  7月 12 16:11 test.txt
1718478 -rw-r--r--  1 root    root    1780292  6月 16 19:04 etc.jar.bz2
……
```
其中`-i`参数是显示文件的 inode 号。可以看到第一列就是目录/文件的 inode 号。因此 ext 文件系统对于目录也会像对待文件一样分配其 inode 块和 block 块。只不过，在目录中 inode 块记录的是该目录的相关权限与属性以及分配到的 block 块号码，而 block 则记录的是这个目录下的/**文件名**/与该文件名占用的 inode 号码数据。

没错，在 Linux 中文件的 inode 中是不记录文件名的，文件名是记录在目录的 block 中。因此在新增/删除/重命名文件的时候，与目录的w权限有关。另一个直观的感受就是，你可以对正在使用的文件改名，换目录，甚至放到废纸篓，都不会影响当前文件的使用，这在 Windows 里是无法想象的。比如你打开个 Word 文件，然后对其进行重命名操作，Windows 会告诉你先给我关闭文件！

当我们读取一个文件时，实际上是在目录中找到了这个文件的 inode 编号，然后根据 inode 中的 block 指针，把各个 block 数据块组合起来，放入内存供进一步的处理。当我们写入一个文件时，是分配一个空白inode给该文件，将其inode编号记入该文件所属的目录，然后选取空白的数据块，让inode的指针指像这些数据块，并放入内存中的数据。

## 硬链接与软链接
当文件出现在一个目录文件中时，我们就把文件接入到文件系统中（在目录中写入该文件的文件名和 inode 号），我们称建立一个到文件的硬链接（hard link）。一个文件允许出现在多个目录中，这样，它就有多个硬链接。当硬链接的数目（link count）降为0时，文件会被 Linux 删除。所以很多时候，unlink 与 remove 在 Linux 操作系统中是一个意思。引入硬链接的目的是为了“安全”，如果你将任何一个“文件名”删除，其实 inode 与 block 都还是存在的。此时可以通过另一个“文件名”来读取到正确的文件数据。此外，不论你使用哪个“文件名”来编辑，最终的结果都会写入到相同的 inode 与 block 中，因此均能进行数据的修改。

至于软链接（soft link），其实就是 Windows 上的快捷方式。基本上，软链接就是在创建一个新的独立的文件，而这个文件会让数据的读取指向它连接的那个文件的文件名。由于只是利用文件来作为指向的操作，所以，当源文件被删除后，软链接的文件会打不开。由于软链接（soft link）的广泛使用不会影响 link count，而且可以跨越文件系统，现在较少手动建立硬连接。

创建硬链接与软链接使用 ln 命令即可。
```bash
$ln [-s] 源文件 目标文件
-s : 如果不加任何参数就是硬链接，加上 -s 就是软链接

~$ln -s /etc/crontab .
~$ln /etc/crontab crontab2
~$ ll -i /etc/crontab ~/crontab ~/crontab2
1310870 -rw-r--r-- 2 root    root    722  6月 15  2012 /etc/crontab

1310870 -rw-r--r-- 2 root    root    722  6月 15  2012 /home/user01/crontab2
1718696 lrwxrwxrwx 1 user01 user01  12  7月 12 16:42 /home/user01/crontab -> /etc/crontab
```
可以看到硬链接文件的 inode 是同一个，并且连接数变成了 2。而软链接是一个新的文件，拥有自己的 inode 号。

## 文件系统管理命令
```bash
$df
列出文件系统的整体磁盘使用量
-h  以人们容易阅读的 GB MB KB 等格式自行显示
-i  不使用硬盘容量，而以 inode 的数量显示

$du file/dir
评估目录所占容量
-h  以人们容易阅读的 GB MB KB 等格式自行显示
-s  仅显示总计，不列出每个子目录的占用容量
-m  以 M 为单位
```

例如：
```bash
$ df -h
文件系统          容量  已用  可用  已用% 挂载点
/dev/sda1        29G  4.2G   23G   16% /
udev           1001M  4.0K 1001M    1% /dev
tmpfs           404M  792K  403M    1% /run
none            5.0M     0  5.0M    0% /run/lock
none           1009M  152K 1009M    1% /run/shm
none            100M   28K  100M    1% /run/user
$ du -sh /home/user01/
1.1G     /home/user01/
```

## 总结
主要概括性总结了目录文件的构成，以及与普通文件之间的关系。讲解了硬链接和软链接，以及 `df du` 命令。

Linux 是一个文件王国，一切都以文件的形式存在。了解 Linux 的文件系统，是深入了解操作系 Linux 原理的重要一步。

## 参考资料
[鸟哥的Linux私房菜.基础学习篇](http://book.douban.com/subject/4889838/)


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/5cd91fbc/  

