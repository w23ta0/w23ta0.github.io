# Oracle中INSTR、SUBSTR和NVL的用法


**INSTR用法：**INSTR(源字符串, 要查找的字符串, 从第几个字符开始, 要找到第几个匹配的序号)

返回找到的位置，如果找不到则返回0. 默认查找顺序为从左到右。当起始位置为负数的时候，从右边开始查找。若起始位置为0，返回值为0。
```sql
SELECT INSTR(&#39;CORPORATE FLOOR&#39;, &#39;OR&#39;, 0, 1) FROM DUAL;  返回值为0

SELECT INSTR(&#39;CORPORATE FLOOR&#39;, &#39;OR&#39;, 2, 1) FROM DUAL;  返回值为2

SELECT INSTR(&#39;CORPORATE FLOOR&#39;, &#39;OR&#39;, 2, 2) FROM DUAL;  返回值为5

SELECT INSTR(&#39;CORPORATE FLOOR&#39;, &#39;OR&#39;, -1, 1) FROM DUAL; 返回值为14

SELECT INSTR(&#39;CORPORATE FLOOR&#39;, &#39;OR&#39;, -5, 1) FROM DUAL; 返回值为5
```

**SUBSTR用法：**SUBSTR( 源字符串, 查找起始位置, [ 长度 ] )

返回值为源字符串中指定起始位置和长度的字符串。
```sql
SELECT SUBSTR(&#39;This is a test&#39;, 0, 2) value from dual;  返回值Th

SELECT SUBSTR(&#39;This is a test&#39;, 1, 2) value from dual;  返回值Hi

SELECT SUBSTR(&#39;This is a test&#39;, -1, 2) value from dual; 返回值t

SELECT SUBSTR(&#39;This is a test&#39;, -2, 2) value from dual; 返回值st
```

**NVL用法：**NVL(eExpression1, eExpression2)

从两个表达式返回一个非 null 值。如果eExpression1的计算结果为null值，则 NVL( ) 返回eExpression2。如果eExpression1的计算结果不是null值，则返回eExpression1。eExpression1 和eExpression2可以是任意一种数据类型。如果eExpression1与eExpression2 的结果皆为 null值，则NVL( )返回NULL。
```sql
SELECT nvl(&#39;pos1&#39;,null) from dual; 返回值为pos1

SELECT nvl(null,&#39;pos2&#39;) from dual; 返回值为pos1

SELECT nvl(null,null) from dual;    返回值为null
```


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/2015/09/oracle%E4%B8%ADinstrsubstr%E5%92%8Cnvl%E7%9A%84%E7%94%A8%E6%B3%95/  

