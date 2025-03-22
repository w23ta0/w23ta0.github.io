# 使用 CSS 实现标题自动编号

近几天在学习 HTML5 与 CSS3 时，偶然看到了 CSS 中自动为标题添加编号的特性。仔细阅读过 W3Schools 上提供的文档之后，试验了一下，确实非常好用。从此不需再花费精力校对标题编号，可以将时间集中到真正需要做的事情，也避免了手动编号出错的窘态。

这篇博文整理了我搜集的相关知识点，方便希望详细了解的人查看。

## 涉及内容
首先介绍一下本文涉及到的相关 CSS 知识点。其中用到的 CSS 伪元素和属性皆基于 CSS2.1 标准，所以基本不需要担心浏览器的兼容性问题。如果你对此还不够放心，可以在不同浏览器中打开文末给出的样例进行测试。

### before 伪元素选择器
`before`伪元素选择器用于在某个元素之前插入一些内容。所插入的内容由`content`属性指定，可以是字符串、图片、音频甚至视频文件等。

与之对应的，还有`after`伪元素，用于在某个元素的后面插入一些内容。

其用法如：
```css
/* insert a word before anchor */
a:before {
    content: &#39;goto: &#39;
}
/* add a icon after an url end by mp4*/
a[href$=mp4]:after {
    content: url(moive.png)
}
```

### counter-increment 属性
`counter-increment`属性用于递增计数器，该属性可接受的输入有：
其中值的意义为：

- `none`：不递增计数器；
- `id`：需递增的计数器ID；
- `initial`：递增的步长，默认为 1；
- `inherit`：从父元素继承。

### counter-reset 属性
`counter-reset`属性用于重置计数器，比如在每篇文章开始前将计数器重置为 0。该属性可接受的输入有：

```css
counter-reset: none|name-number|initial|inherit;
```
其中值的意义为：

- `none`：不重置计数器；
- `name-number`：需重置的计数器ID；
- `initial`：重置的值，默认为 0；
- `inherit`：从父元素继承。

## 示例代码
以下面的网页作为示例：

```html
&lt;!doctype html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&#34;utf-8&#34;&gt;
        &lt;title&gt;自动编号演示&lt;/title&gt;
        &lt;link rel=&#34;stylesheet&#34; href=&#34;counter.css&#34;&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h1&gt;文章大标题&lt;/h1&gt;
        &lt;h2&gt;前言&lt;/h2&gt;
        &lt;h2&gt;数据准备&lt;/h2&gt;
        &lt;h3&gt;观测数据准备&lt;/h3&gt;
        &lt;h3&gt;表文件准备&lt;/h3&gt;
        &lt;h2&gt;参数设置&lt;/h2&gt;
        &lt;h3&gt;高度角&lt;/h3&gt;
        &lt;h3&gt;模型设置&lt;/h3&gt;
        &lt;h2&gt;开始解算&lt;/h2&gt;
        &lt;h2&gt;成果查看&lt;/h2&gt;
    &lt;/body&gt;
&lt;/html&gt;
```
其中引入的 counter.css 中的代码为：
```css
/* reset h2 counter to -1 when meet a h1 element */
h1 {
    counter-reset: h2Counter -1;
}
/* insert number before h2 element */
h2:before {
    content: counter(h2Counter)&#39;. &#39;
}
/* increase h2 counter and reset h3 counter when meet a h2 element */
h2 {
    counter-increment: h2Counter;
    counter-reset: h3Counter;
}
h3:before {
    content: counter(h2Counter) &#39;.&#39; counter(h3Counter) &#39; &#39;
}
h3 {
    counter-increment: h3Counter;
}
```
将以上两块代码分别保存为 counter.html 和 counter.css，确保这两个文件位于同一目录内，然后使用浏览器打开其中的 counter.html 文件即可预览效果。

---

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/283c0c55/  

