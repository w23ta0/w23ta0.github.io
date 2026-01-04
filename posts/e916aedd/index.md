# Linux基础：文件系统

我们知道不同的操作系统所使用的文件系统是不一样的。举例来说，Windows 98 以前所使用的是文件系统是 FAT，Windows 2000 以后的版本有所谓的 NTFS 文件系统。至于 Linux 的正规文件系统则为 Ext2（Linux second extended file system，Ext2fs）。之后又出现了改进版的 Ext3 和 Ext4 ，总体上变化不大。



## 文件系统的对比
我们经常听说 Windows 需要磁盘碎片整理，而 Linux 却不需要。这是为什么呢？

我们可以先看看 Ext2 文件系统的数据访问方式，如下图所示。
![图片描述](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/81b78497jw1eic3rqwb6mj20qj0dzwfu.jpg)


假设一个文件的属性和权限信息是存放在 3 号的 inode 上，而文件的实际数据是存放在 1、4、6、11 这四个 block 中，那么当操作系统要访问该文件时，就能据此来排列磁盘的阅读顺序，可以扫描一次就将 4 个 block 内容读出来。这种访问方式称为索引式文件系统（indexed allocation）。而且 ext 在每两个文件之间都留有相当巨大的空闲空间。当文件被修改、体积增加时，它们通常有足够的空间来扩展。因此在一定程度上保证了 block 的访问范围不会跨度很大，减小了磁头的移动距离。

那 Windows 的文件系统是怎样的呢？ 我们以 FAT 为例说明。

![图片描述](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/81b78497jw1eic3rr7syaj20nv0azwf8.jpg)

在往 FAT 文件系统中存入一个文件时，系统会尽量存放在靠近磁盘开始的地方。当你存入第二个文件时，它会紧挨着第一个文件。当进行频繁的删除修改后，block 就会分散的特别厉害。FAT 文件系统没有 inode 的存在，所以不能一下子将文件的所有 block 在一开始就读取出来。每个 block 号码都记录在前一个 block 当中，形成一个 block 链。当我们需要读取文件的时候，就必须一个一个地将 block 读出，例如上图的读出顺序为 1、6、3、12 。这就会导致磁头无法在磁盘转一圈就获得所有数据，有时候需要来回转好几圈才能读取到这个文件，导致文件读取性能极差。这就是 Windows 经常需要碎片整理的原因——使离散的数据汇合在一起

而 NTFS 文件系统虽然智能了一点，在文件周围分配了一些“缓冲”的空间，但经过一段时间的使用后， NTFS 文件系统还是会形成碎片。由于 ext 是索引式文件系统，所以基本上不太需要经常进行磁盘碎片整理。

## ext2/ext3 文件系统
我们知道文件数据除了文件的实际内容外，通常还包括非常多的属性，例如 Linux 中的文件权限（rwx）和文件属性（拥有者、用户组、时间、大小等）。ext 文件系统将这两部分存放在不同的块，权限和属性存放在 inode 中，至于文件的实际数据则存放在 block 块中。另外还有一个超级块（super block）会记录整个文件系统的整体系统。每个 inode 和 block 都有自己的编号。

ext 文件系统在格式化的时候基本上是区分为多个块组（block group）的，每个块组都有独立的 inode/block/super block 系统。其整体展示图如下所示：

![图片描述](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/81b78497jw1eic3rpycyxj20l60b1myh.jpg)

其中各个块的含义如下：

- super block：记录此文件系统的整体系统，包括 inode 和 block 的总量、使用量、剩余量，以及文件系统类型等。
- file system description：文件系统描述说明。描述每个 block group 的开始与结束的 block 号码。
- block bitmap：块对照表。用来快速寻找可用的 block 块。
- inode bitmap：inode对照表。用来快速寻找可用的 inode 块。
- inode table：存放 inode 块的地方。它们是文件系统的关键。记录了文件的属性，一个文件占用一个 inode，同时包含多个指针，指向了属于该文件的各个  data block 块
- data block：真正存放数据的地方。文件太大会占用多个 block 。

##总结
本节主要讲述了 ext2/ext3 与其他文件系统的区别，以及不用磁盘碎片整理的原理。然后对 ext 文件系统的体系结构进行了剖析，说明了各个数据块的意义。重点是了解 inode 和 block 在 Linux 中所扮演的不同角色以及重要意义。

Linux 是一个文件王国，一切都以文件的形式存在。了解Linux的文件系统，是深入了解操作系Linux原理的重要一步。

## 参考资料
[鸟哥的Linux私房菜.基础学习篇](http://book.douban.com/subject/4889838/)


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/e916aedd/  

