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

| HTTP 状态码|code| 说明 |
|---|---| --- |
|401|10001|	未授权，请检查Authorization的Header的Access Token是否设置正确|
|403|-|	无权访问请求的资源|
|404|-|	Not Found|
|409|-|	将要创建的资源已经存在，拒绝重复创建|
|500|-|	服务内部错误，请查看详细的错误原因|