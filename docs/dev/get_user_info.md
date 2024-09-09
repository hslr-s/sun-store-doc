# 获得用户信息


## 获得当前用户的基本信息

### 接口地址

`/v1/u/user/getCurrentUserInfo`

### Header 参数

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| Authorization | string | - | 登录获取的 `access_token` |


### 请求参数

请求方式：`POST`

参数说明：

- 无参数


### 响应数据：

参数说明：

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| username | string | - | 用户名 |
| password | string | - | 密码 (三次md5所得的值：`md5(md5(md5(password)))` )  |
| name | string | - | 昵称 |
| headImage | string | - | 头像 |
| role | int | - |`即将废弃` 角色 1 管理员 2 普通用户 |
| mail | string | - | 邮箱 |


完整示例：
```json
{
	"code": 0,
	"data": {
		"username": "xxxxx@qq.com",
		"password": "weddagkdfgkmfk58ddaw5223ddd12",
		"name": "红烧猎人11",
		"headImage": "",
		"role": 1,
		"mail": "xxxxx@mail.com"
	},
	"msg": "OK"
}
```
