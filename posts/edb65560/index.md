# LoadRunner 11 安装及破解

## 前提条件

内存：2G，硬盘空闲空间10G，安装完成后实际只占不到2G
支持winXP  SP3;32位与64位win7浏览器支持IE6-8,IE9,firefox3
若以前安装过LoadRunner,则将其卸载。

## 下载介质

下载地址是，这个是我自己搜集的，也可以安装其他版本：

LoadRunner11

链接：http://pan.baidu.com/s/1skGkzb3  密码：88uq

LoadRunner12

链接: https://pan.baidu.com/s/1qXL4tFu  密码: cgrt

备注：压缩后大小有3G多，解压之后4G左右，iso文件。由于文件太大，需要放在NFS的盘中, FAT32最大只支持4GB的文件。

## 安装步骤

### 启动安装程序
 运行setup.exe，点击“LoadRunner完整安装程序”
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524701658222rb9pegoa.png?imageslim)

### 安装组件
 安装LoadRunner11时，安装程序会自动检测系统所安装的组件情况，LoadRunner运行支持的组件，一般比较重要的是Visual C++ 2005 SP1和.Net Framework 3.5。因之前安装了一组件在计算机中，下图中只显示了2个必要的组件(lr安装包中含有这些组件)，如果是全新的系统一般会是5个，直接点击“下一步”，如下图：
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524701672644by0vw0ur.png?imageslim)

### 安装欢迎界面
 组件安装完成后进入LoadRunner主程序的安装界面，直接“下一步”：
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524701680842jsn3ov3z.png?imageslim)

### 许可协议
 选择“我同意”，然后点击“下一步”：
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524701690422jsalgiah.png?imageslim)

### 个人信息
 输入个人相关信息，选择“下一步”：
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/15247016985016s15xzdh.png?imageslim)

### 安装路径
 选择LoadRunner安装路径，注意安装路径不要有中文，选择“下一步”：
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/15247017049872s2tz1w1.png?imageslim)

### 安装及完成
 ![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524701712000k0pq4np4.png?imageslim)
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524701719071o3labi2s.png?imageslim)
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524701726376iridw7id.png?imageslim)

### 安装后
 安装完成后，系统会自动打开“LoadRunner License Information”窗口：
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524701735492412e3jm0.png?imageslim)
 并提示你的License只有十天的使用期。
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524701743580w7npzq3n.png?imageslim)
 此时，可以启动LoadRunner了。

## 破解方法
1. 把loadrunner相关程序全部退出；
2.  解压文件:   lr破解.zip
 用LR8.0中的mlr5lprg.dll、lm70.dll覆盖LR9.5安装目录下“bin”文件夹中的对应文件；一般是C:\Program Files\Mercury\LoadRunner\bin.
3.  清理注册表（不清理的话，在添加licence时，会提示“License security violation……”）
 可以下载注册表清理器lr_Del_license（LR破解包内有）或者手动修改注册表，删除下面内容：
 ```
[HKEY_LOCAL_MACHINE\SOFTWARE\Mercury Interactive\LoadRunner\License2]
[HKEY_LOCAL_MACHINE\SOFTWARE\Mercury Interactive\LoadRunner\License2\History]@=“AIBGEBFW-JVED-ZKEKEKEKEKEBDNQAF-KBRDN”=””
[HKEY_LOCAL_MACHINE\SOFTWARE\Mercury Interactive\LoadRunner\License2\PermanentLicense]@=”AIBGEBFW-JVED-ZKEKEKEKEKEBDNQAF-KBRDN””last”=”AIBGEBFW-JVED-ZKEKEKEKEKEBDNQAF-KBRDN”
[HKEY_LOCAL_MACHINE\SOFTWARE\Mercury Interactive\LoadRunner\License2\TemporaryLicense]@=”AEBGEBFS-AKEKEKEKE-KAUCA”
[HKEY_LOCAL_MACHINE\SOFTWARE\Classes\Interface\{87B3ADD4-21EB-11d5-93EF-00105AA0FD2D}]@=”IControl”
 ```
4.  添加下面的licence，即可使用：
 ```
global-100: AEAMAUIK-YAFEKEKJJKEEA-BCJGI
web-10000: AEABEXFR-YTIEKEKJJMFKEKEKWBRAUNQJU-KBYGB
golba-1000：AEACFSJI-YASEKJJKEAHJD-BCLBR
 ```
 提供一个超级license 最高支持6.5w个并发：AEACFSJI-YJKJKJJKEJIJD-BCLBR
 (备注：破解同8.1、9.5一样)

## 安装过程中遇到的问题
1. 安装过程中，提示：少了Microsoft Visual c++2005 sp1运行时组件，安装时会提示命令行选项语法错误，键入“命令/?”可获取帮肋信息，无法正常安装；
 解决方法：
 - 进入loadrunner-11\Additional Components\IDE Add-Ins\MS Visual Studio .NET
 - 安装LRVS2005IDEAddInSetup.exe
 - 再安装loadrunner
2. 注意开启 ，在开始菜单下面的HP LoadRunner\Advanced Settings\LoadRunner Agent Process.如果不打开此服务会影响GUI Vusers、ASPGUI脚本回放。
3. 安装时提示”the link file …. may be corrupted or has illegated link string”的错误信息或者提示Command Line Option Syntax error.Type Command/?
 - 原因：LoadRunner的安装文件夹包含中文，LoadRunner的安装脚本无法识别路径，最终导致不断有这样的错误提示。
 - 解决方法：把安装文件的目录名改为不要有中文，安装目录最好使用默认。
4. 管理员权限安装
5. LoadRunner录制脚本经常遇到不能打开浏览器的情况，(当一台主机上安装多个浏览器时，)可以用下面的方法来解决。
 - 解决办法：启动浏览器，打开Internet选项对话框，切换到高级标签，去掉“启用第三方浏览器扩展(需要重启动)”的勾选，然后再次运行VuGen即可;
 - 提示：通常安装Firefox等浏览器后，都会勾选上面得选项，导致不能正常录制。因此建议运行LoadRunner得主机上保持一个干净的测试环境
6. 录制时关闭防火墙，关闭360相关东西。
7. loadrunner在打开场景时，提示“试图执行系统不支持的操作”
  - 原因：在安装时，360杀毒软件的防御提示全部设为阻止了。
  - 解决方法：卸载LoadRunner，然后手动删除安装文件和注册表里面的信息，重启后安装，杀毒软件的防御提示全部设为允许，就OK了
8. 重装系统后安装LR,提示setup has determined that a previous installation has not completed，重启无效 ;<br>
 解决方法：
  1. 进入注册表：运行/regedit;
  2. 进入路径：KEY_LOCAL_MACHINE/SYSTEM/Contrl/SessionManager;
  3. 在Session Manager右侧的主试图中，双击PendingRenameOperations，在弹出的窗口中，将临时文件删除。
  4. 重新运行LR安装文件即可。
9. 当安装提示"此计算机缺少 vc2005_sp1_with_atl_fix_redist"，怎么办？
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524702415304mclenzo9.png?imageslim)
 - 解决方法：运行安装程序自带的vcredist_x86.exe（默认位置在 "安装包\lrunner\Chs\prerequisites\vc2005_sp1_redist"），让电脑先装基础环境后装LoadRunner 11即可。


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/edb65560/  

