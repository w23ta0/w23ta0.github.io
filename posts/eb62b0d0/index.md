# 如何删除docker Images/Containers


docker images往往不知不觉就占满了硬盘空间，为了清理冗余的image，可采用以下方法：

1. 进入root权限
```bash
sudo su
```
2. 停止所有的container，这样才能够删除其中的images：
```bash
docker stop $(docker ps -a -q)
```
 如果想要删除所有container的话再加一个指令：
```bash
docker rm $(docker ps -a -q)
```
3. 查看当前有些什么images
```bash
docker images
```
4. 删除images，通过image的id来指定删除谁
```bash
docker rmi <image id>
```
 想要删除untagged images，也就是那些id为<None>的image的话可以用
```bash
docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
```
 要删除全部image的话
```bash
docker rmi $(docker images -q)
```


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/eb62b0d0/  

