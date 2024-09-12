# 全局说明

## 请求数据

### Header 参数

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| Authorization | string | - | [客户端授权](../oauth2.md#clientCredentials)登录获取的 `access_token` |


## 响应数据

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| code | int | 0 | 错误码 |
| data | object | any | - | 数据 |
| msg | string | OK | 错误信息 |

```json
{
	"code": 0,
	"data": {
		// 实际接口数据
	},
	"msg": "OK"
}
```

## 错误码