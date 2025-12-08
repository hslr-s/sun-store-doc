# 邮件

## 发送邮件接口

根据模板标识发送邮件

### 接口地址

`/openApi/v1/c/email/sendEmailByTemplateFlag`

### 请求参数

请求方式：`POST`

参数说明：

| 参数 | 类型 | 示例 | 说明 |
|---| --- | --- | --- |
| templateFlag | string | `register_verify_code` | 邮件模板标识 |
| toEmails | array | `["user@example.com"]` | 收件人邮箱列表 |
| templateArg | object | `{"code": "123456"}` | 模板参数 |

请求示例:
```json
{
	"templateFlag": "register_vcode_en",
	"toEmails": ["xxxxx@qq.com"],
	"templateArg": {
		"{VCODE}": "123456"
	}
}
```

### 响应数据：

成功响应参数说明：

\-

错误响应参数说明：

| 错误码 | 示例 | 说明 |
|---| --- | --- |
| 1202 | "No template found" | 未找到对应模板 |
| -1 | "Sending failed" | 发送失败 |
