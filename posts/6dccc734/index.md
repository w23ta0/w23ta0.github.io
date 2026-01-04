# 在KVM虚拟机中安装Android-X86模拟器


## 准备Android-x86的iso镜像

可以在http://www.android-x86.org/download 处下载

```bash
[root@localhost ~]# cd /opt
[root@localhost ~]# wget https://nchc.dl.sourceforge.net/project/android-x86/Release%209.0/android-x86_64-9.0-r2.iso  --no-check-certificate
```

## 准备kvm虚拟化环境

### 检测是否支持KVM

KVM 是基于 x86 虚拟化扩展(Intel VT 或者 AMD-V) 技术的虚拟机软件，所以查看 CPU 是否支持 VT 技术，就可以判断是否支持KVM。有返回结果，如果结果中有vmx（Intel）或svm(AMD)字样，就说明CPU的支持的。

```bash
[root@localhost ~]# cat /proc/cpuinfo | egrep 'vmx|svm'

flags   : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx pdpe1gb rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology nonstop_tsc aperfmperf eagerfpu pni pclmulqdq dtes64 monitor ds_cpl vmx smx est tm2 ssse3 fma cx16 xtpr pdcm pcid dca sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand lahf_lm abm arat epb pln pts dtherm tpr_shadow vnmi flexpriority ept vpid fsgsbase tsc_adjust bmi1 avx2 smep bmi2 erms invpcid cqm xsaveopt cqm_llc cqm_occup_llc
```

关闭SELinux，将 /etc/sysconfig/selinux 中的 `SELinux=enforcing` 修改为 `SELinux=disabled`

```bash
[root@localhost ~]# vi /etc/sysconfig/selinux
```

### 安装 KVM 环境

通过 [yum](https://jaywcjlove.github.io/linux-command/c/yum.html) 安装 kvm 基础包和管理工具

kvm相关安装包及其作用:

- `qemu-kvm` 主要的KVM程序包
- `python-virtinst` 创建虚拟机所需要的命令行工具和程序库
- `virt-manager` GUI虚拟机管理工具
- `virt-top` 虚拟机统计命令
- `virt-viewer` GUI连接程序，连接到已配置好的虚拟机
- `libvirt` C语言工具包，提供libvirt服务
- `libvirt-client` 为虚拟客户机提供的C语言工具包
- `virt-install` 基于libvirt服务的虚拟机创建命令
- `bridge-utils` 创建和管理桥接设备的工具

```bash
# 安装 kvm 
# ------------------------
# yum -y install qemu-kvm python-virtinst libvirt libvirt-python virt-manager libguestfs-tools bridge-utils virt-install

[root@localhost ~]# yum -y install qemu-kvm libvirt virt-install bridge-utils 

# 重启宿主机，以便加载 kvm 模块
# ------------------------
[root@localhost ~]# reboot

# 查看KVM模块是否被正确加载
# ------------------------
[root@localhost ~]# lsmod | grep kvm

kvm_intel             162153  0
kvm                   525259  1 kvm_intel
```

开启kvm服务，并且设置其开机自动启动

```bash
[root@localhost ~]# systemctl start libvirtd
[root@localhost ~]# systemctl enable libvirtd
```

查看状态操作结果，如`Active: active (running)`，说明运行情况良好

```bash
[root@localhost ~]# systemctl status libvirtd
[root@localhost ~]# systemctl is-enabled libvirtd

● libvirtd.service - Virtualization daemon
   Loaded: loaded (/usr/lib/systemd/system/libvirtd.service; enabled; vendor preset: enabled)
   Active: active (running) since 二 2001-01-02 11:29:53 CST; 1h 41min ago
     Docs: man:libvirtd(8)
           http://libvirt.org
```

### 虚拟化嵌套（VM-in-VM）

安装X86模拟器需要CPU开启虚拟化功能，而KVM虚拟机已经是虚拟机了，虚拟机中的CPU默认情况下不带有虚拟化功能，这就需要nested kvm功能，即可以在虚拟机中再次进行虚拟化（VM-in-VM）。

使用嵌套虚拟化，我们首先要看下当前的系统中有没有配置支持嵌套，查看当前系统是否支持 nested

```bash
[root@localhost ~]# systool -m kvm_intel -v   | grep -i nested
nested              = "N"

#或者这样查看
[root@localhost ~]# cat /sys/module/kvm_intel/parameters/nested 
N
```

- `Y` : 结果为 `Y` 表示当前的操作系统已经支持了嵌套虚拟化
- `N` : 表示当前操作系统未配置嵌套虚拟化

如果结果为 N，可以通过以下方式开启

### 开启 nested 方法

编辑或创建文件 `/etc/modprobe.d/kvm-nested.conf`，文件包含以下内容：

```bash
options kvm_intel nested=1
options kvm-intel enable_shadow_vmcs=1   
options kvm-intel enable_apicv=1         
options kvm-intel ept=1   
```

重新加载内核模块

```bash
[root@localhost ~]# modprobe -r kvm_intel   #协助掉内核中的 kvm_intel 模块，注意要在所有虚拟机都关闭的情况下执行
[root@localhost ~]# modprobe -a kvm_intel   #重新加载该模块
```

## 创建kvm虚拟机

### 创建虚拟机磁盘

```bash
[root@localhost ~]# qemu-img create -f raw /opt/android.img 8G
```

### 创建虚拟机

```bash
[root@localhost ~]# virt-install  \
--virt-type=kvm \
--name android \
--cpu host-passthrough \
--vcpus=2 \
--memory=4096 \
--disk /opt/android-x86_64-9.0-r2.iso,device=cdrom,bus=ide \
--disk /opt/android.img,device=disk,bus=virtio \
--network network=default,model=virtio \
--video=qxl \
--graphics vnc,listen=0.0.0.0,port=5902 \
--noautoconsole \
--import \
--force
```

### 安装Android-x86系统

通过vnc连接宿主机5902端口

![image-20220510152936964](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510152936964.png)

看到如下如，表示android x86的镜像已经读取成功，接下来按照虚拟机创建流程来安装系统。

![image-20220510151814723](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510151814723.png)

选择Auto_Installation自动安装操作系统到空白磁盘

![image-20220510151835261](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510151835261.png)

扫描到磁盘/dev/vda，选择yes继续

![image-20220510151901738](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510151901738.png)



看到下图表示安装完毕，选择Run即可进去系统。

![image-20220510151941391](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510151941391.png)

可以看到系统已经正常启动，界面如下：

![image-20220510152007438](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510152007438.png)

开始初始化，选择START

![image-20220510152035577](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510152035577.png)

连接网络，KVM默认会给android生成名称为`VritWifi`的WI-FI

![image-20220510152208268](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510152208268.png)



配置日期时间

![image-20220510152246425](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510152246425.png)

配置google服务

![image-20220510152319199](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510152319199.png)

设置密码，这里选择`Not now`

![image-20220510152354717](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510152354717.png)

选择跳过

![image-20220510152440028](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510152440028.png)

选择桌面，我这里选择的是`Taskbar` 点击`ALWAYS`，进入桌面后会有个导航栏。

![image-20220510152513651](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510152513651.png)



![image-20220510152750282](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510152750282.png)



## Android 调试桥 (adb)

下载Android SDK Platform-Tools是安卓SDK的一个组件，包括安卓的平台界面工具（如adb、fastboot、systrace）

```bash
[root@localhost ~]# wget https://dl.google.com/android/repository/platform-tools-latest-linux.zip
[root@localhost ~]# unzip platform-tools-latest-linux.zip -C /opt

export PATH=$PATH:/opt/platform-tools/
```

查看虚拟机IP

```bash
[root@localhost ~]# virsh domifaddr  android
 Name       MAC address          Protocol     Address
-------------------------------------------------------------------------------
 vnet1      52:54:00:c7:a5:27    ipv4         192.168.122.9/24

```

连接设备

```bash
[root@localhost ~]# adb connect 192.168.122.9:5555
```

查看设备

```bash
[root@localhost ~]# adb devices
List of devices attached
192.168.122.9:5555      device
```

安装apk

```bash
[root@localhost ~]# adb install v2rayNG_1.1.14.apk
Performing Streamed Install
Success
```

启动应用

```bash
[root@localhost ~]# adb shell am start -n com.v2ray.ang/com.v2ray.ang.ui.MainActivity
Starting: Intent { cmp=com.v2ray.ang/.ui.MainActivity }
```

![image-20220510155036730](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220510155036730.png)

---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/6dccc734/  

