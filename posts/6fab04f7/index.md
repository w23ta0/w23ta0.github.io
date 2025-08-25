# CentOS6 安装配置OpenLDAP Server


## 安装及配置  

首先使用如下命令查看是否已经安装 openldap： 

```bash
# rpm -qa | grep openldap 
openldap-2.4.40-16.el6.x86_64
openldap-servers-sql-2.4.40-16.el6.x86_64
openldap-clients-2.4.40-16.el6.x86_64
openldap-servers-2.4.40-16.el6.x86_64
openldap-devel-2.4.40-16.el6.x86_64
```

若已经安装过，可以忽略此步骤 

### 导入epel源 

```bash
wget http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm
rpm –ivh epel-release-6-8.noarch.rpm
```

### 安装openldap 

```bash
yum -y install openldap openldap-*
```

### 配置openldap，包括准备DB_CONFIG和slapd.conf 

```bash
cd /etc/openldap/
cp /usr/share/openldap-servers/slapd.conf.obsolete slapd.conf
cp /usr/share/openldap-servers/DB_CONFIG.example /var/lib/ldap/DB_CONFIG
```

### 设置 openldap的管理员密码  

首先要生成经处理后的明文密码：  

```bash
slappasswd -s 123456
{SSHA}2TuB7EJeC1pUXDrGoxY1qqKg3ScgAvFC
```
<div class="note danger no-icon"><p>其中 {SSHA}xxxxxxxxxxxxxxxxxxxxxxxx 就是加密处理后的明文密码，之后会用到这个密码。</p></div>


### 设置自己的 Domain Name  

修改slapd.conf，主要配置dc和rootpw，rootpw配置为上述步骤中的密码 

```bash
vi /etc/openldap/slapd.conf 
database        bdb
suffix          "dc=expmale,dc=com"
checkpoint      1024 15
rootdn          "cn=Manager,dc=expmale,dc=com"
rootpw   {SSHA}2TuB7EJeC1pUXDrGoxY1qqKg3ScgAvFC
```

### 修改目录权限 

```bash
chown -R ldap:ldap /etc/openldap/  
chown -R ldap:ldap /var/lib/ldap/
```

### 启动slapd服务 

```bash
/etc/init.d/slapd start
```

<div class="note warning"><p>一定要先启动slapd服务，否则测试会报错，提示某数据库文件不存在，只有启动服务后才能生产该文件。 </p></div>

### 验证测试

```bash
slaptest -f /etc/openldap/slapd.conf -F /etc/openldap/slapd.d/
config file testing succeeded
```

## 使用perl脚本将本地用户转换为ldap用户 

从本地系统添加用户到ldap的方法，其实就是先添加用户到本地操作系统中，然后通过pl脚本将这些用户转换为ldap能够识别的ldif文件格式，最后通过ldapadd命令导入到ldap中，从而完成ldap数据的导入，要使用pl脚本将本地用户信息转换为ldif文件格式，首先需要安装一个软件，名字为migrationtools。 

### 安装migrationtools

```
yum install migrationtools -y
```

### 编辑/usr/share/migrationtools/migrate_common.ph并修改相关配置 

```bash
vim /usr/share/migrationtools/migrate_common.ph 
$DEFAULT_MAIL_DOMAIN = "expmale.com";
$DEFAULT_BASE = "dc=expmale,dc=com";
```

### 生成base.ldif、passwd.ldif、group.ldif文件 

```bash
/usr/share/migrationtools/migrate_base.pl > /tmp/base.ldif
/usr/share/migrationtools/migrate_group.pl /etc/group > /tmp/group.ldif
/usr/share/migrationtools/migrate_passwd.pl /etc/passwd > /tmp/passwd.ldif

ls /tmp/
base.ldif  group.ldif  passwd.ldif
```

### 导入base.ldif、passwd.ldif、group.ldif文件 

```bash
ldapadd -x -D "cn=Manager,dc=expmale,dc=com" -W -f /tmp/base.ldif            
ldapadd -x -D "cn=Manager,dc=expmale,dc=com" -W -f /tmp/group.ldif 
ldapadd -x -D "cn=Manager,dc=expmale,dc=com" -W -f /tmp/passwd.ldif
```
<div class="note warning"><p>需要输入管理员密码</p></div>

### 测试数据导入是否成功 

```bash
ldapsearch -LLL -W -x -H ldap://localhost -D "cn=Manager,dc=expmale,dc=com" -b "dc=expmale,dc=com" 
Enter LDAP Password: 
dn: dc=expmale,dc=com
dc: expmale
objectClass: top
objectClass: domain
dn: ou=Hosts,dc=expmale,dc=com
ou: Hosts
objectClass: top
objectClass: organizationalUnit
dn: ou=Rpc,dc=expmale,dc=com
ou: Rpc
objectClass: top
objectClass: organizationalUnit
dn: ou=Services,dc=expmale,dc=com
ou: Services
objectClass: top
objectClass: organizationalUnit
dn: nisMapName=netgroup.byuser,dc=expmale,dc=com
nisMapName: netgroup.byuser
objectClass: top
objectClass: nisMap
dn: ou=Mounts,dc=expmale,dc=com
ou: Mounts
objectClass: top
objectClass: organizationalUnit
dn: ou=Networks,dc=expmale,dc=com
ou: Networks
objectClass: top
objectClass: organizationalUnit
dn: ou=People,dc=expmale,dc=com
ou: People
objectClass: top
objectClass: organizationalUnit
dn: ou=Group,dc=expmale,dc=com
ou: Group
objectClass: top
objectClass: organizationalUnit
dn: ou=Netgroup,dc=expmale,dc=com
ou: Netgroup
objectClass: top
objectClass: organizationalUnit
dn: ou=Protocols,dc=expmale,dc=com
ou: Protocols
objectClass: top
objectClass: organizationalUnit
dn: ou=Aliases,dc=expmale,dc=com
ou: Aliases
objectClass: top
objectClass: organizationalUnit
dn: nisMapName=netgroup.byhost,dc=expmale,dc=com
nisMapName: netgroup.byhost
objectClass: top
objectClass: nisMap
```
此处省略。。。


## Ldap Browser 连接

Jarek Gawor发布的LDAP Browser/Editor v2.8.2 - 虽然最后一次更新于2001年，但仍然是最好工具的之一！与当前的Java版本5和6完美兼容。 

所有之前的下载链接似乎都被关闭了，给像我一样喜欢高速和简约工具的小伙伴们，附下载链接。{% btn https://www.netiq.com/communities/cool-solutions/wp-content/uploads/sites/2/2009/07/Gawor_ldapbrowser_282.zip, 下载Gawor_ldapbrowser_282.zip, download fa-lg fa-fw %}

### 访问LDAP Browser 

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20181229141953.png)

### 登录成功界面

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20181229145721.png)

---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/6fab04f7/  

