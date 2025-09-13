# Dell R410 Debian 64位网卡驱动


公司买的Dell R410的机器，装的Debian的系统，安装过程中会提示找不到网络设备驱，去Dell 官方查看R410网卡驱动没有找到Debian版本的（Redhat的倒是有），上网查资料得知Debian从5开始就不支持Broadcom的网卡驱动（偶装的就是5,，悲催啊）。去broadcom下载源码包netxtreme2-5.0.17.tar.gz。
下载地址：http://www.broadcom.com/support/ethernet_nic/downloaddrivers.php

1. 首先安装操作系统，我装的是debian-6.0.2.1-amd64版本的。安装过程中提示找不到网络设备驱动，不用管它，直接继续安装。系统装好后ifconfig查看网卡信息，果然只能看到lo，找不到eth0的信息。
2. 把下载的驱动包netxtreme2-5.0.17.tar.gz 通过U盘拷贝到系统并解压缩。
 ```bash
#mount /dev/sdb1 /mnt
#cp netxtreme2-5.0.17.tar.gz /home
#cd /home
#tar -zxvf netxtreme2-5.0.17.tar.gz
 ```
3. 检查系统有没有安装make和gcc
 ```bash
#make -v
#gcc -v
 ```
 安装了的话会输出版本信息，没有安装的话会提示commond not found。（确定系统安装了make和gcc的可以跳转到第六步，没有装的继续）
4. 创建本地源
 由于gcc的依赖关系比较多，决定做个本地源，先把安装盘挂载上，把里面的软件包拷贝出来。
 ```bash
#mount /dev/cdrom /mnt
#mkdir –p /wp-content/local/debian/pools
#cp -R /mnt/pools /wp-content/local/debian/pools
#mkdir –p /wp-content/local/debian/dists/sid/main/binary-amd64
#cd /wp-content/local/debian/pools/main/d/dpkg
#dpkg –I dpkg-dev_1.15.8.11_all.deb；dpkg –I libdpkg-perl_1.15.8.11_all.deb
#ls -1 pools | sed ‘s/_.*$/ extra BOGUS/’ | uniq > override (把pools目录下所有的deb包包名写入文件override中)
#dpkg-scanpackages pools override > dists/sid/main/binary-amd64/Packages (把所有包的包名、版本号、依赖关系等信息写入文件Packages中)
#vi /dists/sid/main/Release
 ```
 输入以下内容：
 ```
Archive: sid
Version: lenny
Component: main
Origin: Local
Label: Local
Architecture: amd64
#echo "deb file:/wp-content/local/debian sid main" >> /etc/apt/source.list
 ```
5. 安装make和gcc。
 ```bash
#apt-get install update
#apt-get install make
#apt-get install gcc
 ```
6. 编译
 ```bash
#cd /home/netxtreme2-6.2.23\netxtreme2-6.2.23\bnx2-2.0.23b\src
#make
 ```
 不排除个别人品好的直接make成功，我反正是失败了。错误提示如下:
 ```
make -C SUBDIRS=/wp-content/local/src/network/netxtreme2-5.0.17/bnx2-1.9.20b/src modules
make: *** SUBDIRS=/wp-content/local/src/network/netxtreme2-5.0.17/bnx2-1.9.20b/src: No such file or directory. Stop.
make: *** [default] Error 2
 ```
 No such file or directory，找不到文件或目录。英语好的建议直接看Makefile，英语不好的,还是google一下吧！
 我找到的解释为：
 发现(/lib/modules/$(KVER)/build )路径并不存在,如下：
 ```bash
#ls /lib/modules/2.6.26-2-686/build
ls: cannot access /lib/modules/2.6.26-2-686/build: No such file or directory
 ```
 对应的解决办法是安装以下包:
 ```
gcc-4.1-base_4.1.2-25_amd64.deb
cpp-4.1_4.1.2-25_amd64.deb
linux-kbuild-2.6.26_2.6.26-3_amd64.deb
linux-headers-2.6.26-2-common_2.6.26-21lenny3_amd64.deb
linux-headers-2.6.26-2-amd64_2.6.26-21lenny3_amd64.deb
binutils_2.18.1~cvs20080103-7_amd64.deb
 ```
 全部装好后，重新make。正常人此时都应该make成功了。
 ```bash
Make-C/lib/modules/2.6.26-2-amd64/build SUBDIRS=/wp-content/local/src/network/netxtreme2-5.0.17/bnx2-1.9.20b/src modules
make[1]: Entering directory /wp-content/src/linux-headers-2.6.26-2-amd64'
CC [M] /wp-content/local/src/network/netxtreme2-5.0.17/bnx2-1.9.20b/src/bnx2.o
CC [M] /wp-content/local/src/network/netxtreme2-5.0.17/bnx2-1.9.20b/src/cnic.o
Building modules, stage 2.
MODPOST 2 modules
CC /wp-content/local/src/network/netxtreme2-5.0.17/bnx2-1.9.20b/src/bnx2.mod.o
LD [M] /wp-content/local/src/network/netxtreme2-5.0.17/bnx2-1.9.20b/src/bnx2.ko
CC /wp-content/local/src/network/netxtreme2-5.0.17/bnx2-1.9.20b/src/cnic.mod.o
LD [M] /wp-content/local/src/network/netxtreme2-5.0.17/bnx2-1.9.20b/src/cnic.ko
make[1]: Leaving directory /wp-content/src/linux-headers-2.6.26-2-amd64′
 ```
7. 挂在bnx2.ko模块
 Make成功后再src目录下应该有个bnx2.ko模块。
 ```bash
#rmmod bnx2.ko    把系统原来的模块删掉
#insmod bnx2.ko    加载我们刚刚编译好的模块。
#cp bnx2.ko /lib/modules/2.6.26-2-amd64/kernel/drivers/net/
 ```
8. 配置好网络地址和DNS后，随便ping个地址。Ok，可以ping同了，编译完成，reboot下再次进入系统，ifconfig又只剩下lo了。
9. 编辑开机脚本。
 ```bash
#vi eth0_start.sh

#!/bin/sh
cd /home/netxtreme2-6.2.23\netxtreme2-6.2.23\bnx2-2.0.23b\src
rmmod bnx2.ko
insmod bnx2.ko
/etc/init.d/networking restart
#cat eth0_start.sh >> /etc/init.d/rc.local
 ```
10. 再次reboot，开机进入系统，ifconfig搞定！


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/d8443074/  

