# 实时查看linux网卡流量


将下列脚本保存为可执行脚本文件，比如叫traff.sh。☺️
```bash
#!/bin/bash
while [ "1" ]
do
eth=$1
RXpre=$(cat /proc/net/dev | grep $eth | tr : " " | awk '{print $2}')
TXpre=$(cat /proc/net/dev | grep $eth | tr : " " | awk '{print $10}')
sleep 1
RXnext=$(cat /proc/net/dev | grep $eth | tr : " " | awk '{print $2}')
TXnext=$(cat /proc/net/dev | grep $eth | tr : " " | awk '{print $10}')
clear
echo -e "\t RX `date +%k:%M:%S` TX"
RX=$(($RXnext-$RXpre))
TX=$(($TXnext-$TXpre))

if [[ $RX -lt 1024 ]];then
RX="${RX}B/s"
elif [[ $RX -gt 1048576 ]];then
RX=$(echo $RX | awk '{print $1/1048576 "MB/s"}')
else
RX=$(echo $RX | awk '{print $1/1024 "KB/s"}')
fi

if [[ $TX -lt 1024 ]];then
TX="${TX}B/s"
elif [[ $TX -gt 1048576 ]];then
TX=$(echo $TX | awk '{print $1/1048576 "MB/s"}')
else
TX=$(echo $TX | awk '{print $1/1024 "KB/s"}')
fi

echo -e "$eth \t $RX $TX "
done
```
1. 本脚本可自定义欲查看接口，精确到小数，并可根据流量大小灵活显示单位。
2. 此脚本的采集间隔为1秒。
3. 此脚本不需要额外再安装软件，可在急用情况下应付一下，比如临时想看一下是否有流量通过，大概为多少等。
4. 一些流量查看软件由于计算的精确度不同，所以与此脚本显示的数值不可能一致，此脚本的显示结果与du meter对比过，相差很小。还有就是传输工具本身显示的传输速度并不准确。


用法为：

1. `chmod +x ./traff.sh` 将文件改成可执行脚本。
2. `./traff.sh eth0`即可开始监看接口eth0流量，按`ctrl+c`退出。


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/3b1b6dcd/  

