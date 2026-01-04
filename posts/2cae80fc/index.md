# Openstackclient命令执行报错

在执行时init-runonce 时，报错误如下:

```bash
Traceback (most recent call last):
  File "/usr/bin/openstack", line 7, in <module>
    from openstackclient.shell import main
  File "/usr/lib/python2.7/site-packages/openstackclient/shell.py", line 23, in <module>
    from osc_lib import shell
  File "/usr/lib/python2.7/site-packages/osc_lib/shell.py", line 33, in <module>
    from osc_lib.cli import client_config as cloud_config
  File "/usr/lib/python2.7/site-packages/osc_lib/cli/client_config.py", line 18, in <module>
    from openstack.config import exceptions as sdk_exceptions
  File "/usr/lib/python2.7/site-packages/openstack/__init__.py", line 17, in <module>
    import openstack.connection
  File "/usr/lib/python2.7/site-packages/openstack/connection.py", line 166, in <module>
    from openstack.cloud import openstackcloud as _cloud
  File "/usr/lib/python2.7/site-packages/openstack/cloud/openstackcloud.py", line 35, in <module>
    import dogpile.cache
  File "/usr/lib/python2.7/site-packages/dogpile/cache/__init__.py", line 1, in <module>
    from .region import CacheRegion, register_backend, make_region  # noqa
  File "/usr/lib/python2.7/site-packages/dogpile/cache/region.py", line 15, in <module>
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

> Author: [w23ta0](https://github.com/w23ta0)  
> URL: https://w23ta0.github.io/posts/2cae80fc/  

