# 正则表达式学习

最近在看鸟哥 Linux，看到正则表达式这块，以前看到这些恐怖的字符总是觉得恶心，今天就咬牙系统的学习了下正则表达式。然后有了这篇笔记。主要总结正则表达式的一些关键知识点。



- 字面值：`a b c d 1 2 3 4` 等等。
- 字符类：`. [abc] [a-z] \d \w \s`
		-  `. `表示“任何字符”
		- `[abc] `括号表示“找到集合里任意一个字符”。
		- `\d` 表示“一个数字”，等同于[0-9]
		- `\w `表示“一个单词字符”，等同于[0-9A-Za-z_]
		- `\s `表示“一个空格，tab，回车或一个换行符”
		- 否定字符类：`[^abc] \D \W \S`
- 乘法器：`{4} {3,16} {1,} ? * +`
	- `{3,16}` 表示找到重复 3 到 16 个前一个正则字符
	- `?` 表示“没有或一个”
	- `*` 表示“没有或多个”
	- `+` 表示“一个或多个”
	- 乘法器是贪婪的除非你在之后使用 ? , 即优先找到最长的
- 分支和组合：` (Septem|Octo|Novem|Decem)ber`
	- 管道符号 `| `表示“或”
	- 圆括号表示组合 ，比如 在一周中找到一天，使用` (Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)day`。
- 词、行和文本边界：
	- `\b `表示词边界
	- `^` 表示行开始
	- `$` 表示行结束
	- `^$` 表示的就是空白行了
- 反向捕获组：`\1 \2 \3` 等等。捕获组从左到右进行编号，只要计算左圆括号。（在替换表达式和匹配表达式中同时生效）
	- 比如有一段字符，我们需要前面的横杠去掉，尾巴的数字去掉， 英文句号换成中文顿号
	```
	-1.文章标题1
	-2.文章标题2
	-3.文章标题3
	-4.文章标题4
	-5.文章标题5
	```

则可以使用正则表达式 `-(\d{1,})\.(.*)\d` 来匹配。然后使用 \1、\2 来替换。

- 向后引用： 在同样的表达式中引用同一个捕获组。
	- 表达式 `(xi)\1(ha)\2` 能匹配 `xixihaha`
- 元字符列表：`. \ [ ] { } ? * + | ( ) ^ $`
- 字符类中使用到元字符列表：`[ ] \ - ^`
- 你总是可以使用反斜杆对元字符进行转义：`\`

参考资料：

[RegExr](http://www.regexr.com/)：一款在线学习、构建和测试正则表达式的工具
[TRY REGEX](http://tryregex.com/)：交互式正则表达式的教学网站
[55分钟学会正则表达式](http://doslin.com/learn-regular-expressions-in-about-55-minutes/)：很好的入门文章





---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/469df0ac/  

