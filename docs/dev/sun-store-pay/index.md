---
outline: [2, 3]
---
# Sun-Store-PAY

这是 Sun-Store 独立出来的集成支付模块，进行单接口统一支付方式。

## 1. API 接口

全局采用POST请求，

### 1.1 header 参数说明：
|参数|必填|说明|
|---|---|---|
|`Authorization`|是|`Bearer <JWT_Token>`|

#### JWT header 参数说明

|参数|类型|必填|说明|
|---|---|---|---|
|`alg`|string|是|签名算法，固定为`HS256`|
|`typ`|string|是|Token类型，固定为`JWT`|
|`kid`|string|是|Key ID，用于标识签名密钥|

#### JWT header 示例

```json
{
  "alg": "HS256",
  "typ": "JWT",
  "kid": "key-2024-001"
}
```

#### JWT payload 参数说明

|参数|类型|必填|说明|
|---|---|---|---|
|`iat`|number|是|签发时间戳（Issued At），JWT 生成的 Unix 时间戳|
|`exp`|number|是|过期时间戳（Expiration Time），JWT 过期的 Unix 时间戳|
|`iss`|string|否|签发者（Issuer），标识 JWT 的签发主体|
|`sub`|string|否|主题（Subject），通常为应用标识或用户标识|

#### JWT payload 示例

```json
{
  "iat": 1719792000,
  "exp": 1720396800,
  "iss": "sun-store-platform",
  "sub": "your-app-id"
}
```

#### JWT 签名流程

将JWT的header和payload分别进行Base64Url编码，使用`.`连接成 `header.payload`，然后使用对应的共享密钥对此字符串进行HS256算法签名，得到签名值。

完整的JWT格式为：`header.payload.signature`，将此JWT Token放置在HTTP请求的`Authorization` header中，格式为：`Bearer <JWT_Token>`。


### 1.2 发起支付

#### 1.2.1 请求参数

|参数|类型|必填|说明|
|---|---|---|---|
|`payplatform`|string|是|支付平台，参阅[支付平台](#payment-platform)|
|`orderNo`|string|是|商户订单号，需保证唯一性|
|`amount`|number|是|支付金额（小数点之后保留两位）|
|`currencyCode`|string|是|币种代码，如：`CNY`、`USD`、`EUR` 等|
|`title`|string|是|订单标题，显示在支付页面|
|`validityPeriodSecond`|number|否|订单有效期，单位秒，默认值请参考具体支付平台|
|`noticeUrl`|string|否|支付成功通知地址（webhook）|
|`returnUrl`|string|否|支付成功后的回调页面URL|


#### 1.2.2 请求示例

```json
{
  "payplatform": "ALI",
  "orderNo": "ORDER202412040001",
  "amount": 99.99,
  "currencyCode": "CNY",
  "title": "商品购买",
  "validityPeriodSecond": 1800,
  "noticeUrl": "https://your-domain.com/payment/notice",
  "returnUrl": "https://your-domain.com/payment/success"
}
```

#### 1.2.3 响应参数

|参数|类型|说明|
|---|---|---|
|`payUrl`|string|支付链接，用户可通过此链接完成支付|
|`payPlatformOrderNo`|string|支付平台订单号，用于后续查询支付状态|
|`currencyCode`|string|币种代码，与请求参数一致|
|`countPrice`|number|订单金额，与请求参数一致|

#### 1.2.4 响应示例

```json
{
  "payUrl": "https://openapi.alipay.com/gateway.do?...",
  "payPlatformOrderNo": "ALI202412040001",
  "currencyCode": "CNY",
  "countPrice": 99.99
}
```

### 1.3 查询支付状态

#### 1.3.1 请求参数

|参数|类型|必填|说明|
|---|---|---|---|
|`orderNo`|string|二选一必填|商户订单号|
|`paymentPlatformOrderNo`|string|二选一必填|支付平台的订单号|



#### 1.3.2 请求示例

```json
{
  "orderNo": "ORDER202412040001"
}
```

#### 1.3.3 响应参数

|参数|类型|说明|
|---|---|---|
|`orderNo`|string|商户订单号|
|`platformOrderNo`|string|支付平台订单号|
|`status`|string|支付状态，详见[支付状态定义](#payment-status)|
|`platform`|string|支付平台,参阅[支付平台](#payment-platform)|

#### 1.3.4 响应示例

```json
{
  "orderNo": "ORDER202412040001",
  "platformOrderNo": "ALI202412040001",
  "status": "success",
  "platform": "ALI"
}
```

### 1.4 取消订单

#### 1.4.1 请求参数

|参数|类型|必填|说明|
|---|---|---|---|
|`orderNo`|string|是|商户订单号，需为`PAY_WAIT`状态的订单|

#### 1.4.2 请求示例

```json
{
  "orderNo": "20251209151354402113275"
}
```

#### 1.4.3 响应参数

|参数|类型|说明|
|---|---|---|
|`orderNo`|string|商户订单号|
|`status`|string|订单状态，详见[支付状态定义](#payment-status)|

#### 1.4.4 响应示例

```json
{
  "orderNo": "20251209151354402113275",
  "status": "CANCEL"
}
```


## 2. webhook 异步支付成功通知

### 2.1 请求说明

#### 2.1.1 header 参数说明

|参数|类型|说明|
|---|---|---|
|`SunStorePay-Signature`|string|`ts=时间戳;h1=签名值`。具体签名验证方法参阅：[签名验证](/dev/webhook/signature)|

#### 2.1.2 body 参数说明

|参数|类型|说明|
|---|---|---|
|`orderNo`|string|商户订单号|
|`platformOrderNo`|string|支付平台订单号|
|`status`|string|支付状态，详见[支付状态定义](#payment-status)|
|`platform`|string|支付平台,参阅[支付平台](#payment-platform)|



### 2.2 响应说明

当收到请求后请立即返回 `200` 状态码，其余的操作尽量在返回之再执行，否则支付平台会重试。


## 3. 支付状态定义 {#payment-status}

|状态码|状态标识|说明|
|---|---|---|
|`PAY_WAIT`|等待付款|订单创建成功，等待用户付款|
|`PAY_SUCCESS`|已付款|用户付款成功|
|`CLOSE`|关闭订单|订单被关闭（超时或其他原因）|
|`CANCEL`|取消订单|用户主动取消订单|
|`PAY_REVIEW`|审核中|付款等待审核，用于第三方付款渠道|
|`FINISH`|已完成|订单完成所有流程|
|`REFUND`|退款|订单已退款|

## 4. 支付平台 {#payment-platform}

|支付平台|支付方式|
|---|---|
|`ALI`|支付宝支付|
|`PADDLE`|Paddle.com支付|
|`WEIXIN`|微信支付（暂不支持）|

