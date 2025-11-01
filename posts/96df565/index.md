# Linux Initrd.img 解压分析


vmlinuz 是一个为内核映像， vmlinuz里面有gzip的一段代码。

initrd.img 是作为避免在vmlinuz里编译所有的驱动模块，所以使用了一个中间层的技术

initrd有两种格式，一种是较早的2.4.x中的`image-initrd`格式，里面以`/linuxrc`为主导。另一种是`cpio-initrd`

看了网上的资料，想学着看看 initrd里是什么个样子
```bash
cp /boot/initrd.imgxxx initrd.img.gz
gunzip initrd.img.gz # 这个如果不加后缀gz 就得使用 gunzip -S .img xx.img
mkdir initrd
mv initrd.img.gz initrd
cd initrd
cpio -ivmd < initrd.img #用cpio格式打的包，释放出来，ok，就可以看到了。
```
编译内核：
```bash
centos 6.2：
make mrproper // 新内核不用，检查依赖对不对
make menuconfig //配置选项
make modules_install //安装modules /lib/modules 对应的文件夹
make install // 将 vmlinuz 和 initrd.img 放到 /boot 下，并填写对应的 /boot/grub/menu.lst 自己可以看看
```


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/96df565/  

