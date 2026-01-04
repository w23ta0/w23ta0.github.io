# 如何成为一个通晓多种编程语言的程序员

学习一门新的语言是一种冒险。我总是热衷于尝试新的东西——学习新的语法，了解不同的模式，乃至彻底改变思维方式。不幸的是，许多开发人员对此不以为然，甚至可能是深恶痛绝的——学习新语言，就得走出舒适区，花时间花精力来学习新的理念和方法。

这段日子，我每天都要用大约5种不同的语言来写不同的项目！
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524445676784sve657ec.png?imageslim)


## 我应该先学哪种语言？
有关这方面的讨论真可谓数不胜数。很多刚进入编程社区的初学者，都会问这个问题，简直就是前赴后继。有些人建议先学不费力的，如Python和Ruby，也有的人认为应该先学例如C、C++和GO这类难一些的低层次的内容。我要说的是我们在选择新的语言之前，应该注意以下几个要点。

## 类型系统
从我的经验和先前的学习路径看，这是最重要的概念之一。我很庆幸我一开始学的是C，接着尝试了C++，一段时间之后，我又投入了Java的怀抱。然后是Scala，以及现在我开始玩Ruby。同时，我对Objective-C、Python、甚至是OCaml也有所涉及。哦，对了，最近我正在捣鼓Swift和CoffeeScript。

如果我一开始学的是JavaScript、Python或Ruby，那么后面去理解什么是类型和变量就会非常困难。理解静态和动态以及弱类型和强类型系统之间的区别，对于领悟语言的工作原理是至关重要的。我无法想象，如果我一开始不能掌控类型，那么后面涉及到的声明与定义，以及汇编与解释之间的差异，会是让人多么头大的一件事。

不过，也有很多开发人员希望能有立竿见影的效果：既想快速看到结果，又不愿意过多地了解细节。他们喜欢接轨新的应用程序。最好是不用动脑子的语言，碰到这样的他们最开心了。因为在他们眼中，掌握 integer、string和boolean是学习编程的超级大障碍。最好能够毋须分辨类、对象和方法，直接写代码：

```python
scala> println(“Hello World!”)
Hello World!
>>> print "Hello World!"
Hello World!
2.2.1 :001 > puts "Hello World!"
Hello World!
```
不可否认这种途径能够给人信心，让人觉得自己学到了新的东西。

首先，请明确你属于哪种类型，摆正自己的位置。你想要探究隐藏起来的工作原理吗，喜欢深入研究本地执行吗？愿意去理解语言结构吗？又或者你只在乎能有快速的结果，不想了解虚拟机和编译工作，并且语言内部机制对你而言也一点都不重要？

## 从自己的利益角度考虑
你可能需要处理哪些数据？你打算写复杂的业务系统还是相对简单的CRUD创业公司？请基于可能会让自己感兴趣的内容来确定工作领域。

所以，如果你确定你想要去企业工作，那么你可以试试Java或者.NET。如果你倾向于黑客并高度注重安全问题，那么不妨学习C/C ++或Bash。如果你梦想成为一名Web开发人员，那么先掌握PHP、JavaScript或Ruby吧。如果你想要编写一些机器、机器人、汽车或其他电子方面的程序——也行，先学C ++或Python吧。你喜欢捣鼓移动设备？那么Java、Swift或C＃就应该是你的首选。如果你喜欢数学和算法，那么Lua、Erlang或R就很适合你。等等等等，不胜枚举。总之——一切取决于你的目的和爱好。
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524445659619ru9kxu8v.png?imageslim)


## 语言内部机制
你有组织化的堆栈内存吗？你在程序中传递变量时使用引用类型还是只使用值类型？你是否利用指针和析构函数来控制对象的生命周期？你是自行清理存储器还是使用相关的垃圾收集器？你是否计算和跟踪引用类型和子类？

这些都是我们平时不会关心的问题。但是有时候，它们却是一些你不得不处理的概念，所以理解内部机制很重要。虽然现在你会觉得这些概念很复杂，理解起来很难，因为终有一天，你会庆幸自己现在的选择，有道是，书到用时方恨少，不要到用的时候追悔莫及。

## 我应该学习哪些语言？
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524445621122qgtwxxuu.png?imageslim)

## 社区——StackOverflow、Reddit
下面是一些Reddit上面有关于通用编程的内容：
- http://www.reddit.com/r/programmers
- http://www.reddit.com/r/cscareerquestions/
- http://www.reddit.com/r/learnprogramming/
- http://www.reddit.com/r/programming
你也点击 http://stackoverflow.com/tags 或 http://www.reddit.com/subreddits 在特定的语言社区中寻求帮助。许多乐于助人的高手就在那里等你。

## 函数库
函数库之所以重要是因为它能让你有效利用现有资源，而不必再“重新发明轮子”。我们通常需要解决特定问题，实现业务规则，处理重要进程，从数组中找出所需元素，利用给定字符串，过滤特定集合等等。最好语言本身或者第三方函数库能够提供一些可以加快开发进程的实用程序、辅助工具和数据结构。

下面是一些不同语言的社区函数库代码仓库：
- iOS：https://cocoapods.org/
- Android：https://android-arsenal.com/
- Java、Scala、Groovy：https://search.maven.org/
- Haskell：https://hackage.haskell.org/packages/
- GO：http://golang.org/pkg/
- Ruby：https://rubygems.org/
- Python：https://pypi.python.org/pypi
- .NET：https://www.nuget.org/packages
- JavaScript：https://www.npmjs.com/
保持对第三方支持可扩展性、开放性和易于集成等方面的审查。

## 从创造者/维护人员那儿获得文档和支持
你阅读文档吗？文档是不是易于理解的，全面的，最新的？更新频率如何？有多少维护人员，是否也在社区中？从文档中你能提取多少信息？你能否轻松驾驭不同的部分？

这是一个非常有效的观察报告。只要有创造者提供有助于学习和理解语言的文档，其他的其实无所谓。例如，Ruby就有不少提供文档的网站，如：https://www.omniref.com/，http://ruby-doc.org/。 Scala也有相当不错的API说明书http://www.scala-lang.org/api/current/。

语言的创造者对待社区的态度也很重要。他能否像Ruby创始人Matz一样愿意接受和倾听反馈？他是否像Scala之父Martin Odersky一样有着纯粹的经营方针？又或者他是否会像Clojure的发明者一样鼓励社区发展？

## 资源和实例——博客、GitHub代码仓库
下面是一些可作为起步指导的好例子：
- http://docs.scala-lang.org/overviews/
- https://www.ruby-lang.org/en/documentation/
- https://developer.apple.com/library/ios/documentation/Swift/Conceptual/-Swift_Programming_Language/index.html
- http://arcturo.github.io/library/coffeescript/,http://autotelicum.github.io/Smooth-CoffeeScript/
至于网上教程，下面这些是很不错的门户网站，如：
- https://www.codeschool.com/
- http://www.codecademy.com/
- http://www.pluralsight.com/
- http://teamtreehouse.com/
- http://tutsplus.com/
- http://www.lynda.com/
- https://www.udemy.com/
不妨去看一看。

## 资金
没错，前面我们谈论了思想、激情，以及一些抽象的概念，但是最后所有这一切都归结到资金，也就是金钱。在选择语言之前最好先搞清楚哪种薪酬/需求相对比较高。当然，你也可以纯粹是因为好玩而选择它。新事物总在不断地出现和发展，虽然这可以拓宽我们的视野，但学一些有用的东西还是非常重要的。在这种情况下你有以下两种解决方案：

- 学习当前市场上最流行/需求量最大的语言/技术/框架。这能确保你不但能找到工作，还能获得优渥的报酬。
- 按照自己的观点学习。这可能有点难以想象。因为谁也不能打包票说下一个流行的就一定是这种编程语言。试想一下，10年前你要是说Ruby会成为当前社会的宠儿，谁会相信。还有Scala和GO，没人知道之后，比如说，5年以后它们会发生什么变化。如果你现在选择了它们——那么，要么你将成为高薪专家，因为以后会变得非常普及；要么你只是掌握了一种没用的，被淘汰的语言。
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524445552719wqji9ayl.png?imageslim)
![paste image](https://w23ta0-blog.oss-cn-hongkong.aliyuncs.com/blog/1524445576787h0baw8an.png?imageslim)
点击这里查看市场分析：https://gooroo.io/analytics。

## 我要不要一次学习多种编程语言？
刚开始——不要这么做。从长远来看——是的，你应该学习多种编程语言。

当你刚踏上编程之旅时，你应该只专注于一种语言。你需要掌握所有的概念，全神贯注于学习某个特定区域。

当你已经是一个有一定经验的程序员，那情况就有所不同了。由于你已经知道内部机制和程序的工作原理，这时你需要做的就是学习新的语法和新的范式，因为很多概念在不同语言里面都是相通的。

万事开头难，一旦正确起步之后，就会像滚雪球一样越滚越顺。

## 总结
那么归根究底我们为什么要学习新的语言呢？因为没有哪种工具是适用于所有目标的。而我们有着不同的项目，不同的问题，不同的体系结构。也许在启用新的应用程序和选择技术堆栈之前，我们首先应该考虑的是解决实际的业务问题，然后才能选择出最切合实际的最佳工具。

不要从工具和兴趣爱好入手。要从问题着手，然后找出解决方案。只有在了解这些的基础上，你才能选出合适的语言，帮助你用最有效的方式实现业务规则。

当然，如果你通晓多种编程语言，那你肯定能更快，更高效。因为你总是可以挑选出完美的工具，用最经济的方式解决问题，并提供最有力的实现。

## 书籍
下面这些是我认为对大家学习初级概念很有帮助的书。

 [《Seven Languages in Seven Weeks: A Pragmatic Guide to Learning Programming Languages](https://pragprog.com/book/btlang/seven-languages-in-seven-weeks)》
[《Seven More Languages in Seven Weeks: Languages That Are Shaping the Future》](https://pragprog.com/book/7lang/seven-more-languages-in-seven-weeks)

## 工具
下面这些工具可以用于比较编程语言——不但包含语法，还包括社会普及程度和社会支持程度。
- http://learnXinYminutes.com/
- http://HyperPolyglot.org/
- http://RosettaCode.org/wiki/Rosetta_Code
- http://githut.info/

## 资源
下列资料展示了学习不同的语言和新架构的方法和原理。
- https://www.youtube.com/watch?v=lkVI4JmnMAM
- https://www.youtube.com/watch?v=FPBVxpl8NMo
- http://www.slideshare.net/squixy/scala-vs-ruby-45694031
最后，如有不同意见，欢迎指正。


---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/fdca3c9c/  

