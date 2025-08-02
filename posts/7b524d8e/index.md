# Ansible安装及使用


## 前言

AnsibleWorks成立于2012年，由自动化工具Cobbler及Func的开发者Michael DeHaan创建。其Ansible平台是一个开源的配置及计算机管理平台。可实现多节点的软件部署，执行特定任务并进行配置管理。

Ansible 跟其他IT自动化技术的区别在于其关注点并非配置管理、应用部署或IT流程工作流，而是提供一个统一的界面来协调所有的IT自动化功能，因此 Ansible的系统更加易用，部署更快。受管理的节点无需安装额外的远程控制软件，由平台通过SSH（Secure SHell）对其进行管理，因此十分方便。其模块支持JSON等标准输出格式，可采用任何编程语言重写。

Ansible可以让用户避免编写脚本或代码来管理应用，同时还能搭建工作流实现IT任务的自动化执行。IT自动化可以降低技术门槛及对传统IT的依赖，从而加快项目的交付速度。

**Ansible有如下优点：**
1. 轻量级，他不需要去客户端安装agent，更新时，只需要在操作机上进行一次更新即可
2. 批量任务执行可以写成脚本，而且不用分发到远程就可以执行
3. 使用python编写的，维护更简单
4. 支持sudo

## 安装Ansible

### 创建ansible用户
```bash
[root@node1 ~]# useradd ansible
[root@node1 ~]# passwd ansible
更改用户 ansible 的密码 。
新的 密码：
重新输入新的 密码：
passwd： 所有的身份验证令牌已经成功更新。
```

### 允许执行sudo
```
[root@node1 ~]# vi /etc/sudoers
# Defaults    requiretty  //表示不需要控制终端
ansible ALL=(ALL) NOPASSWD:ALL
```

### 安装ansible
```bash
[root@node1 ~]# yum install PyYAML.x86_64 python-paramiko.noarch python-jinja2.x86_64 python-devel -y
[root@node1 ~]# wget https://pypi.python.org/packages/source/s/setuptools/setuptools-7.0.tar.gz
[root@node1 ~]# tar zxvf setuptools-7.0.tar.gz
[root@node1 ~]# cd setuptools-7.0
[root@node1 setuptools-7.0]# python setup.py install
[root@node1 setuptools-7.0]# cd ..
[root@node1 ~]# wget https://pypi.python.org/packages/source/a/ansible/ansible-1.7.2.tar.gz
[root@node1 ~]# tar zxvf ansible-1.7.2.tar.gz
[root@node1 ~]# cd ansible-1.7.2
[root@node1 ansible-1.7.2]# python setup.py build
[root@node1 ansible-1.7.2]# python setup.py install
[root@node1 ansible-1.7.2]# mkdir /etc/ansible
[root@node1 ansible-1.7.2]# cp examples/ansible.cfg /etc/ansible/
[root@node1 ansible-1.7.2]# cp examples/hosts /etc/ansible/
```

### 修改配置文件
```bash
[root@node1 ansible-1.7.2]# vi /etc/ansible/ansible.cfg
hostfile       = /etc/ansible/hosts
library        = /usr/share/ansible
remote_tmp     = $HOME/.ansible/tmp
pattern        = *
forks          = 5
poll_interval  = 15
sudo_user      = ansible
#ask_sudo_pass = True
#ask_pass      = True
transport      = smart
remote_port    = 22
module_lang    = C
[root@node1 ansible-1.7.2]# vi /etc/ansible/hosts
#server
[localhost]
127.0.0.1
#client
[client]
172.16.0.112
```
### ssh互信
```
[root@node1 ansible-1.7.2]# su - ansible
[ansible@node1 ~]$
[ansible@node1 ~]$ ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/home/ansible/.ssh/id_rsa):
Created directory '/home/ansible/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/ansible/.ssh/id_rsa.
Your public key has been saved in /home/ansible/.ssh/id_rsa.pub.
The key fingerprint is:
dc:c9:ac:d8:46:81:37:72:08:f3:77:06:98:33:cb:5f ansible@node1
The key's randomart image is:
+--[ RSA 2048]----+
|    o  o.        |
|     +=o .       |
|     .=+* o      |
|      o* OE.     |
|       .S.=      |
|       +..       |
|      . +        |
|       .         |
|                 |
+-----------------+
[ansible@node1 ~]$
[ansible@node1 ~]$ ssh-keygen -t dsa
Generating public/private dsa key pair.
Enter file in which to save the key (/home/ansible/.ssh/id_dsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/ansible/.ssh/id_dsa.
Your public key has been saved in /home/ansible/.ssh/id_dsa.pub.
The key fingerprint is:
b3:a6:94:bf:5c:21:a3:c5:8b:74:b8:a5:8c:62:34:d2 ansible@node1
The key's randomart image is:
+--[ DSA 1024]----+
|                 |
|                 |
|                 |
| .     o         |
|. E   o S .      |
| o . + X * .     |
|  o . O + .      |
| . . . = .       |
|      . +.       |
+-----------------+
[ansible@node1 ~]$
[ansible@node1 ~]$ cd .ssh/
[ansible@node1 .ssh]$ cat *.pub > authorized_keys
[ansible@node1 .ssh]$ chmod -R 700 .

#测试本机互信
[ansible@node1 .ssh]$ ssh 127.0.0.1
The authenticity of host '127.0.0.1 (127.0.0.1)' can't be established.
RSA key fingerprint is fa:73:59:f5:08:95:b2:2e:7f:3e:52:91:8a:e6:47:1f.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '127.0.0.1' (RSA) to the list of known hosts.
[ansible@node1 ~]$ exit
logout
Connection to 127.0.0.1 closed.
```

### 远程ssh互信配置测试
```bash
[ansible@node1 .ssh]$ scp authorized_keys ansible@172.16.0.112:
The authenticity of host '172.16.0.112 (172.16.0.112)' can't be established.
RSA key fingerprint is fa:73:59:f5:08:95:b2:2e:7f:3e:52:91:8a:e6:47:1f.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '192.168.253.131' (RSA) to the list of known hosts.
ansible@172.16.0.112's password:
authorized_keys100%  998     1.0KB/s   00:00

#测试是否互信成功
[ansible@node1 .ssh]$ ssh 172.16.0.112
[ansible@node2 ~]$ mkdir .ssh
[ansible@node2 ~]$ mv authorized_keys .ssh/
[ansible@node2 ~]$ chmod -R 700 .ssh/
```

## 使用Ansible

### 使用ping模块测试是否成功
```bash
[ansible@node1 ~]$ ansible all -m ping
127.0.0.1 | success >> {
    "changed": false,
    "ping": "pong"
}

172.16.0.112 | success >> {
    "changed": false,
    "ping": "pong"
}
```
### 查看时间
```bash
[ansible@node1 ~]$ ansible all -m command -a "sudo date"
127.0.0.1 | success | rc=0 >>
Fri Apr 22 23:48:42 CST 2016

172.16.0.112 | success | rc=0 >>
Fri Apr 22 23:48:42 CST 2016
```
### 使用yum安装软件
```bash
[ansible@node1 ~]$ ansible all -m command -a "sudo yum install zip unzip -y"
127.0.0.1 | success | rc=0 >>
Loaded plugins: fastestmirror, security
Loading mirror speeds from cached hostfile
 * base: mirrors.btte.net
 * extras: mirrors.yun-idc.com
 * updates: mirrors.yun-idc.com
Setting up Install Process
Package zip-3.0-1.el6_7.1.x86_64 already installed and latest version
Package unzip-6.0-2.el6_6.x86_64 already installed and latest version
Nothing to do   #说明此软件之前在每台服务器都已经装过了

172.16.0.112 | success | rc=0 >>
Loaded plugins: fastestmirror, security
Loading mirror speeds from cached hostfile
 * base: mirrors.btte.net
 * extras: mirrors.yun-idc.com
 * updates: mirrors.yun-idc.com
Setting up Install Process
Resolving Dependencies
--> Running transaction check
---> Package unzip.x86_64 0:6.0-2.el6_6 will be installed
---> Package zip.x86_64 0:3.0-1.el6_7.1 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

================================================================================
 Package        Arch            Version                  Repository        Size
================================================================================
Installing:
 unzip          x86_64          6.0-2.el6_6              base             149 k
 zip            x86_64          3.0-1.el6_7.1            updates          259 k

Transaction Summary
================================================================================
Install       2 Package(s)

Total download size: 408 k
Installed size: 1.1 M
Downloading Packages:
--------------------------------------------------------------------------------
Total   2.5 MB/s | 408 kB     00:00
Running rpm_check_debug
Running Transaction Test
Transaction Test Succeeded
Running Transaction
  Installing : zip-3.0-1.el6_7.1.x86_64                 1/2
  Installing : unzip-6.0-2.el6_6.x86_64                 2/2
  Verifying  : unzip-6.0-2.el6_6.x86_64                 1/2
  Verifying  : zip-3.0-1.el6_7.1.x86_64                 2/2

Installed:
  unzip.x86_64 0:6.0-2.el6_6             zip.x86_64 0:3.0-1.el6_7.1

Complete!   #安装成功
```
### 查看ansible内置模块
```bash
[ansible@node1 ~]$ ansible-doc -l
acl                  Sets and retrieves file ACL information.
add_host             add a host (and alternatively a group) to the ansible-playbo
airbrake_deployment  Notify airbrake about app deployments
alternatives         Manages alternative programs for common commands
apache2_module       enables/disables a module of the Apache2 webserver
apt                  Manages apt-packages
apt_key              Add or remove an apt key
apt_repository       Add and remove APT repositories
apt_rpm              apt_rpm package manager
arista_interface     Manage physical Ethernet interfaces
arista_l2interface   Manage layer 2 interfaces
arista_lag           Manage port channel (lag) interfaces
arista_vlan          Manage VLAN resources
assemble             Assembles a configuration file from fragments
assert               Fail with custom message
at                   Schedule the execution of a command or script file via the a
authorized_key       Adds or removes an SSH authorized key
azure                create or terminate a virtual machine in azure
bigip_facts          Collect facts from F5 BIG-IP devices
bigip_monitor_http   Manages F5 BIG-IP LTM http monitors
bigip_monitor_tcp    Manages F5 BIG-IP LTM tcp monitors
bigip_node           Manages F5 BIG-IP LTM nodes
bigip_pool           Manages F5 BIG-IP LTM pools
bigip_pool_member    Manages F5 BIG-IP LTM pool members
boundary_meter       Manage boundary meters
bzr                  Deploy software (or files) from bzr branches
campfire             Send a message to Campfire
capabilities         Manage Linux capabilities
cloudformation       create a AWS CloudFormation stack
command              Executes a command on a remote node
composer             Dependency Manager for PHP
copy                 Copies files to remote locations.
cpanm                Manages Perl library dependencies.
cron                 Manage cron.d and crontab entries.
datadog_event        Posts events to DataDog  service
debconf              Configure a .deb package
debug                Print statements during execution
digital_ocean        Create/delete a droplet/SSH_key in DigitalOcean
digital_ocean_domain Create/delete a DNS record in DigitalOcean
digital_ocean_sshkey Create/delete an SSH key in DigitalOcean
django_manage        Manages a Django application.
dnsimple             Interface with dnsimple.com (a DNS hosting service).
dnsmadeeasy          Interface with dnsmadeeasy.com (a DNS hosting service).
docker               manage docker containers
docker_image         manage docker images
easy_install         Installs Python libraries
ec2                  create, terminate, start or stop an instance in ec2, return
ec2_ami              create or destroy an image in ec2, return imageid
ec2_ami_search       Retrieve AWS AMI for a given operating system.
ec2_asg              Create or delete AWS Autoscaling Groups
ec2_eip              associate an EC2 elastic IP with an instance.
ec2_elb              De-registers or registers instances from EC2 ELBs
ec2_elb_lb           Creates or destroys Amazon ELB. - Returns information about
ec2_facts            Gathers facts about remote hosts within ec2 (aws)
ec2_group            maintain an ec2 VPC security group.
ec2_key              maintain an ec2 key pair.
ec2_lc               Create or delete AWS Autoscaling Launch Configurations
ec2_metric_alarm     Create/update or delete AWS Cloudwatch 'metric alarms'
ec2_scaling_policy   Create or delete AWS scaling policies for Autoscaling groups
ec2_snapshot         creates a snapshot from an existing volume
ec2_tag              create and remove tag(s) to ec2 resources.
ec2_vol              create and attach a volume, return volume id and device map.
ec2_vpc              configure AWS virtual private clouds
ejabberd_user        Manages users for ejabberd servers
elasticache          Manage cache clusters in Amazon Elasticache.
facter               Runs the discovery program `facter' on the remote system...
fail                 Fail with custom message
fetch                Fetches a file from remote nodes
file                 Sets attributes of files
filesystem           Makes file system on block device
fireball             Enable fireball mode on remote node
firewalld            Manage arbitrary ports/services with firewalld
flowdock             Send a message to a flowdock
gc_storage           This module manages objects/buckets in Google Cloud Storage.
gce                  create or terminate GCE instances
gce_lb               create/destroy GCE load-balancer resources
gce_net              create/destroy GCE networks and firewall rules
gce_pd               utilize GCE persistent disk resources
gem                  Manage Ruby gems
get_url              Downloads files from HTTP, HTTPS, or FTP to node
git                  Deploy software (or files) from git checkouts
github_hooks         Manages github service hooks.
glance_image         Add/Delete images from glance
group                Add or remove groups
group_by             Create Ansible groups based on facts
grove                Sends a notification to a grove.io channel
hg                   Manages Mercurial (hg) repositories.
hipchat              Send a message to hipchat
homebrew             Package manager for Homebrew
homebrew_cask        Install/uninstall homebrew casks.
homebrew_tap         Tap a Homebrew repository.
hostname             Manage hostname
htpasswd             manage user files for basic authentication
include_vars         Load variables from files, dynamically within a task.
ini_file             Tweak settings in INI files
irc                  Send a message to an IRC channel
jabber               Send a message to jabber user or chat room
jboss                deploy applications to JBoss
jira                 create and modify issues in a JIRA instance
kernel_blacklist     Blacklist kernel modules
keystone_user        Manage OpenStack Identity (keystone) users, tenants and role
layman               Manage Gentoo overlays
librato_annotation   create an annotation in librato
lineinfile           Ensure a particular line is in a file, or replace an existin
linode               create / delete / stop / restart an instance in Linode Publi
lldp                 get details reported by lldp
locale_gen           Creates of removes locales.
logentries           Module for tracking logs via logentries.com
lvg                  Configure LVM volume groups
lvol                 Configure LVM logical volumes
macports             Package manager for MacPorts
mail                 Send an email
modprobe             Add or remove kernel modules
mongodb_user         Adds or removes a user from a MongoDB database.
monit                Manage the state of a program monitored via Monit
mount                Control active and configured mount points
mqtt                 Publish a message on an MQTT topic for the IoT
mysql_db             Add or remove MySQL databases from a remote host.
mysql_replication    Manage MySQL replication
mysql_user           Adds or removes a user from a MySQL database.
mysql_variables      Manage MySQL global variables
nagios               Perform common tasks in Nagios related to downtime and notif
netscaler            Manages Citrix NetScaler entities
newrelic_deployment  Notify newrelic about app deployments
nexmo                Send a SMS via nexmo
nova_compute         Create/Delete VMs from OpenStack
nova_keypair         Add/Delete key pair from nova
npm                  Manage node.js packages with npm
ohai                 Returns inventory data from `Ohai'
open_iscsi           Manage iscsi targets with open-iscsi
openbsd_pkg          Manage packages on OpenBSD.
openvswitch_bridge   Manage Open vSwitch bridges
openvswitch_port     Manage Open vSwitch ports
opkg                 Package manager for OpenWrt
osx_say              Makes an OSX computer to speak.
ovirt                oVirt/RHEV platform management
pacman               Manage packages with `pacman'
pagerduty            Create PagerDuty maintenance windows
pause                Pause playbook execution
ping                 Try to connect to host and return `pong' on success.
pingdom              Pause/unpause Pingdom alerts
pip                  Manages Python library dependencies.
pkgin                Package manager for SmartOS
pkgng                Package manager for FreeBSD >= 9.0
pkgutil              Manage CSW-Packages on Solaris
portage              Package manager for Gentoo
portinstall          Installing packages from FreeBSD's ports system
postgresql_db        Add or remove PostgreSQL databases from a remote host.
postgresql_privs     Grant or revoke privileges on PostgreSQL database objects...
postgresql_user      Adds or removes a users (roles) from a PostgreSQL database..
quantum_floating_ip  Add/Remove floating IP from an instance
quantum_floating_ip_associate Associate or disassociate a particular floating IP with an i
quantum_network      Creates/Removes networks from OpenStack
quantum_router       Create or Remove router from openstack
quantum_router_gateway set/unset a gateway interface for the router with the specif
quantum_router_interface Attach/Dettach a subnet's interface to a router
quantum_subnet       Add/Remove floating IP from an instance
rabbitmq_parameter   Adds or removes parameters to RabbitMQ
rabbitmq_plugin      Adds or removes plugins to RabbitMQ
rabbitmq_policy      Manage the state of policies in RabbitMQ.
rabbitmq_user        Adds or removes users to RabbitMQ
rabbitmq_vhost       Manage the state of a virtual host in RabbitMQ
raw                  Executes a low-down and dirty SSH command
rax                  create / delete an instance in Rackspace Public Cloud
rax_cbs              Manipulate Rackspace Cloud Block Storage Volumes
rax_cbs_attachments  Manipulate Rackspace Cloud Block Storage Volume Attachments.
rax_clb              create / delete a load balancer in Rackspace Public Cloud...
rax_clb_nodes        add, modify and remove nodes from a Rackspace Cloud Load Bal
rax_dns              Manage domains on Rackspace Cloud DNS
rax_dns_record       Manage DNS records on Rackspace Cloud DNS
rax_facts            Gather facts for Rackspace Cloud Servers
rax_files            Manipulate Rackspace Cloud Files Containers
rax_files_objects    Upload, download, and delete objects in Rackspace Cloud File
rax_identity         Load Rackspace Cloud Identity
rax_keypair          Create a keypair for use with Rackspace Cloud Servers
rax_meta             Manipulate metadata for Rackspace Cloud Servers
rax_network          create / delete an isolated network in Rackspace Public Clou
rax_queue            create / delete a queue in Rackspace Public Cloud
rax_scaling_group    Manipulate Rackspace Cloud Autoscale Groups
rax_scaling_policy   Manipulate Rackspace Cloud Autoscale Scaling Policy
rds                  create, delete, or modify an Amazon rds instance
rds_param_group      manage RDS parameter groups
rds_subnet_group     manage RDS database subnet groups
redhat_subscription  Manage Red Hat Network registration and subscriptions using
redis                Various redis commands, slave and flush
replace              Replace all instances of a particular string in a file using
rhn_channel          Adds or removes Red Hat software channels
rhn_register         Manage Red Hat Network registration using the `rhnreg_ks' co
riak                 This module handles some common Riak operations
rollbar_deployment   Notify Rollbar about app deployments
route53              add or delete entries in Amazons Route53 DNS service
rpm_key              Adds or removes a gpg key from the rpm db
s3                   idempotent S3 module putting a file into S3.
script               Runs a local script on a remote node after transferring it..
seboolean            Toggles SELinux booleans.
selinux              Change policy and state of SELinux
service              Manage services.
set_fact             Set host facts from a task
setup                Gathers facts about remote hosts
shell                Execute commands in nodes.
slack                Send Slack notifications
slurp                Slurps a file from remote nodes
sns                  Send Amazon Simple Notification Service (SNS) messages
stackdriver          Send code deploy and annotation events to stackdriver
stat                 retrieve file or file system status
subversion           Deploys a subversion repository.
supervisorctl        Manage the state of a program or group of programs running v
svr4pkg              Manage Solaris SVR4 packages
swdepot              Manage packages with swdepot package manager (HP-UX)
synchronize          Uses rsync to make synchronizing file paths in your playbook
sysctl               Manage entries in sysctl.conf.
template             Templates a file out to a remote server.
twilio               Sends a text message to a mobile phone through Twilio.
typetalk             Send a message to typetalk
ufw                  Manage firewall with UFW
unarchive            Copies an archive to a remote location and unpack it
uri                  Interacts with webservices
urpmi                Urpmi manager
user                 Manage user accounts
virt                 Manages virtual machines supported by libvirt
vsphere_guest        Create/delete/manage a guest VM through VMware vSphere.
wait_for             Waits for a condition before continuing.
win_feature          Installs and uninstalls Windows Features
win_get_url          Fetches a file from a given URL
win_group            Add and remove local groups
win_msi              Installs and uninstalls Windows MSI files
win_ping             A windows version of the classic ping module.
win_service          Manages Windows services
win_stat             returns information about a Windows file
win_user             Manages local Windows user accounts
xattr                set/retrieve extended attributes
yum                  Manages packages with the `yum' package manager
zfs                  Manage zfs
zypper               Manage packages on SuSE and openSuSE
zypper_repository    Add and remove Zypper repositories
```


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/7b524d8e/  

