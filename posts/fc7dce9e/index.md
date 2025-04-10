# Linux Expect自动登录ssh,ftp


expect是一种能够按照脚本内容里面设定的方式与交互式程序进行”会话”的程序。根据脚本内容，Expect可以知道程序会提示或反馈什么内容以及 什么是正确的应答。它是一种可以提供”分支和嵌套结构”来引导程序流程的解释型脚本语言。

shell功能很强大,但是不能实现有交互功能的多机器之前的操作,例如ssh和ftp.而expect可以帮助我们来实现.

## 安装expect
	yum install expect
其实expect根bash形势上差不多的.

## 实例
```bash
#!/wp-content/bin/expect -f
set ip [lindex $argv 0 ]      //接收第一个参数,并设置IP
set password [lindex $argv 1 ]    //接收第二个参数,并设置密码
set timeout 10                    //设置超时时间
spawn ssh root@$ip        //发送ssh请滶
expect {                  //返回信息匹配
&#34; *yes/no &#34; { send &#34; yes\r &#34;; exp_continue}   //第一次ssh连接会提示yes/no,继续
&#34; *password: &#34; { send &#34; $password\r &#34; }       //出现密码提示,发送密码
}
interact           //交互模式,用户会停留在远程服务器上面.
```
运行结果如下:
```bash
root@ubuntu:/home/w23ta0# ./test.exp 192.168.1.130 admin
spawn ssh root@192.168.1.130
Last login: Fri Sep  7 10:47:43 2012 from 192.168.1.142
[root@linux ~]#
```
这个例子有统一的接口,根据IP和密码可以连接到不同的机器.
如果你嫌输入IP和密码麻烦,看下面的例子
```bash
#!/wp-content/bin/expect -f
 set  ip 192.168.1.130
 set  password admin
 set  timeout 10
 spawn ssh root@$ip
 expect {
 &#34; *yes/no &#34; { send &#34; yes\r &#34;; exp_continue}
 &#34; *password: &#34; { send &#34; $password\r &#34; }
 }
 interact
```
运行结果如下:
```bash
root@ubuntu:/home/w23ta0# ./web.exp
spawn ssh root@192.168.1.130
Last login: Fri Sep  7 12:59:02 2012 from 192.168.1.142
[root@linux ~]#
```
**ssh远程登录到服务器,并且执行命令,执行完后并退出**
```bash
#!/wp-content/bin/expect -f
 set  ip 192.168.1.130
 set  password admin
 set  timeout 10
 spawn ssh root@$ip
 expect {
 &#34; *yes/no &#34; { send &#34; yes\r &#34;; exp_continue}
 &#34; *password: &#34; { send &#34; $password\r &#34; }
 }
 expect &#34; #* &#34;
 send &#34; pwd\r &#34;
 send  &#34; exit\r &#34;
 expect eof
```
运行结果如下:
```bash
root@ubuntu:/home/w23ta0# ./test3.exp
spawn ssh root@192.168.1.130
root@192.168.1.130&#39;s password:
Last login: Fri Sep  7 14:05:07 2012 from 116.246.27.90
[root@localhost ~]# pwd
/root
[root@localhost ~]# exit
logout
Connection to 192.168.1.130 closed.
```
**远程登录到ftp,并且下载文件**
```bash
#!/wp-content/bin/expect -f
 set  ip [lindex $argv 0 ]
 set  dir [lindex $argv 1 ]
 set  file [lindex $argv 2 ]
 set  timeout 10
 spawn ftp $ip
 expect &#34; Name* &#34;
 send &#34; zwh\r &#34;
 expect &#34; Password:* &#34;
 send &#34; zwh\r &#34;
 expect &#34; ftp&gt;* &#34;
 send &#34; lcd $dir\r &#34;
 expect {
 &#34; *file &#34;  { send_user &#34; local $_dir No such file or directory &#34;;send &#34; quit\r &#34; }
 &#34; *now* &#34;  { send &#34; get $dir/$file $dir/$file\r &#34;}
 }
 expect {
 &#34; *Failed &#34; { send_user &#34; remote $file No such file &#34;;send &#34; quit\r &#34; }
 &#34; *OK &#34;     { send_user &#34; $file has been download\r &#34;;send &#34; quit\r &#34;}
 }
 expect eof
```
运行结果如下:
```bash
 root@ubuntu:/home/w23ta0# ./test2.exp 192.168.1.130 /var/www/www aaa.html
spawn ftp 192.168.1.130
Connected to 192.168.1.130.
220 (vsFTPd 2.0.5)
Name (192.168.1.130:root): zwh
331 Please specify the password.
Password:
230 Login successful.
Remote system type  is  UNIX.
Using binary mode to transfer files.
ftp&gt; lcd /var/www/www
Local directory now /var/www/www
ftp&gt;  get  /var/www/www/aaa.html /var/www/www/aaa.html
local: /var/www/www/aaa.html remote: /var/www/www/aaa.html
200 PORT command successful. Consider  using  PASV.
150 Opening BINARY mode data connection  for  /var/www/www/aaa.html (66 bytes).
226 File send OK.
66 bytes received  in  0.00 secs (515.6 kB/s)
quit aaa.html has been download
221 Goodbye.
```


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/fc7dce9e/  

