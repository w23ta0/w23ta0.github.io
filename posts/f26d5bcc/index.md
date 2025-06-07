# History命令显示时间记录


查了半天系统环境变量`HISTTIMEFORMAT`丝毫不见踪迹 原来在`bash man`中才有收录
```bash
#man bash
 HISTTIMEFORMAT
 If this variable is set and not null, its value is used as a format string for strftime(3) to print the time stamp associated with each history entry displayed by the history builtin. If this variable is set, time stamps are written to the history file so they may be preserved across shell sessions.

如果这个变量被设置，且不为空,使用它的值作为格式字符串strftime（3）打印时间戳与历史命令内建显示的每个条目相关联的历史.如果这个变量被设置，时间戳会被写入历史文件，这样的话他们可能会保留在shell会话。
```
查看HISTTIMEFORMAT具体参数

```bash
#man strftime
```

取了两条记录

```bash
%F Equivalent to %Y-%m-%d (the ISO 8601 date format). (C99)
%T The time in 24-hour notation (%H:%M:%S). (SU)

[root@jerome-1 conf]# HISTTIMEFORMAT="%F %T"
```
常用到的一些显示方式

下面这条相当于上面的方式
```bash
[root@jerome-1 conf]# HISTTIMEFORMAT="%Y-%m-%d %H:%M:%S"
[root@jerome-1 conf]# history | tail
1091 2011-03-17 12:57:57 history
```
可将以下两条加入到/etc/profile文件当中
```bash
export HISTTIMEFORMAT="%F %T"
```


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/f26d5bcc/  

