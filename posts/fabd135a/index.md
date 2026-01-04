# Kerberos安装和管理


Kerberos 服务([kerberos官网](http://web.mit.edu/kerberos/))是一种通过网络提供安全验证处理的客户机/服务器体系结构。通过验证，可保证网络事务的发送者和接收者的身份真实。该服务还可以检验来回传递的数据的有效性（完整性），并在传输过程中对数据进行加密（保密性）。使用 Kerberos 服务，可以安全登录到其他计算机、执行命令、交换数据以及传输文件。此外，该服务还提供授权服务，这样，管理员便可限制对服务和计算机的访问。而且，作为 Kerberos 用户，您还可以控制其他用户对您帐户的访问。

## Kerberos原理

Kerberos 服务是单点登录系统，这意味着您对于每个会话只需向服务进行一次自我验证，即可自动保护该会话过程中所有后续事务的安全。服务对您进行验证后，即无需在每次使用基于 Kerberos 的服务时进行验证。因此，无需在每次使用这些服务时都在网络上发送口令（增强了安全性）。MIT写了一段故事型的对话，比较生动得表述了Kerberos协议的工作原理：
Athena和欧里庇得斯关于地狱之门守护者的对话。简而言之，kerbores V5的工作原理如下：
Kerbores中有三种角色：
`KDC`：负责分发密钥的密钥分配中心
`Client`：需要使用kerbores服务的客户端
`Service`：提供具体服务的服务端
其中，Client需要和KDC和Service都进行通信。协议授权流程分两个部分：

### 获取原始票据

首先，Client向KDC发送自己的身份信息，KDC从授予票据服务(Ticket Granting Service)得到可用的票据(ticket-granting ticket)，并用协议开始前KDC与Client之间的密钥将票据加密回复给client，client收到KDC回复的加密票据后利用与client先前协议的密钥将票据解密，从而获得票据，此步骤主要是允许client进行Kerberos的验证，是进行访问服务的先决条件。

### 获取服务票据以及访问服务

client利用之前获得的票据向KDC请求服务票据，从而通过服务的身份验证。获取服务票据以及访问服务总共有如下四步：

1. client将之前获得的票据和要请求的服务信息发送给KDC，KDC中的授予票据服务将client和service之间生成一个会话密钥(Session Key)用于服务器与client的身份验证。然后KDC将这个会话密钥和用户名，用户地址(IP)，服务名，有效期，时间戳一起包装成一个票据(这张票据用于service对client的身份验证)通过client转发给service。

2.  为了让票据对client保密，所以KDC用协议开始之前KDC与服务端之间的密钥将票据加密后再发给client，同时为了让client与service之间共享那个会话密钥，KDC用client与它之间的密钥将会话密钥加密返回给client

3.  为了完成票据的传递，client将刚才收到的票据转发到service，由于client不知道KDC与service的密钥，所以它无法修改票据的信息，同时client将收到的会话密钥解压出来，然后将自己的用户名，用户地址(IP)打包成验证包用会话密钥加密也发给service

4. Service收到票据后利用它与KDC之间的密钥将票据中的信息解密出来，从而获得会话密钥和用户名，用户地址(IP)，服务名，有效期。然后再用会话密钥将验证包解密从而获得用户名，用户地址(IP)将其与之前票据中解密出来的用户名，用户地址(IP)做比较从而验证client的身份，如果service有返回结果，将其返回给client

## 安装Kerberos

### 安装package

在CentOS中可以使用yum来安装

```bash
yum install -y krb5-libs krb5-server krb5-client
```

或者使用源代码构建:

```bash
wget http://web.mit.edu/kerberos/dist/krb5/1.12/krb5-1.12.2-signed.tar
tar xvf krb5-1.12.2-signed.tar && tar xvzf krb5-1.12.2.tar.gz
cd krb5-1.12.2/src
./configure
yum install -y byacc
make -j && make install
```

### 配置DNS

使用dnsmasq配置一个简单的本地DNS，保证需要解析的主机名在/etc/hosts中。

```bash
yum install -y dnsmasq
vim /etc/dnsmasq.conf
domain=expmale.com
local=/expmale.com/
expand-hosts
no-resolv
cache-size=500
log-queries
service dnsmasq start
Starting dnsmasq:                                          [  OK  ]
```

设置客户端DNS Server
修改网卡配置文件或/etc/resolv.conf
DNS1=192.168.1.221
检查域名解析

```bash
nslookup kerberos.expmale.com
Server:		192.168.1.221
Address:	192.168.1.221#53

Name:	kerberos.expmale.com
Address: 192.168.1.221
```

这样DNS已经OK。

### 配置/etc/krb5.conf,使其指定到正确的realm中

```bash
[logging]
 default = FILE:/var/log/krb5libs.log
 kdc = FILE:/var/log/krb5kdc.log
 admin_server = FILE:/var/log/kadmind.log

[libdefaults]
 default_realm = EXPMALE.COM
 dns_lookup_realm = false
 dns_lookup_kdc = false
 ticket_lifetime = 24h
 renew_lifetime = 7d
 forwardable = true

[realms]
 EXPMALE.COM = {
  kdc = kerberos.expmale.com
  admin_server = kerberos.expmale.com
 }

[domain_realm]
 .expmale.com = EXPMALE.COM
 expmale.com = EXPMALE.COM
```

### 创建KDC配置文件

```bash
vim /var/kerberos/krb5kdc/kdc.conf
[kdcdefaults]
 kdc_ports = 88
 kdc_tcp_ports = 88

[realms]
 EXPMALE.COM = {
  #master_key_type = aes256-cts
  acl_file = /var/kerberos/krb5kdc/kadm5.acl
  dict_file = /usr/share/dict/words
  admin_keytab = /var/kerberos/krb5kdc/kadm5.keytab
  supported_enctypes = aes256-cts:normal aes128-cts:normal des3-hmac-sha1:normal arcfour-hmac:normal des-hmac-sha1:normal des-cbc-md5:normal des-cbc-crc:normal
 }
```

### 配置acl文件

```bash
vim /var/kerberos/krb5kdc/kadm5.acl 
*/admin@EXPMALE.COM        *
```

### 使用kdb5_util创建kdc数据库

```bash
kdb5_util create -r EXPMALE.COM -s
Loading random data
Initializing database '/usr/local/var/krb5kdc/principal' for realm 'EXPMALE.COM',
master key name 'K/M@EXPMALE.COM'
You will be prompted for the database Master Password.
It is important that you NOT FORGET this password.
Enter KDC database master key: 
Re-enter KDC database master key to verify: 
```

<div class="note warning"><p>出现 Loading random data 的时候另开个终端执行点消耗CPU的命令如 cat /dev/sda > /dev/urandom 可以加快随机数采集。</p></div>

```bash
kadmin.local 
Authenticating as principal root/admin@EXPMALE.COM with password.
```

首先有介绍一个术语（参考[kerberos 认证配置](http://wgzhao.com/2005/12/02/kerberos-authentication-configuration/)）：

- **Principal**：在 Kerberos 中，Principal 是参加认证的基本实体。一般来说有两种，一种用来表示 Kerberos 数据库中的用户，另一种用来代表某一特定主机，也就是说 Principal是用来表示客户端和服务端身份的实体, Principal 的格式采用 ASN.1 标准,即 Abstract Syntax Notation One，来准确定义)，Principal 是由三个部分组成：名字（name），实例（instance），REALM（域）。比如一个标准的 Kerberos 的用户是：name/instance@REALM 。

- **Name**：第一部分。在代表客户方的情况，它是一个用户名；在代表主机的情况，它是写成 host。

- **Instance**：第二部分。对 name 的进一步描述，例如 name 所在的主机名或 name 的类型等,可省略。它与第一部分之间用‘ / ’分隔，但是作为主机的描述时写成 host/Instance。

- **Realm**：第三部分。是 Kerberos 在管理上的划分，在 KDC 中所负责的一个域数据库称作为 Realm。这个数据库中存放有该网络范围内的所有 Principal 和它们的密钥，数据库的内容被 Kerberos 的认证服务器 AS 和票据授权服务器 TGS 所使用。Realm 通常是永远是大写的字符,并且在大多数 Kerberos 系统的配置中，一般 Realm 和该网络环境的 DNS 域是一致的。与第二部分之间用‘@’分隔，缺省为本地的 Realm。

添加新的管理员用户，kadmin和kadmin.local是KDC的管理接口。

```bash
# 添加新的管理员用户
kadmin.local:  addprinc single/admin
WARNING: no policy specified for single/admin@EXPMALE.COM; defaulting to no policy
Enter password for principal "single/admin@EXPMALE.COM": 
Re-enter password for principal "single/admin@EXPMALE.COM": 
Principal "single/admin@EXPMALE.COM" created.
# 列出所有的principle
kadmin.local:  listprincs
K/M@EXPMALE.COM
single/admin@EXPMALE.COM
kadmin/admin@EXPMALE.COM
kadmin/cdh_manager@EXPMALE.COM
kadmin/changepw@EXPMALE.COM
krbtgt/EXPMALE.COM@EXPMALE.COM
# 查看principle：
getprinc single/admin@EXPMALE.COM
# 删除principle：
delprinc single/admin@EXPMALE.COM
# 修改principle密码：
cpw -pw password test1/admin@EXPMALE.COM
```

### 启动服务

```bash
service krb5kdc restart
Starting Kerberos 5 KDC:                         [  OK  ]
service kadmin restart
Starting Kerberos 5 Admin Server:                [  OK  ]
```

### 验证principle

在其他主机上需要有相同的krb5.conf配置。

```bash
#登录验证
kinit test1/hadoop01@EXPMALE.COM
Password for test1/hadoop01@EXPMALE.COM: 
#查看凭证
klist
Ticket cache: FILE:/tmp/krb5cc_0
Default principal: test1/hadoop01@EXPMALE.COM

Valid starting     Expires            Service principalna jiu
/08/14 11:58:00  09/09/14 11:58:00  krbtgt/EXPMALE.COM@EXPMALE.COM
	renew until 09/08/14 11:58:00
#注销凭证
kdestory
```



---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/fabd135a/  

