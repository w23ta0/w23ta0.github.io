# 如何在CentOS7上安装SonaeQube7.9

## 环境准备

- SonarQube：sonarqube-7.9.3
- 数据库：PostgreSQL 10.10
- 操作系统：CentOS 7.6
- JDK版本：java-11-openjdk 

> sonarqube从7.8起，不再支持mysql
>
> sonarqube从7.9起，不再支持jdk11以下版本 


## 安装JDK
```bash
yum install java-11-openjdk -y
```

## 安装PostgreSQL

### 安装RPM源
```bash
yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
```

### 安装客户端
```bash
yum install postgresql10
```
### 安装服务端
```bash
yum install postgresql10-server
```
### 初始化数据和设置自动启动
```bash
/usr/pgsql-10/bin/postgresql-10-setup initdb
systemctl enable postgresql-10
systemctl start postgresql-10
```
### 登录数据库
```bash
su - postgres
psql -U postgres
```
### 创建sonarqube用户
```sql
create user sonarqube with password 'sonarqube';
create database sonarqube owner sonarqube;
grant all  on database sonarqube to sonarqube;
create schema my_schema;
```

### 退出psql（输入 \q 再按回车键即可）
```bash
\q
```

### 开启远程访问
修改/var/lib/pgsql/10/data/postgresql.conf文件，取消 listen_addresses 的注释，将参数值改为“*” 

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200427123802.png) 

修改/var/lib/pgsql/10/data/pg_hba.conf文件，增加下图红框部分内容 

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200427123810.png) 

### 切换到root用户，重启postgresql服务
```	bash
systemctl restart postgresql-10.service
```


### 常用命令

```bash
systemctl start postgresql-10.service     // 启动服务
systemctl stop postgresql-10.service      // 关闭服务
systemctl restart postgresql-10.service   // 重启服务
systemctl status postgresql-10.service    // 查看状态
```

## 安装SonarQube

### 添加系统用户
```bash
useradd sonarqube
passwd sonarqube
```
SonarQube内置elasticsearch不允许使用root用户启动

### 下载并解压安装包
```bash
cd /opt
wget https://binaries.sonarsource.com/Distribution/sonarqube/sonarqube-7.9.3.zip
unzip sonarqube-7.9.3.zip
```
### 修改目录权限
```bash
chown -R sonarqube.sonarqube /opt/sonarqube-7.9.3 -R
```
### 创建软连接
```bash
ln -s /opt/sonarqube-7.9.3/bin/linux-x86-64/sonar.sh /etc/init.d/sonar
chmod +x /etc/init.d/sonar 
```
### 修改配置
```bash
vi /opt/sonarqube-7.9.3/conf/sonar.properties

sonar.jdbc.username=sonarqube
sonar.jdbc.password=sonarqube
sonar.jdbc.url=jdbc:postgresql://172.16.0.92/sonarqube
```
### 登陆启动用户，启动程序
```bash
su - sonarqube 
service sonar start
```
### 登录访问 

访问url：http://172.16.0.92:9000

默认用户名/密码：admin/admin

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200427123653.png)

### 中文语言包

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200427123542.png)



### 常用命令

```bash
service sonar start     // 启动服务
service sonar stop      // 关闭服务
service sonar restart   // 重启服务

chkconfig sonar on      // 设置开机启动
chkconfig sonar off     // 关闭开机启动
```
## 安装SonarScanner

下载地址：https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/
![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200427114505.png)

### 下载并解压安装包
```bash
cd /opt
wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.2.0.1873-linux.zip
unzip sonar-scanner-cli-4.2.0.1873-linux.zip
```
### 创建软连接
```bash
ln -s sonar-scanner-cli-4.2.0.1873-linux   sonar-scanner
```
### 配置PATH
```bash
cat > /etc/profile.d/sonar-scanner.sh <<EOF
export SONAR_RUNNER_HOME=/opt/sonar-scanner
export PATH=$PATH:/opt/sonar-scanner/bin
EOF

source /etc/profile.d/sonar-scanner.sh
```

## 开始扫描


![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200427124045.png)

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200427124055.png)

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200427124100.png)

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200427124828.png)

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200427124935.png)

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200427125037.png)

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200427125343.png)

---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/6aa4d5ee/  

