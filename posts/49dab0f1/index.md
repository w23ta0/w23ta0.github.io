# 如何搭建Docker Registry本地私有仓库

通常情况下我们可以使用[Docker Hub](https://hub.docker.com/)作为docker image的仓库，但是有些场景下，我们希望能够有本地的仓库。比如： 
1. 代码中含有保密的信息，比如环境的账号，密码等等；

2. 代码本身作为公司的资产，不能对外公开，否则有法律风险。 

在创建本地仓库之前，请确保已经在目的机器上安装了Docker。这里我们使用docker容器运行registry镜像的方式，来创建registry。

一般情况下安装的docker已经自带了registry镜像，如果没有可以从docker hub上获取。

## 环境准备

### 关闭防火墙
```bash
systemctl stop firewalld.service
systemctl disable firewalld.service
```
### 关闭selinux
```bash
sed -i 's/SELINUX=.*/SELINUX=disabled/' /etc/sysconfig/selinux 
setenforce 0
```

## 搭建私有仓库
### 下载registry镜像

首先，在192.168.0.200机器上下载registry镜像

```bash
docker pull registry
```
### 基于私有仓库镜像运行容器

下载完之后我们通过该镜像启动一个容器

```bash
docker run -d -p 5000:5000 localregistry registry
```
其中 localregistry表示此容器的名称，registry表示了镜像本身。可以运行`docker ps`查看结果： 

```
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                    NAMES
afae402eb9ae        registry            "/entrypoint.sh /e..."   4 hours ago         Up 20 minutes       0.0.0.0:5000->5000/tcp   localregistry
```

默认情况下，会将仓库存放于容器的/tmp/registry目录下，这样如果容器被删除，则存放于容器中的镜像也会丢失，所以我们一般情况下会指定本地一个目录挂载到容器的/tmp/registry下，如下：

```bash
docker run -d -p 5000:5000 -v /opt/data/registry:/tmp/registry --name localregistry  registry
```
### 自动启动仓库

如果想让registry作为永久的可用仓库，应该在Docker machine重启或退出之后，设置registry仍然能够自动重启或保持使用状态。可以使用--restart=always达到此目的。 

```bash
docker run -d -p 5000:5000 --restart=always -v /opt/data/registry:/tmp/registry  --name localregistry  registry 
```

## 访问私有仓库

网上都用这个`curl http://127.0.0.1:5000/v1/search`,但是报`404 page not found`，后查证是v1版本的api查看方式，我们现在的版本是v2，所以用如下方法查看： 

```bash
curl -X GET http://127.0.0.1:5000/v2/_catalog
{"repositories":[]}   #私有仓库为空，没有提交新镜像到仓库中
```

[详细 curl 操作docker仓库](https://docs.docker.com/registry/spec/api/)


从Docker Hub获取nginx镜像 

```bash
docker pull nginx:alpine
```

接下来我们尝试将上面的 `nginx:alpine` 上传到本地的 registry 服务器， 首先为这个镜像定义一个新的标签：

```bash
docker tag nginx:alpine 127.0.0.1:5000/nginx:alpine
```

然后通过`docker images`查看，确认是否存在这个标签，输出如下： 

```bash
REPOSITORY                                        TAG                 IMAGE ID            CREATED             SIZE
127.0.0.1:5000/nginx                              alpine              0ae090dba3ab        3 months ago        54.3 MB
nginx                                             alpine              0ae090dba3ab        3 months ago        54.3 MB
```

现在可以上传这个镜像： 

```bash
docker push 127.0.0.1:5000/nginx:alpine
```

输出如下 ：

```bash
The push refers to a repository [127.0.0.1:5000/nginx]
4a8d9a67e458: Pushed 
c0ab80890b7f: Pushed 
d4930e247b49: Pushed 
9f8566ee5135: Pushed 
alpine: digest: sha256:bf63c02f35f7f8d0a95af4904d38ea17ef3f0c86e6b95d716200bdd9963f5ec5 size: 1154
```

现在来浏览 `http://127.0.0.1:5000/v2/_catalog` ， 将会看到这样的结果： 

```
{"repositories":["nginx"]}
```

表示已经有了 `nginx` 这个镜像， 如果要看这个镜像有什么版本， 需要输入地址 `http://127.0.0.1:5000/v2/nginx/tags/list` ， 结果如下： 

```bash
{"name":"nginx","tags":["alpine"]}
```

如果要在其它装了 docker 的电脑上获取这个镜像， 或者下载局域网其它 registry 服务器上的镜像， 有两个选择：

1. 配置 HTTPS 证书， 因为是内网分发， 没有必要去折腾证书。 如果需要的话， 可以参考这个[教程](https://docs.docker.com/registry/deploying/#running-a-domain-registry)来配置域证书或者这个[教程](https://docs.docker.com/registry/insecure/#using-self-signed-certificates)来配置自签名证书;
2. 参考这个[教程](https://docs.docker.com/registry/insecure/#deploying-a-plain-http-registry)修改 docker 的 `daemon.json` 文件， 配置 `insecure-registries` 选项。

---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/49dab0f1/  

