# 订单相关

## 修改订单状态

可以将订单状态修改为已完成状态，从而实现三方应用的发货效果。

### 接口地址

`/openApi/v1/c/goodsOrder/updateStatus`

### 请求参数

请求方式：`POST`

参数说明：

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| orderNo | string | 20240325134607715228545 | 订单号 |
| status | string | `FINISH` | 订单状态 (支付成功：`PAY_SUCCESS`，订单完成：`FINISH`，退款：`REFUND`，取消订单：`CANCEL`) |



请求示例:
```json
{
	"orderNo": "20240325134607715228545",
	"status": "REFUND"
}
```

### 响应数据：

参数说明：

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
|username|string|66666@qq.com|用户名|
|password|string|7dZxZXckKih1RTPc92iKjbkcnQF2C9ae|密码 (三次md5所得的值：`md5(md5(md5(password)))` )  |
|name|string|红烧猎人|昵称|
|headImage|string||头像|


完整示例：
```json
{
	"code": 0,
	"data": {
		"username": "66666@qq.com",
		"password": "7dZxZXckKih1RTPc92iKjbkcnQF2C9ae",
		"name": "红烧猎人",
		"headImage": "",
		"role": 1,
		"mail": "66666@qq.com"
	},
	"msg": "OK"
}
```