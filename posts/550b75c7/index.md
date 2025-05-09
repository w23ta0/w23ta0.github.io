# Cx_Freeze打包Python应用程序


cx_Freeze是一个打包Python应用的工具，通过cx_Freeze，可以制作Windows平台、MacOS平台、以及Linux平台的二进制可执行程序，使得Python应用能够在没有安装Python环境的机器上运行。

## cx_Freeze的安装

同很多Python的第三方库类似，cx_Freeze也可以通过如下命令安装：
```
pip install cx_Freeze
```
或者从官网下载安装包，解压后，切换目录至解压后的根目录，运行命令即可
```
python setup.py install
```
注意：在Windows平台上安装cx_Freeze时，也可以根据官网提供的链接，从SourceForge上下载二进制安装包直接安装，但一定要注意Python的版本问题，否则，打包的应用程序可能会因为Python.dll的版本问题而无法正常运行。

## cx_Freeze的使用(Windows平台)
典型的setup脚本的写法
```python
#! /usr/bin/env python
# -*- coding: utf-8 -*-

from cx_Freeze import setup, Executable

base = None
# base = 'Console'
# base = 'ConsoleKeepPath'
# base = 'Win32GUI'
# base = 'Win32Service'

executables = [
    Executable('main.py', base = base)
]

setup(name = 'main app',
      version = '1.0',
      description = 'main app',
      executables = executables
      )
```

在Windows平台上，`base`的可选值有：

- None 普通的Python程序。也可以不指定，在`Executable`中忽略`base`参数即可。
- Console Console应用程序（控制台应用程序）。
- ConsoleKeepPath 保持相对路径的Console应用程序。
- Win32GUI GUI应用程序。基于tkinter、wxPython、PyQt的Python GUI应用程序需要将`base`参数的值设为'Win32GUI'。
- Win32Service Windows服务程序。

## 构建命令选项
构建时，只需要运行如下命令即可：
```
python setup.py option
```
在Windows平台上，`option` 有以下几种可选值：

- build cx_Freeze的标准构建命令。
- build_exe 构建一系列的可执行程序。
- bdist_msi 构建Windows平台上的msi安装包。
注意：在Windows平台上，存放代码路径一定不要有中文，否则，在执行python setup.py bdist_msi时可能会遇到FCI Error。

## 自定义图标
通过 Executable 的 icon 参数可以指定应用程序的图标，默认为’Tcl/Tk’的图标。

如下例：
```python
executables = [
    Executable('main.py', base = base, icon = 'main.ico')
]
```

## 程序资源文件

对于应用程序用到的图片以及其他素材, 特别是GUI程序中用到图片等资源文件，可以在成功构建可执行程序后手动拷贝到可执行程序的目录，保持相对路径不变即可。也可以通过修改构建文件中的`include_files`参数，直接打包。如下例：
```python
build_exe_options = {
    'include_files' = ['...', '...'],
    ...
}

setup(
    ...
    options = {'build_exe': build_exe_options}
```

## 复杂应用程序的打包
通过`Executable`的`includes`, `excludes`, 以及 `packages` 三个选项可以有效地控制应用程序包含和排除的模块以及包依赖关系。

也可以通过设置setup函数的options选项来解决依赖问题。如下例：
```python
build_exe_options = {
    'packages': ['os', 'sys'],
    'includes': ['tkinter'],
    'excludes': ['django'],
    ...
}

setup(
    ...
    options = {'build_exe': build_exe_options}
)
```

## 其他平台
在其他平台上，有如下构建选项可以构建对应平台的可执行文件：

- bdist_rpm 构建rpm安装包。
- bdist_mac 构建Mac OS系统的程序安装包。
- bdist_dmg 构建Mac OS系统的程序安装包。

## 说明
本文所给代码均在Python34 for Windows, cx_Freeze release 4.3.4 上运行通过。

## 参考
[cx_Freeze Documentation](http://cx-freeze.readthedocs.io/en/latest/index.html)


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/550b75c7/  

