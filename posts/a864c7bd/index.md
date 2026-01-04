# Ubuntu下全命令行部署Android模拟器


## 平台代号、版本、API 级别和 NDK 版本

下表列出了代号、对应的版本号以及关联的 API 级别。

| 代号               | 版本          | API 级别/NDK 版本  |
| :----------------- | :------------ | :----------------- |
| Android12L         | 12.1          | API 级别 32        |
| Android12          | 12            | API 级别 31        |
| Android11          | 11            | API 级别 30        |
| Android10          | 10            | API 级别 29        |
| Pie                | 9             | API 级别 28        |
| Oreo               | 8.1.0         | API 级别 27        |
| Oreo               | 8.0.0         | API 级别 26        |
| Nougat             | 7.1           | API 级别 25        |
| Nougat             | 7.0           | API 级别 24        |
| Marshmallow        | 6.0           | API 级别 23        |
| Lollipop           | 5.1           | API 级别 22        |
| Lollipop           | 5.0           | API 级别 21        |
| KitKat             | 4.4 - 4.4.4   | API 级别 19        |
| Jelly Bean         | 4.3.x         | API 级别 18        |
| Jelly Bean         | 4.2.x         | API 级别 17        |
| Jelly Bean         | 4.1.x         | API 级别 16        |
| Ice Cream Sandwich | 4.0.3 - 4.0.4 | API 级别 15，NDK 8 |
| Ice Cream Sandwich | 4.0.1 - 4.0.2 | API 级别 14，NDK 7 |
| Honeycomb          | 3.2.x         | API 级别 13        |
| Honeycomb          | 3.1           | API 级别 12，NDK 6 |
| Honeycomb          | 3.0           | API 级别 11        |
| Gingerbread        | 2.3.3 - 2.3.7 | API 级别 10        |
| Gingerbread        | 2.3 - 2.3.2   | API 级别 9，NDK 5  |
| Froyo              | 2.2.x         | API 级别 8，NDK 4  |
| Eclair             | 2.1           | API 级别 7，NDK 3  |
| Eclair             | 2.0.1         | API 级别 6         |
| Eclair             | 2.0           | API 级别 5         |
| Donut              | 1.6           | API 级别 4，NDK 2  |
| Cupcake            | 1.5           | API 级别 3，NDK 1  |
| （无代号）         | 1.1           | API 级别 2         |
| （无代号）         | 1.0           | API 级别 1         |



## 安装JDK环境

```bash
root@w23ta0-virtual-machine# wget https://mirrors.huaweicloud.com/java/jdk/8u202-b08/jdk-8u202-linux-x64.tar.gz
root@w23ta0-virtual-machine# tar zxvf jdk-8u202-linux-x64.tar.gz -C /opt

export JAVA_HOME="/opt/jdk1.8.0_202"
export PATH="$PATH:$JAVA_HOME/bin"
export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
```

## 安装 Android 模拟器

### Command line tools

```bash
root@w23ta0-virtual-machine# wget https://dl.google.com/android/repository/commandlinetools-linux-8092744_latest.zip

root@w23ta0-virtual-machine# unzip commandlinetools-linux-8092744_latest.zip -d /opt/

root@w23ta0-virtual-machine# cd /opt/cmdline-tools/bin
```

### sdkmanager

`sdkmanager` 是一个命令行工具，您可以用它来查看、安装、更新和卸载 Android SDK 的软件包。

初始化目录

```bash
root@w23ta0-virtual-machine# ./sdkmanager --sdk_root=opt/android-sdk --install
```

接受所有许可证

```bash
root@w23ta0-virtual-machine# ./sdkmanager --sdk_root=opt/android-sdk --licenses
```

安装的基本工具

```bash
root@w23ta0-virtual-machine# ./sdkmanager --sdk_root=opt/android-sdk --install  "platforms;android-29" "build-tools;29.0.0" "platform-tools"  "emulator" "cmdline-tools;latest" "system-images;android-29;default;x86"  
```

### avdmanager

`avdmanager`是一个命令行工具，可以用于从命令行创建和管理 Android 虚拟设备 (AVD)。借助 AVD，您可以定义要在 Android 模拟器中模拟的 Android 手机、Wear OS 手表或 Android TV 设备的特性。

添加Android SDK环境变量

```bash
export ANDROID_SDK_ROOT=/opt/android-sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools/
export PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/
export PATH=$PATH:$ANDROID_SDK_ROOT/build-tools/29.0.0/
```

创建新的 AVD

```bash
root@w23ta0-virtual-machine# echo "no" | avdmanager --verbose create avd --force --name "android-29" --package "system-images;android-29;default;x86" 
```

列出现有的 Android 虚拟设备

```bash
root@w23ta0-virtual-machine# avdmanager list avd
Available Android Virtual Devices:
    Name: android-29
    Path: /root/.android/avd/android-29.avd
  Target: Default Android System Image
          Based on: Android 10.0 (Q) Tag/ABI: default/x86
  Sdcard: 512 MB

```

## 从命令行启动模拟器

查看 AVD 名称的列表

```bash
root@w23ta0-virtual-machine# emulator -list-avds
android-29
```

启动模拟器

```bash
root@w23ta0-virtual-machine# emulator @android-29 -no-boot-anim -netdelay none -accel on -no-snapshot -wipe-data &
```

![image-20220506154829841](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220506154829841.png)

## Android 调试桥 (adb)

Android 调试桥 (adb) 是一种功能多样的命令行工具，可让您与设备进行通信。adb 命令可用于执行各种设备操作（例如安装和调试应用），并提供对 Unix shell（可用来在设备上运行各种命令）的访问权限。

使用 `devices` 命令获取目标设备的序列号

```bash
root@w23ta0-virtual-machine# adb devices
List of devices attached
emulator-5554   device
```

使用 adb 的 `install` 命令在模拟器或连接的设备上安装 APK

```bash
root@w23ta0-virtual-machine# adb install v2rayNG_1.1.14.apk
Performing Streamed Install
Success
```

获取应用的软件包名称

```bash
root@w23ta0-virtual-machine# adb shell pm list packages |grep v2ray
package:com.v2ray.ang
```

获取到APP的详细信息

```bash
root@w23ta0-virtual-machine# adb shell dumpsys package com.v2ray.ang 
Activity Resolver Table:
  Full MIME Types:
      text/plain:
        9317857 com.v2ray.ang/.ui.MainActivity filter eb50f9f
          Action: "android.intent.action.SEND"
          Category: "android.intent.category.DEFAULT"
          Type: "text/plain"
```

启动应用程序

```bash
root@w23ta0-virtual-machine# adb shell am start -n com.v2ray.ang/com.v2ray.ang.ui.MainActivity
Starting: Intent { cmp=com.v2ray.ang/.ui.MainActivity }
```

![image-20220506155807586](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/image-20220506155807586.png)

关闭指定包名的应用程序

```bash
root@w23ta0-virtual-machine# adb shell am  force-stop  com.v2ray.ang
```



---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/a864c7bd/  

