# 解决Kafka跨网络NAT传输问题




## 环境说明

客户端与Kafka服务端不在同一个网络区域，无法直接访问。需要通过NAT进行地址映射，将Kafka服务端10.0.0.182地址映射为172.25.0.190，从而客户端与服务端可以正常通信。

|Kafka客户端|NAT映射地址|Kafka服务端|
|--|--|--|
|172.16.0.233|172.25.0.190|10.0.0.182|

## 问题现象

防火墙策略已经开通，客户端可以ping通服务端映射后的地址`172.25.0.190`。也可以telnet通映射地址的9092端口`kafka服务端口`。但是从客户端向kafka服务端对应的topic发送消息，无法收到任何消息。

## Kafka安装


安装JDK
```bash
yum install java-1.8.0-openjdk
```

下载并解压kafka软件包

```bash
cd /opt
wget https://mirrors.tuna.tsinghua.edu.cn/apache/kafka/2.6.0/kafka_2.12-2.6.0.tgz
tar zxvf kafka_2.12-2.6.0.tgz
```

## 启动kakfa服务

```bash
cd kafka_2.12-2.6.0
bin/zookeeper-server-start.sh config/zookeeper.properties &
bin/kafka-server-start.sh config/server.properties  &
```

检查服务监听

```bash
[root@kafka-test ~]# ss -lntp
State       Recv-Q Send-Q                         Local Address:Port                                        Peer Address:Port              
LISTEN      0      128                                        *:22                                                     *:*                   users:(("sshd",pid=3231,fd=3))
LISTEN      0      50                                        :::40881                                                 :::*                   users:(("java",pid=6647,fd=105))
LISTEN      0      50                                        :::46162                                                 :::*                   users:(("java",pid=4152,fd=106))
LISTEN      0      128                                       :::22                                                    :::*                   users:(("sshd",pid=3231,fd=4))
LISTEN      0      50                                        :::9092                                                  :::*                   users:(("java",pid=4513,fd=122))
LISTEN      0      50                                        :::2181                                                  :::*                   users:(("java",pid=4152,fd=117))
```

## 本机访问测试

没有发现问题

```bash
#发送消息
bin/kafka-console-producer.sh --broker-list 172.25.0.190:9092 --topic test1  //注意这里不能在用localhost
#查看消息
bin/kafka-console-consumer.sh --bootstrap-server 172.25.0.190:9092 --topic test1 
```

## 通过客户端连接

```bash
#通过客户端发送消息
bin/kafka-console-producer.sh --broker-list 172.25.0.190:9092 --topic test1
```

错误信息如下：

```verilog
[2020-10-30 17:04:18,795] WARN [Producer clientId=console-producer] Error connecting to node kafka-test:9092 (id: 0 rack: null) (org.apache.kafka.clients.NetworkClient)
java.net.UnknownHostException: kafka-test: Name or service not known
	at java.net.Inet6AddressImpl.lookupAllHostAddr(Native Method)
	at java.net.InetAddress$2.lookupAllHostAddr(InetAddress.java:928)
	at java.net.InetAddress.getAddressesFromNameService(InetAddress.java:1323)
	at java.net.InetAddress.getAllByName0(InetAddress.java:1276)
	at java.net.InetAddress.getAllByName(InetAddress.java:1192)
	at java.net.InetAddress.getAllByName(InetAddress.java:1126)
	at org.apache.kafka.clients.ClientUtils.resolve(ClientUtils.java:110)
	at org.apache.kafka.clients.ClusterConnectionStates$NodeConnectionState.currentAddress(ClusterConnectionStates.java:403)
	at org.apache.kafka.clients.ClusterConnectionStates$NodeConnectionState.access$200(ClusterConnectionStates.java:363)
	at org.apache.kafka.clients.ClusterConnectionStates.currentAddress(ClusterConnectionStates.java:151)
	at org.apache.kafka.clients.NetworkClient.initiateConnect(NetworkClient.java:958)
	at org.apache.kafka.clients.NetworkClient.access$600(NetworkClient.java:74)
	at org.apache.kafka.clients.NetworkClient$DefaultMetadataUpdater.maybeUpdate(NetworkClient.java:1131)
	at org.apache.kafka.clients.NetworkClient$DefaultMetadataUpdater.maybeUpdate(NetworkClient.java:1019)
	at org.apache.kafka.clients.NetworkClient.poll(NetworkClient.java:542)
	at org.apache.kafka.clients.producer.internals.Sender.runOnce(Sender.java:325)
	at org.apache.kafka.clients.producer.internals.Sender.run(Sender.java:240)
	at java.lang.Thread.run(Thread.java:748)
```

## 解决方法

发现一直卡在那里，最终以超时异常退出，或者报broker找不到的错误。如果返回的是IP地址，那么肯定是无法访问的，这就是为什么在kafka的配置文件中不推荐使用IP地址的原因。现在返回的是主机名，很简单，在客户端的hosts文件中添加：

```bash
172.25.0.190  kafka-test
```





---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/3a642ee8/  

