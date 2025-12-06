# 解决Office 2010安装错误:1402



![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/19779461_0800.png)

先卸载原有office，再安装office2010.还不行使用下面方法是一下：

1. 使用组合键 Win+R 打开“运行”对话框，输入 regedit 并回车（可能需要管理员权限）
2. 找到这个键值
```
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Installer\UserData
```
3. 右击“UserData” 选择“权限(P)…”
4. 点击“高级(V)”按钮
5. 选定“Administrators……”，勾选“替换子容器和对象的所有者(R)”，点击“应用(A)”，将“当前所有者(C)：”更改为“Administrators……”
6. “权限项目(T)：”选定“Administrators……”，勾选“使用可从此对象继承的权限替换所有子对象权限(P)”，点击“确定”按钮

---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/d14dfb/  

