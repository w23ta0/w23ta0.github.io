# 实时查看linux网卡流量


将下列脚本保存为可执行脚本文件，比如叫traff.sh。☺️
```bash
#!/bin/bash
while [ &#34;1&#34; ]
do
eth=$1
RXpre=$(cat /proc/net/dev | grep $eth | tr : &#34; &#34; | awk &#39;{print $2}&#39;)
TXpre=$(cat /proc/net/dev | grep $eth | tr : &#34; &#34; | awk &#39;{print $10}&#39;)
sleep 1
RXnext=$(cat /proc/net/dev | grep $eth | tr : &#34; &#34; | awk &#39;{print $2}&#39;)
TXnext=$(cat /proc/net/dev | grep $eth | tr : &#34; &#34; | awk &#39;{print $10}&#39;)
clear
echo -e &#34;\t RX `date &#43;%k:%M:%S` TX&#34;
RX=$(($RXnext-$RXpre))
TX=$(($TXnext-$TXpre))

if [[ $RX -lt 1024 ]];then
RX=&#34;${RX}B/s&#34;
elif [[ $RX -gt 1048576 ]];then
RX=$(echo $RX | awk &#39;{print $1/1048576 &#34;MB/s&#34;}&#39;)
else
RX=$(echo $RX | awk &#39;{print $1/1024 &#34;KB/s&#34;}&#39;)
fi

if [[ $TX -lt 1024 ]];then
TX=&#34;${TX}B/s&#34;
elif [[ $TX -gt 1048576 ]];then
TX=$(echo $TX | awk &#39;{print $1/1048576 &#34;MB/s&#34;}&#39;)
else
TX=$(echo $TX | awk &#39;{print $1/1024 &#34;KB/s&#34;}&#39;)
fi

echo -e &#34;$eth \t $RX $TX &#34;
done
```
1. 本脚本可自定义欲查看接口，精确到小数，并可根据流量大小灵活显示单位。
2. 此脚本的采集间隔为1秒。
3. 此脚本不需要额外再安装软件，可在急用情况下应付一下，比如临时想看一下是否有流量通过，大概为多少等。
4. 一些流量查看软件由于计算的精确度不同，所以与此脚本显示的数值不可能一致，此脚本的显示结果与du meter对比过，相差很小。还有就是传输工具本身显示的传输速度并不准确。


用法为：

1. `chmod &#43;x ./traff.sh` 将文件改成可执行脚本。
2. `./traff.sh eth0`即可开始监看接口eth0流量，按`ctrl&#43;c`退出。


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/2013/01/%E5%AE%9E%E6%97%B6%E6%9F%A5%E7%9C%8Blinux%E7%BD%91%E5%8D%A1%E6%B5%81%E9%87%8F/  

