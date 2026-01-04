# 核心文件initrd.img、vmlinux 和vmlinuz


initrd.img是一个小的映象，包含一个最小的linux系统。通常的步骤是先启动内核，然后内核挂载initrd.img，并执行里面的脚本来进一步挂载各种各样的模块，然后发现真正的root分区，挂载并执行/sbin/init…

initrd.img当然是可选的了，如果没有initrd.img,内核就试图直接挂载root分区。

说initrd.img文件还会提到另外一个名角—vmlinuz。vmlinuz是可引导的、压缩的内核。“vm”代表 “Virtual Memory”。Linux 支持虚拟内存，不像老的操作系统比如DOS有640KB内存的限制。Linux能够使用硬盘空间作为虚拟内存，因此得名“vm”。另外：vmlinux是未压缩的内核，vmlinuz是vmlinux的压缩文件。

为什么要initrd.img
系统内核vmlinuz被加载到内存后开始提供底层支持，在内核的支持下各种模块，服务等被加载运行。这样当然是大家最容易接受的方式，曾经的linux就是这样的运行的。假设你的硬盘是scsi 接口而你的内核又不支持这种接口时，你的内核就没有办法访问硬盘，当然也没法加载硬盘上的文件系统，怎么办？把内核加入scsi驱动源码然后重新编译出一个新的内核文件替换原来vmlinuz。

需要改变标准内核默认提供支持的例子还有很多，如果每次都需要编译内核就太麻烦了。所以后来的linux就提供了一个灵活的方法来解决这些问题—initrd.img。initrd.img文件就是个ram disk的映像文件。ramdisk是用一部分内存模拟成磁盘，让操作系统访问。ram disk是标准内核文件认识的设备(/dev/ram0)文件系统也是标准内核认识的文件系统。内核加载这个ram disk作为根文件系统并开始执行其中的”某个文件”（2.6内核是 init文件）来加载各种模块，服务等。经过一些配置和运行后，就可以去物理磁盘加载真正的root分区了，然后又是一些配置等，最后启动成功。也就是你只需要定制适合自己的 initrd.img 文件就可以了。这要比重编内核简单多了，省时省事低风险。


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/9390f1b0/  

