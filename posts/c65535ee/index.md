# 常用数据库驱动和JDBC URL


## Microsoft SQL Server
Microsoft SQL Server JDBC Driver （一般用来连接 SQLServer 2000）
驱动程序包名:`msbase.jar mssqlserver.jar msutil.jar`
驱动程序类名:`com.microsoft.jdbc.sqlserver.SQLServerDriver`
JDBC URL: `jdbc:microsoft:sqlserver://&lt;server_name&gt;:&lt;port&gt;`
默认端口1433，如果服务器使用默认端口则port可以省略

Microsoft SQL Server 2005 JDBC Driver
驱动程序包名:`sqljdbc.jar`
驱动程序类名: `com.microsoft.sqlserver.jdbc.SQLServerDriver`
JDBC URL: `jdbc:sqlserver://&lt;server_name&gt;:&lt;port&gt;`
默认端口1433，如果服务器使用默认端口则port可以省略


## Oracle
Oracle Thin JDBC Driver
驱动程序包名:`ojdbc14.jar`
驱动程序类名: `oracle.jdbc.driver.OracleDriver`
JDBC URL:
`jdbc:oracle:thin:@//&lt;host&gt;:&lt;port&gt;/ServiceName`
或
`jdbc:oracle:thin:@&lt;host&gt;:&lt;port&gt;:&lt;SID&gt;`

## IBM DB2
IBM DB2 Universal Driver Type 4
驱动程序包名:`db2jcc.jar db2jcc_license_cu.jar`
驱动程序类名: `com.ibm.db2.jcc.DB2Driver`
JDBC URL:` jdbc:db2://&lt;host&gt;[:&lt;port&gt;]/&lt;database_name&gt;`

IBM DB2 Universal Driver Type 2
驱动程序包名:`db2jcc.jar db2jcc_license_cu.jar`
驱动程序类名:` com.ibm.db2.jcc.DB2Driver`
JDBC URL:` jdbc:db2://&lt;host&gt;[:&lt;port&gt;]/&lt;database_name&gt;`

## MySQL
MySQL Connector/J Driver
驱动程序包名:`mysql-connector-java-x.x.xx-bin.jar`
驱动程序类名: `com.mysql.jdbc.Driver`
JDBC URL:` jdbc:mysql://&lt;host&gt;:&lt;port&gt;/&lt;database_name&gt;`
默认端口3306，如果服务器使用默认端口则port可以省略
MySQL Connector/J Driver 允许在URL中添加额外的连接属性
`jdbc:mysql://&lt;host&gt;:&lt;port&gt;/&lt;database_name&gt;?property1=value1&amp;property2=value2`

## Informix
Informix JDBC Driver
驱动程序包名:`ifxjdbc.jar`
驱动程序类名: `com.informix.jdbc.IfxDriver`
JDBC URL: `jdbc:informix-sqli://{&lt;ip-address&gt;|&lt;host-name&gt;}:&lt;port-number&gt;[/&lt;dbname&gt;]: INFORMIXSERVER=&lt;server-name&gt;`

## Sybase
Sybase Adaptive Server Enterprise JDBC Driver
驱动程序包名:`jconn2.jar 或jconn3.jar`
驱动程序类名: `com.sybase.jdbc2.jdbc.SybDriver (com.sybase.jdbc3.jdbc.SybDriver)
JDBC URL: jdbc:sybase:Tds:&lt;host&gt;:&lt;port&gt;`默认端口5000

Sybase Adaptive Server Anywhere or Sybase IQ JDBC Driver
驱动程序包名:`jconn2.jar` 或`jconn3.jar`
驱动程序类名: `com.sybase.jdbc2.jdbc.SybDriver (com.sybase.jdbc3.jdbc.SybDriver)`
JDBC URL:` jdbc:sybase:Tds:&lt;host&gt;:&lt;port&gt;?ServiceName=&lt;database_name&gt;`
默认端口2638

## PostgreSQL
PostgreSQL Native JDBC Driver
驱动程序包名:驱动程序类名: `org.postgresql.Driver`
JDBC URL: `jdbc:postgresql://&lt;host&gt;:&lt;port&gt;/&lt;database_name&gt;`
默认端口5432

## Teradata
Teradata Driver for the JDBC Interface
驱动程序包名:`terajdbc4.jar tdgssjava.jar gui.jar`
驱动程序类名: `com.ncr.teradata.TeraDriver`
JDBC URL:
Type 4: `jdbc:teradata://DatabaseServerName/Param1,Param2,…`
Type 3: `jdbc:teradata://GatewayServerName:PortNumber/DatabaseServerName/Param1,Param2,…`

## Netezza
Netezza JDBC Driver
驱动程序包名:`terajdbc4.jar tdgssjava.jar gui.jar`
驱动程序类名: `org.netezza.Driver`
JDBC URL:` jdbc:netezza://&lt;host&gt;:&lt;port&gt;/&lt;database_name&gt;`


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/c65535ee/  

