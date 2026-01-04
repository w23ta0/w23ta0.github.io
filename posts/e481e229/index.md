# 如何在CentOS7上安装Kubernetes (K8s) 1.8


## 环境准备

| IP地址       | 系统      | 主机名     |
| ------------ | --------- | ---------- |
| 172.16.0.245 | CentOS7.6 | k8s-master |
| 172.16.0.246 | CentOS7.6 | k8s-node1  |
| 172.16.0.247 | CentOS7.6 | k8s-node2  |

## 在主节点上执行以下步骤

### 停用SELinux和防火墙服务

使用以下命令登录到您的kubernetes主节点并设置主机名并禁用selinux

```bash
~]# hostnamectl set-hostname 'k8s-master'
~]# exec bash
~]# setenforce 0
~]# sed -i --follow-symlinks 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/sysconfig/selinux
```

停用防火墙服务

```bash
[root@k8s-master ~]# systemctl stop firewalld
[root@k8s-master ~]# systemctl disable firewalld
```
创建/etc/sysctl.d/k8s.conf 文件
```bash
cat <<EOF > /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF
```

把以上配置修改的使其生效。
```bash
[root@k8s-master ~]# modprobe br_netfilter
[root@k8s-master ~]# sysctl -p /etc/sysctl.d/k8s.conf 
````
使用`swapoff -a`命令禁用所有节点的swap分区，并从`/etc/fstab`文件中删除或注释掉交换分区或交换文件
```bash
[root@k8s-master ~]# sed -i '/swap/ s/^/#/' /etc/fstab
[root@k8s-master ~]# swapoff -a
```

注意：如果您没有自己的dns服务器，请在主节点和工作节点上更新`/etc/hosts`文件

```bash
cat << EOF >> /etc/hosts
172.16.0.245 k8s-master
172.16.0.246 k8s-node1
172.16.0.247 k8s-node2
EOF
```

### 配置Kubernetes存储库

Kubernetes包在默认的CentOS 7和RHEL 7存储库中不可用，请使用下面的命令来配置它的包存储库

```bash
[root@k8s-master ~]# cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
[root@k8s-master ~]#
```

### 安装Kubeadm和Docker

配置软件包存储库后，运行下面的命令来安装kubeadm和docker软件包。

```bash
[root@k8s-master ~]# yum install kubeadm docker -y
```

启动并启用Kubectl和Docker服务

```bash
[root@k8s-master ~]# systemctl restart docker && systemctl enable docker
[root@k8s-master ~]# systemctl  restart kubelet && systemctl enable kubelet
```

### 使用"kubeadm init"初始化Kubernetes Master

运行下面的命令以初始化和设置kubernetes master。

```bash
[root@k8s-master ~]# kubeadm init \
  --apiserver-advertise-address=172.16.0.245 \
  --image-repository registry.aliyuncs.com/google_containers \
  --kubernetes-version v1.18.0 \
  --service-cidr=10.233.0.0/16 --pod-network-cidr=10.244.0.0/16
```

参数说明

```
--apiserver-advertise-address：表示apiserver对外的地址是什么，默认是0.0.0.0
--apiserver-bind-port：表示apiserver的端口是什么，默认是6443
--cert-dir：加载证书的目录，默认在/etc/kubernetes/pki
--config：配置文件
--ignore-preflight-errors：在预检中如果有错误可以忽略掉，比如忽略 IsPrivilegedUser,Swap.等
--kubernetes-version：指定要初始化k8s的版本信息是什么 
--pod-network-cidr ：指定pod使用哪个网段，默认使用10.244.0.0/16
--service-cidr：指定service组件使用哪个网段，默认10.96.0.0/12
```

上面命令的输出如下所示

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200530000416.png)

正如我们在输出中看到的那样，kubernetes master已成功初始化。 执行以下命令以将群集用作root用户。

```bash
[root@k8s-master ~]# mkdir -p $HOME/.kube
[root@k8s-master ~]# cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
[root@k8s-master ~]# chown $(id -u):$(id -g) $HOME/.kube/config
```

### 将pod网络部署到集群

尝试运行以下命令以获取集群和Pod的状态。

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200530002239.png)

要准备好群集状态并运行kube-dns状态，请部署Pod网络，以使不同主机的容器相互通信。 POD网络是工作节点之间的覆盖网络。

运行下面的命令来部署网络

```bash
[root@k8s-master ~]# export kubever=$(kubectl version | base64 | tr -d '\n')
[root@k8s-master ~]# kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$kubever"
serviceaccount "weave-net" created
clusterrole "weave-net" created
clusterrolebinding "weave-net" created
daemonset "weave-net" created
[root@k8s-master ~]#
```

现在运行以下命令以验证状态

```bash
[root@k8s-master ~]# kubectl  get node
NAME         STATUS   ROLES    AGE   VERSION
k8s-master   Ready    master   27m   v1.18.3
[root@k8s-master ~]# kubectl  get pods  --all-namespaces
NAMESPACE     NAME                                 READY   STATUS    RESTARTS   AGE
kube-system   coredns-7ff77c879f-fqrrb             1/1     Running   0          26m
kube-system   coredns-7ff77c879f-hwrv6             1/1     Running   0          26m
kube-system   etcd-k8s-master                      1/1     Running   0          27m
kube-system   kube-apiserver-k8s-master            1/1     Running   0          27m
kube-system   kube-controller-manager-k8s-master   1/1     Running   0          27m
kube-system   kube-proxy-sbssp                     1/1     Running   0          26m
kube-system   kube-scheduler-k8s-master            1/1     Running   0          27m
kube-system   weave-net-mm2xz                      2/2     Running   0          6m51s
[root@k8s-master ~]#
```

现在，我们将工作程序节点添加到Kubernetes主节点。

## 在每个工作节点上执行以下步骤

### 停用SELinux和防火墙服务

在禁用SELinux之前，将两个节点上的主机名分别设置为`k8s-node1`和`k8s-node2`

```bash
~]# hostnamectl set-hostname 'k8s-node{1 or 2}'
~]# exec bash
~]# setenforce 0
~]# sed -i --follow-symlinks 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/sysconfig/selinux
```

停用防火墙服务，创建/etc/sysctl.d/k8s.conf 文件，禁用所有节点的swap分区，参考主节点配置

### 在两个工作节点上配置Kubernetes存储库

Kubernetes包在默认的CentOS 7和RHEL 7存储库中不可用，请使用下面的命令来配置它的包存储库

```bash
 ~]# cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
```

### 在两个节点上安装kubeadm和docker软件包

```bash
[root@worker-node1 ~]# yum  install kubeadm docker -y
[root@worker-node2 ~]# yum  install kubeadm docker -y
```

启动并启用Docker服务

```bash
[root@worker-node1 ~]# systemctl restart docker && systemctl enable docker
[root@worker-node2 ~]# systemctl restart docker && systemctl enable docker
```

### 现在将工作程序节点加入主节点

要将工作程序节点连接到主节点，需要令牌。 只要kubernetes master初始化了，那么在输出中我们就会得到命令和令牌。 复制该命令并在两个节点上运行。

```bash
[root@k8s-node1 ~]# kubeadm  join 172.16.0.245:6443 --token m9fx3v.6hmjql19cxsonz6q \
> --discovery-token-ca-cert-hash sha256:e2039d59f36f8d444e03beb91d82b7be4868d4abfdf0bf28f655fa2eac1607fd
```

上面命令的输出如下所示

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200530131147.png)

```bash
[root@k8s-node2 ~]# kubeadm  join 172.16.0.245:6443 --token m9fx3v.6hmjql19cxsonz6q \
> --discovery-token-ca-cert-hash sha256:e2039d59f36f8d444e03beb91d82b7be4868d4abfdf0bf28f655fa2eac1607fd
```

输出如下所示

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200530132409.png)

现在使用kubectl命令从主节点验证节点状态

```bash
[root@k8s-master ~]# kubectl  get node
NAME         STATUS   ROLES    AGE     VERSION
k8s-master   Ready    master   12h     v1.18.3
k8s-node1    Ready    <none>   2m9s    v1.18.3
k8s-node2    Ready    <none>   2m12s   v1.18.3
[root@k8s-master ~]#
```

我们可以看到，主节点和工作节点都处于就绪状态。这表明kubernetes 1.8已经成功安装，并且我们已经成功连接了两个工作节点。现在我们可以创建pods和服务。

## 部署 Dashboard UI

### 安装步骤

默认情况下不会部署 Dashboard。可以通过以下命令部署：

```bash
[root@k8s-master ~]# curl -o dashboard-ui.yaml  https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
```

为了测试方便，我们将`Service`改成`NodePort`类型，注意 YAML 中最下面的 Service 部分新增一个`type=NodePort`

```yaml
kind: Service
apiVersion: v1
metadata:
  labels:
    k8s-app: kubernetes-dashboard
  name: kubernetes-dashboard
  namespace: kube-system
spec:
  ports:
    - port: 443
      targetPort: 8443
  type: NodePort
  selector:
    k8s-app: kubernetes-dashboard
```

然后直接部署新版本的`dashboard`即可

```bash
[root@k8s-master ~]# kubectl apply -f dashboard-ui.yaml
```

然后我们可以查看 dashboard 的外网访问端口

```bash
[root@k8s-master ~]# kubectl get svc -n kubernetes-dashboard
NAME                        TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)         AGE
dashboard-metrics-scraper   ClusterIP   10.233.219.28   <none>        8000/TCP        12h
kubernetes-dashboard        NodePort    10.233.71.1     <none>        443:30599/TCP   12h
```

然后直接访问集群中的任何一个节点 IP 加上上面的**30599**端口即可打开 dashboard 页面了

> 由于 dashboard 默认是自建的 https 证书，该证书是不受浏览器信任的，所以我们需要强制跳转就可以了。

默认 dashboard 会跳转到登录页面，我们可以看到 dashboard 提供了`Kubeconfig`和`token`两种登录方式

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200530143826.png)

### 身份认证

登录 dashboard 的时候支持 Kubeconfig 和token 两种认证方式，Kubeconfig 中也依赖token 字段，所以生成token 这一步是必不可少的。

#### 生成token

使用下面的yaml文件创建`admin-user`用户并赋予`cluster-admin`角色权限，然后就可以通过token 登陆dashbaord，这种认证方式本质实际上是通过Service Account 的身份认证加上Bearer token请求 API server 的方式实现，参考[创建示例用户](https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md)和[Kubernetes 中的认证](https://kubernetes.io/docs/admin/authentication/)。

> **重要信息：**在继续操作之前，请确保您知道自己在做什么。向仪表板的服务帐户授予管理员特权可能会带来安全风险。


```bash
[root@k8s-master ~]# vi dashboard-adminuser.yaml
```
第一部分：`ServiceAccount`中我们首先在命名空间`kubernets-dashboard`中创建名为`admin-user`的服务帐户。

第二部分：`ClusterRoleBinding`中将`admin-user`的服务帐户赋予`cluster-admin`角色权限

> 注意：Kubernetes版本之间，ClusterRoleBinding资源的apiVersion可能有所不同。 在Kubernetes v1.8之前，apiVersion是rbac.authorization.k8s.io/v1beta1。

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
  
---

apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```
使用`kubectl apply -f dashboard-adminuser.yaml`创建用户和赋权

```bash
[root@k8s-master ~]# kubectl apply -f dashboard-adminuser.yaml
```

#### 获取token

现在我们需要找到可以用来登录的令牌。执行以下命令

```
kubectl -n kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')
```

它应该打印如下内容

```bash
Name:         admin-user-token-44nrl
Namespace:    kubernetes-dashboard
Labels:       <none>
Annotations:  kubernetes.io/service-account.name: admin-user
              kubernetes.io/service-account.uid: dbe369d8-c1fa-4ce7-ac34-37f052952f66

Type:  kubernetes.io/service-account-token

Data
====
ca.crt:     1025 bytes
namespace:  20 bytes
token:      eyJhbGciOiJSUzI1NiIsImtpZCI6InZSVzNRYXN4bGoyVHdkNlVqOFk5LUxhWGRTRGwwaFZiaDkxUzFNZGRka2MifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLTQ0bnJsIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiJkYmUzNjlkOC1jMWZhLTRjZTctYWMzNC0zN2YwNTI5NTJmNjYiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6YWRtaW4tdXNlciJ9.VpEI6783d2ObE-7rR8virma7z_lZ9z8RCTVCTD7oVATKAjHk74yo_-UOicOKK1p9ARekJw_nMxC4fAJOzQeNUQ2LsZsQXFVZ_oJjOjnOpgUi0TjBz6QHKtManLXp0TO3MQjXc6IOErA9enhhN04q58Cc0vJG3OlH96EQjYpqH3hOOK7OguZkzsTvFYSH8agFdBgRL6LZjusdZ1GQozmX2oNNLwAz6o_Ddht-tpHzmnEKJQKO24H_tHVqvGxTw7ljqSfBWscsigLlO0J_U4IC4vL1ALVp8DLN7LhSOLgUiDMzCYtcjqbHMQBsQN7ozk5pIvAGS1kcdlQia3ZFJ8pOTA
```

#### 登录Dashboard

现在复制token并将其粘贴到登录屏幕上的Enter token字段中。

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200530144144.png)

点击登录按钮，正如你所见，您现在以管理员身份登录。

![](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/20200530144516.png)

---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/e481e229/  

