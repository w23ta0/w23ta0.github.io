# 创建OpenStack兼容的qcow2格式镜像



## 前置条件

- 准备一台主机。用于运行KVM虚拟机和制作镜像

- 准备一张系统镜像ISO文件

- 确保您的系统具有硬件虚拟化扩展

  ```bash
  #基于Intel的主机，请使用以下命令验证CPU虚拟化扩展[vmx]是否可用。
  [user@host]# grep -e 'vmx' /proc/cpuinfo
  
  #基于AMD的主机，请验证CPU虚拟化扩展[svm]是否可用。
  [user@host]# grep -e 'svm' /proc/cpuinfo
  
  #验证内核是否加载kvm模块
  [user@host]#  lsmod | grep kvm
  kvm_intel             170086  0 
  kvm                   566340  1 kvm_intel
  irqbypass              13503  1 kvm
  ```

- 关闭SELinux，将 `/etc/sysconfig/selinux` 中的 `SELinux=enforcing` 修改为 `SELinux=disabled`

## 两种方式安装KVM虚拟化

### 通过手动方式安装

安装KVM虚拟化程序

- **qemu-kvm**：提供了user-level KVM仿真器，以及宿主机和虚拟机之间的通信。

- **qemu-img**：虚拟机磁盘管理。

- **libvirt**：提供服务器和主机端的库，用于与管理程序和主机系统进行交互，以及处理库调用，管理虚拟机和控制libvirtd守护程序。

    ```bash
  [user@host]# yum install qemu-kvm libvirt
  [user@host]# systemctl start libvirtd && systemctl enable libvirtd
  ```

以下是附加的虚拟化管理程序包。

- **virt-install**：提供了`virt-install`用于从命令行创建虚拟机的命令。

- **libvirt-python**：该软件包包含一个模块，该模块允许以Python编程语言编写的应用程序使用libvirt API提供的接口。

- **virt-manager**：提供GUI工具来管理虚拟机，它使用libvirt-client库API进行管理。

- **libvirt-client**：提供CL工具来管理虚拟机，该工具称为`virsh`

  ```bash
[user@host]# yum install virt-install libvirt-python virt-manager virt-install libvirt-client
  ```

对于RHEL / CentOS7用户，还需要安装其他软件`Virtualization Client`、`Virtualization Platform`和`Virtualization Tools`。

```bash
[user@host]# yum groupinstall virtualization-client virtualization-platform virtualization-tools
```

### 通过软件包组安装

| 包组名称                  | 描述                                 | 强制安装                                                     | 可选包                                                       |
| :------------------------ | :----------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `Virtualization Host`     | 最小的虚拟化主机安装                 | libvirt，qemu-kvm，qemu-img                                  | qemu-kvm-tools                                               |
| `Virtualization Client`   | 用于安装和管理虚拟化实例的客户端     | gnome-boxes，virt-install，virt-manager，virt-viewer，qemu-img | virt-top，libguestfs-tools，libguestfs-tools-c               |
| `Virtualization Platform` | 提供用于访问和控制虚拟机和容器的界面 | libvirt, libvirt-client, virt-who, qemu-img                  | fence-virtd-libvirt，fence-virtd-multicast，fence-virtd-serial，libvirt-cim，libvirt-java，libvirt-snmp，perl-Sys-Virt |
| `Virtualization Tools`    | 离线虚拟映像管理工具                 | libguestfs，qemu-img                                         | libguestfs-java，libguestfs-tools，libguestfs-tools-c        |

命令如下：

```bash
[user@host]# yum groupinstall "Virtualization Host"
[user@host]# yum groupinstall "Virtualization Client"
[user@host]# yum groupinstall "Virtualization Platform"
[user@host]# yum groupinstall "Virtualization Tools"
```

## 开始制作镜像

### 创建虚拟机

使用 `qemu-img` 创建8G大小的虚拟磁盘

```bash
[user@host]# qemu-img create -f qcow2 /tmp/centos7.qcow2 8G
```

使用 `virt-install` 创建并启动虚拟机

```bash
[user@host]# virt-install --virt-type kvm --name centos7 --ram 2048 \
--cdrom /tmp/CentOS-7-x86_64-Minimal-2003.iso \
--disk /tmp/centos7.qcow2,format=qcow2,bus=virtio \
--network network=default --graphics vnc,listen=0.0.0.0 \
--noautoconsole --os-type=linux 
```

启动完成后，使用vnc client连接或者使用virt-manager、virt-viewer连接。

```bash
[user@host]# virsh list --all
[user@host]# virt-viewer centos7
```

### 安装操作系统

- 进入虚拟机控制台可以看到CentOS的启动菜单

- 选择Install CentOS 7，敲Tab键出现字时，接着输入 net.ifnames=0 biosdevname=0 ，然后回车

- 选择语言和键盘选项

- 软件选择Minimal Install

- 需要选择手动配置分区。只需要一个根分区即可，不需要swap分区，存储驱动选择Virtio Block Device

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20201109182452.png)

安装完成后，重启实例并以 root 用户身份登录。

修改 `/etc/sysconfig/network-scripts/ifcfg-eth0` 文件，内容如下：

```bash
TYPE=Ethernet
DEVICE=eth0
ONBOOT=yes
BOOTPROTO=dhcp
NM_CONTROLLED=no
```

重启网卡

```bash
# systemctl restart network
```

查看虚拟机自动获取的IP地址，通过宿主机ssh连接进入虚拟机。

### 配置OS

安装常用的软件

```bash
# yum install -y mlocate lrzsz tree vim nc nmap bash-completion bash-completion-extras cowsay sl htop iotop iftop lsof net-tools sysstat unzip bc psmisc ntpdate wc telnet-server bind-utils
```

关闭防火墙和SELinux

```bash
# setenforce 0
# sed -i 's#enforcing#disabled#' /etc/sysconfig/selinux
# systemctl stop firewalld && systemctl disable firewalld
```

sshd优化加速

```bash
# vim /etc/ssh/sshd_config
UseDNS no
GSSAPIAuthentication no
```

- **UseDNS** 会对客户端进行DNS反向解析，然后在比对正向解析的结果查看是否一致。

- **GSSAPIAuthentication**大多数情况下使用密码验证或者秘钥验证所以关闭GSSAPI验证即可

安装 `cloud-init` 软件包，并设置开机启动

```bash
# yum install -y cloud-utils-growpart cloud-init
# systemctl enable cloud-init
```

默认情况下，cloud-init 在虚拟机启动时，会关闭ssh 的密码认证方式，使用key 方式连接。修改cloud-init 的配置文件，使其打开ssh 密码认证方式。方法如下：

```bash
# vi /etc/cloud/cloud.cfg
  
  users:
   - default
     
  disable_root: 1
  ssh_pwauth:   1 // 将默认的0,改为1。
```

为了支持软操作，虚拟机需要安装`acpid`服务，并设置开机自启动

```bash
# yum install -y acpid
# systemctl enable acpid
```

为了`nova console-log`能获取虚拟机启动时的日志，修改配置文件`/etc/default/grub`，删掉`GRUB_CMDLINE_LINUX` 一行中 `rhgb quiet`,添加 `console=tty0 console=ttyS0,115200n8` , 修改后的结果如下：

```bash
GRUB_CMDLINE_LINUX="crashkernel=auto console=tty0 console=ttyS0,115200n8"
```

运行以下命令，保存修改

```bash
# grub2-mkconfig -o /boot/grub2/grub.cfg
```

安装自定义的软件，如nginx

```bash
yum install -y nginx
systemctl enable --now nginx
```

关闭实例

```bash
# poweroff
```

### 制作完成

使用 `virt-sysprep` 命令重置并清理镜像，从而可以避免在创建实例时出现问题

```bash
[user@host]# virt-sysprep --enable bash-history,ssh-userdir -d centos7
```

使用 `virt-sparsify` 这个命令会把磁盘镜像中的所有空闲空间释放，减少镜像的大小

```bash
[user@host]# virt-sparsify --compress /tmp/centos7.qcow2 /tmp/centos7-cloud.qcow2
```



---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/e4a4f171/  

