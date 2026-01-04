# 解决LDAP出现ldap_bind: Invalid Credentials (49)错误


LDAP最经常遇到的就是ldap_bind: Invalid credentials (49)错误，本文阐述了错误原因及解决办法：
比如在某LDAP客户端，使用rootdn(管理员)权限为某用户修改密码时

```bash
$ ldappasswd -H ldap://172.16.0.21 -x -D "cn=admin,ou=People,dc=expmale,dc=com" -W -S "uid=zhang3,ou=People,dc=expmale,dc=com"
New password: 
Re-enter new password: 
Enter LDAP Password: 
ldap_bind: Invalid credentials (49)
```

**错误原因1：管理员DN或者用户DN错误** 

管理员DN是在`/etc/openldap/slapd.conf`中指定的rootdn，其格式 
应该是”cn=admin,dc=expmale,dc=com” 
而不是”cn=admin,ou=People,dc=expmale,dc=com” 
而普通用户的DN才应该是”uid=zhang3,ou=People,dc=expmale,dc=com”。 
也可以执行如下命令查看该用户的DN是否存在

查询用户列表,不需要密码
```bash
$ ldapsearch -H ldap://172.16.0.21 -x -b "ou=People,dc=expmale,dc=com" | grep dn
```

**错误原因2：管理员密码错误** 

这个需要自行判断，如需要修改rootdn的密码，在`/etc/openldap/slapd.conf`中改掉roodn的rootpw项，然后执行如下操作
```bash
$ rm -fr /etc/openldap/slapd.d/*
$ slaptest -f /etc/openldap/slapd.conf -F /etc/openldap/slapd.d
#测试配置文件语法是否有错误，如果提示testing succeeded则可以进入下一步

$ chown -R ldap:ldap /etc/openldap/slapd.d/
$ /etc/init.d/slapd restart
```
提示：删除`/etc/openldap/slapd.d/`目录下的内容，并不会导致ldap数据库的丢失，实际上，ldap数据库存储位置（通常位于`/var/lib/ldap`目录下）由主配置文件里的directory项指定。

---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/1ad460a4/  

