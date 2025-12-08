# 商品购买资格验证

此功能需要调用三方接口。用户在本平台购买下单前，会调用此接口来验证是否有购买资格，否将拒绝创建订单。使用的是POST请求，三方平台请按照以下格式实现


## 1. 请求参数

#### Header 参数
| 参数名          | 类型   | 必填 | 描述                                                                 |
|----------------|--------|------|----------------------------------------------------------------------|
| `Authorization`| string | 是   | 认证Token，格式: `Bearer <JWT_Token>`                               |
| `Content-Type` | string | 是   | 固定值: `application/json`                                          |
| `X-Request-ID` | string | 是   | 请求唯一标识，用于幂等性和日志追踪，格式: UUID                      |

#### Body 参数
| 参数名       | 类型   | 必填 | 描述  |
|---|---|---|---|
| `email`      | string | 是   | 用户邮箱（账号），用于验证用户状态 |
|`sku`|string|是|商品货号|
|`number`|number|是|购买数量|
|`extendData`|object|否|扩展数据，暂无用|
|`requestId`|string|是|请求唯一标识，用于幂等性和日志追踪|

示例
```json
{
    "email": "user@example.com",
    "sku":"xx5x5x5",
    "number": 1,
    // "extendData": {} // 可选，扩展数据暂时无用
    "requestId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

## 2. 响应参数


| 参数名 | 类型   | 描述 
|--------|--------|----
|code |int|错误码，成功固定为0
|error | string | 错误信息，固定的错误信息，成功固定为：success |
|data | object | 响应数据，-暂时无用- |
|requestId | string | 直接返回请求是传来的requestId |
|detail|string|错误详情，成功无此字段|

#### 成功响应 (HTTP 200)


```json
{
    "code": 0,
    "error": "success",
    "data": {},
    "requestId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```


#### 失败响应 (HTTP 200)
```json
{
    "code": 4001,
    "error": "not_eligible_for_purchase",
    "detail": "邮箱格式不正确",
    "requestId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

## 3.详细设计说明

### 3.1 身份验证设计
采用JWT Token机制，Token应包含以下信息并在签名后传输：
```json
{
    "sub": "api_client",
    "iat": 1737292800,
    "exp": 1737293100,
}
```
Token有效期设置为5分钟，并使用HS256算法进行签名。

### 3.2 输入验证规则
- **email字段**: 必须符合RFC 5322邮箱格式标准，长度限制在254个字符以内
- **goodsArgs字段**: 数组长度限制在50以内，每个商品SKU需符合`/^[a-zA-Z0-9_-]{1,50}$/`模式
- **quantity字段**: 必须为整数，取值范围1-999

### 3.3 业务逻辑验证
在接收到请求后，应按以下顺序执行验证：
1. Token有效性验证（签名、有效期）
2. 输入参数格式验证
3. 业务规则验证（用户状态、商品有效性）
4. 资格规则计算

## 4 错误码

| 错误码(code) | 错误信息(error) |说明|
|-------------|------------------|---
| 0 | success | 请求成功
| 1001 | authentication_failed | 认证失败|
| 2001 | bad_request | 请求参数错误|
| 3001 | user_not_found | 用户不存在|
| 4001 | not_eligible_for_purchase | 不符合购买资格|




## 附录：示例请求

### 请求示例
```http
POST /api/order/qualification HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000

{
    "email": "user@example.com",
    "sku":"xx5x5x5",
    "number": 1,
    // "extendData": {} // 可选，扩展数据暂时无用
    "requestId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
}
```

### 响应示例

```json
{
    "code": 0,
    "error": "success",
    "data": {},
    "requestId": "550e8400-e29b-41d4-a716-446655440000",
    // "msg":"PRO is valid for less than 30 days"
}
```