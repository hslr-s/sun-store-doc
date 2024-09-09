# 授权平台相关

授权平台目前分为两个子平台，但是共用一个项目

- 商品支付平台
- 客户端授权服务端

其他
- docker仓库：enianteam-docker.pkg.coding.net/sun-panel/pay

## 开发编译
参考 `readme.md` 文件


## 部署
部署在宝塔面板，命令行进入目录 `/root/docker_compose/sun_pay`

每次启动需要修改 `docker-compose.yml` 的标签，防止缓存尽量不要使用 `latest`