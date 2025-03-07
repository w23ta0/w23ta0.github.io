# Openstackclient命令执行报错

在执行时init-runonce 时，报错误如下:

```bash
Traceback (most recent call last):
  File &#34;/usr/bin/openstack&#34;, line 7, in &lt;module&gt;
    from openstackclient.shell import main
  File &#34;/usr/lib/python2.7/site-packages/openstackclient/shell.py&#34;, line 23, in &lt;module&gt;
    from osc_lib import shell
  File &#34;/usr/lib/python2.7/site-packages/osc_lib/shell.py&#34;, line 33, in &lt;module&gt;
    from osc_lib.cli import client_config as cloud_config
  File &#34;/usr/lib/python2.7/site-packages/osc_lib/cli/client_config.py&#34;, line 18, in &lt;module&gt;
    from openstack.config import exceptions as sdk_exceptions
  File &#34;/usr/lib/python2.7/site-packages/openstack/__init__.py&#34;, line 17, in &lt;module&gt;
    import openstack.connection
  File &#34;/usr/lib/python2.7/site-packages/openstack/connection.py&#34;, line 166, in &lt;module&gt;
    from openstack.cloud import openstackcloud as _cloud
  File &#34;/usr/lib/python2.7/site-packages/openstack/cloud/openstackcloud.py&#34;, line 35, in &lt;module&gt;
    import dogpile.cache
  File &#34;/usr/lib/python2.7/site-packages/dogpile/cache/__init__.py&#34;, line 1, in &lt;module&gt;
    from .region import CacheRegion, register_backend, make_region  # noqa
  File &#34;/usr/lib/python2.7/site-packages/dogpile/cache/region.py&#34;, line 15, in &lt;module&gt;
    from decorator import decorate
ImportError: cannot import name decorate
```

按照官方教程操作，openstack已经是搭建成功。 

执行openstack命令也报上述错误，之前提示安装成功了，于是卸载pip uninstall命令，再重新安装，问题依旧。 

最后综合分析，该问题是openstackclient出的问题，可能是相关依赖没有安装，于是执行

```bash
pip install --ignore-installed  python-openstackclient 
```

 问题解决！ 

---

> 作者: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/20181214-openstackclient%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E6%8A%A5%E9%94%99/  

