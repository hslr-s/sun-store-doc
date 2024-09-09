# 三方应用授权登录

通过该页面的相关 API 接口可以实现三方平台的联合授权登录、api 调用等，此模式是基于 oAuth2.0 标准修改编写。


## 获取 code 值 {getCode}

### 接口地址

`/oauth2/v1/authorize?client_id=CLIEND_ID&redirect_uri=REDIRECT_URI&response_type=code`

### 请求参数

请求方式：`GET`

参数说明：

| 参数 | 类型 | 示例 | 说明 | 
| --- | --- | --- | --- |
| client_id | string | `ioernmfkf` | 应用的唯一标识（在 [三方应用授权]() 申请） |
| redirect_uri | string | /oauth2/login | 回调地址 |
| response_type | string | `code` | 响应方式：code（固定） |

### 响应数据：

完整示例：
```json
{
	"code": 0,
	"data": {
		"code": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IiIsImlkIjoxLCJhcGlUb2tlbiI6IlB5ZktoeHU1M0lyVHFyRzFVUCIsInNzb1Nlc3Npb24iOiJ5bk9yejhyNnpLV1RKTFhOa1UiLCJleHAiOjE3MTYyNTg4NTB9.uslUaUR9aPbCB-GTGrvos_Bj3d4Xh8WUTX6BeW9Jj0M"
	},
	"msg": "OK"
}
```


## 通过 code 获取 access_token

code 获取 [请参考](#getCode)

### 接口地址

`/oauth2/v1/token`

### 请求参数

请求方式：`POST`

参数说明：

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| grant_type | string | authorization_code | 固定值|
| client_id | string | test_appid | 应用的唯一标识|
| client_secret | string |-| 秘钥|
| redirect_uri | string| -| 回调地址|
| code | string | -|code值|



请求示例:
```json
{
	"grant_type":"authorization_code",// 固定
	"client_id": "test_appid",
	"client_secret": "ZXhhbXBsZTEyMzpwYXNzMnQutWIwbWQ0aGlkOD0",
	"redirect_uri":"http://127.0.0.1",
	"code": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlUb2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeWFXUWlPakVzSW1Gd2FWUnZhMlZ1SWpvaU1YbFlVbFZCUkZoMFVTSXNJbU5zYVdWdWRFbGtJam9pZEdWemRGOWhjSEJwWkNJc0ltVjRjQ0k2TVRjeE5qUTRNRE0yT0gwLnpkTXVWOGpHc21fXzQzeDdjaEdIYk5yZHpqYXJwQnp1c0dyZEZVV0pJSDAiLCJjbGllbnRJZCI6IiIsInVzZXJJZCI6MCwiZXhwIjoxNzE2NDgwMzY4fQ.PFgX0lctVMu8uwxhXZ9hQS76Sqx-w1M1PiPehMqCWEM"
}
```


### 响应数据：

参数说明：

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| access_token | string | - | 授权令牌 |
| scope | string | - | 授权范围 |
| openid | string | - | 授权用户的唯一标识 `即将废弃` |
| userid | int | - | 授权用户的唯一标识 `即将废弃` |


完整示例：
```json
{
	"code": 0,
	"data": {
		"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImFwaVRva2VuIjoiMXlYUlVBRFh0USIsImNsaWVudElkIjoidGVzdF9hcHBpZCIsImV4cCI6MTcxNjQ4MDM2OH0.zdMuV8jGsm__43x7chGHbNrdzjarpBzusGrdFUWJIH0",
		"openid": "k6j5t5bh12dz08n",
		"userid": 1,
		"scope": ""
	},
	"msg": "OK"
}
```


## 通过账号密码登录

### 接口地址

`/oauth2/v1/token`

### 请求参数

请求方式：`POST`

参数说明：

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| grant_type | string | `password` | 固定值|
| client_id | string | test_appid | 应用的唯一标识|
| client_secret | string |-| 秘钥|
| username | string | -| 账号 |
| password | string | -| 密码 |
| state | string | -| `可选` 无实际用处 |
| scope | string | -| `可选` 无实际用处 |


请求示例:
```json
{
	"grant_type": "password",
	"client_id": "test_appid",
	"client_secret": "ZXhhbXBsZTEyMzpwYXNzMnQutWIwbWQ0aGlkOD0",
	"username": "95302870@qq.com",
	"password": "12345678",
	"state": "",
	"scop": "" 
}
```

### 响应数据：

参数说明：

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| access_token | string | - | 授权令牌 |
| scope | string | - | 授权范围 |
| openid | string | - | 授权用户的唯一标识 `即将废弃` |
| userid | int | - | 授权用户的唯一标识 `即将废弃` |


完整示例：
```json
{
	"code": 0,
	"data": {
		"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsImFwaVRva2VuIjoieUEwR2lqN1hWMyIsImNsaWVudElkIjoidGVzdF9hcHBpZCIsImV4cCI6MTcxNjgxMDcxOH0.-GGW3SlufdMQ1hKi_clj1_19db03iSneUn3d7jCDrvk",
		"openid": "bunfdpaaa2jqaco",
		"userid": 1,
		"scope": ""
	},
	"msg": "OK"
}
```

## 客户端模式登录

此方式并非以用户为中心的登录方式，而是以客户端（应用）为中心的登录方式来调用一些 API 的功能。

### 接口地址

`/oauth2/v1/token`

### 请求参数

请求方式：`POST`

参数说明：

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| grant_type | string | `client_credentials` | 固定值|
| client_id | string | test_appid | 应用的唯一标识|
| client_secret | string |-| 秘钥|
| state | string | -| `可选` 无实际用处 |
| scope | string | -| `可选` 无实际用处 |


请求示例:
```json
{
	"grant_type": "client_credentials", // 固定
	"client_id": "test_appid",
	"client_secret": "ZXhhbXBsZTEyMzpwYXNzMnQutWIwbWQ0aGlkOD0",
	"state": "", // 暂不支持
	"scope": "" // 暂不支持
}
```

### 响应数据：

参数说明：

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| access_token | string | - | 授权令牌 |
| token_type | string | `Bearer` | token 类型 固定值 |
| refresh_token | string | - | 刷新令牌 |
| expires_in | int | - | 过期时间 单位：s |


完整示例：
```json
{
	"code": 0,
	"data": {
		"access_token": "uRnggb19NKkEUyRvCryp",
		"token_type": "Bearer",
		"refresh_token": "RZN8RbRH856iBEM1CJCoJ9ULKZqXYr",
		"expires_in": 9999
	},
	"msg": "OK"
}
```

## 刷新令牌

目前仅在客户端模式登录有效

### 接口地址

`/oauth2/v1/token`

### 请求参数

请求方式：`POST`

参数说明：

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| grant_type | string | `refresh_token` | 固定值|
| client_id | string | test_appid | 应用的唯一标识|
| client_secret | string |-| 秘钥|
| refresh_token | string |-| 刷新令牌|
| state | string | -| `可选` 无实际用处 |
| scope | string | -| `可选` 无实际用处 |


请求示例:
```json
{
	"grant_type": "refresh_token", // 固定
	"client_id": "test_appid",
	"client_secret": "ZXhhbXBsZTEyMzpwYXNzMnQutWIwbWQ0aGlkOD0",
    "refresh_token":"uRnggb19NKkEUyRvCryp", // 刷新令牌
	"state": "", // 暂不支持
	"scope": "" // 暂不支持
}
```

### 响应数据：

参数说明：

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| access_token | string | - | 授权令牌 |
| token_type | string | `Bearer` | token 类型 固定值 |
| refresh_token | string | - | 刷新令牌 |
| expires_in | int | - | 过期时间 单位：s |


完整示例：
```json
{
	"code": 0,
	"data": {
		"access_token": "uRnggb19NKkEUyRvCryp",
		"token_type": "Bearer",
		"refresh_token": "RZN8RbRH856iBEM1CJCoJ9ULKZqXYr",
		"expires_in": 9999
	},
	"msg": "OK"
}
```