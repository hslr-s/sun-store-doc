---
outline: [2,3]
---
# 签名验证

## 流程

1. 从Header获取到`SunStore-Signature`，格式为`ts=时间戳;h1=签名值`

2. 生成签名
- 将body中的数据（原始数据，不要做任何处理），将上一步的时间戳（ts）和body中的原始数据拼接(message)，用于生成签名，格式为`"JSON数据:时间戳"`。
- 结合 拼接的数据（message） 和 私钥（secret） 使用HMAC SHA256算法生成签名，具体代码可以参考[生成签名](#generateSignature)

3. 校验签名
- 将上一步得到的签名值，与第一步h1进行比对来以验证请求的合法性。

这个流程确保了数据的完整性和请求的合法性，通过签名可以验证数据在传输过程中未被篡改，并且是由拥有正确密钥的发送方发送的。


## 生成签名 {#generateSignature}

其他语言可以使用 AI 工具来生成代码，以下是一些示例：

### GO

```go
func GenerateHMACSHA256(message, secret string) (string, error) {
	// 创建一个新的HMAC对象，使用sha256作为哈希函数
	hmac := hmac.New(sha256.New, []byte(secret))

	// 向HMAC写入要签名的消息
	_, err := hmac.Write([]byte(message))
	if err != nil {
		return "", err
	}

	// 计算签名
	signature := hmac.Sum(nil)
	signatureStr := hex.EncodeToString(signature)

	return signatureStr, nil
}


```

### PHP

```php
function generateHMACSHA256($message, $secret) {
    // 创建一个新的HMAC对象，使用sha256作为哈希函数
    $hmac = hash_hmac('sha256', $message, $secret, true);

    // 将签名编码为base64字符串
    $signature = bin2hex($hmac);

    return $signature;
}

$str='{"event":"goodsOrder.create","eventId":"1717153892_xpkOR1aunf89iy2","data":{"orderNo":"20240531191132195739929","status":"PAY_WAIT","countPrice":1,"currencyCode":"","payPlatform":"","user":{"id":6,"username":"admin@sun.cc","mail":"admin@sun.cc"},"goodsSnapshot":{"id":32,"goodsId":9,"title":"PRO-授权30天","price":1,"originalPrice":0,"discount":"测试期间限时优惠","description":"付款成功后立即生效，授权有效期开始计算时间为当天24时","param":"{\"day\":30,\"limitBuyFrequency\":{\"buyFrequency\":1000,\"day\":10},\"paddle\":{\"priceId\":\"pri_01hvqrdcjhxcyr06ajdx2ya7bb\"}}"}}}:1717153892';
$secret="JJNuk78GLPnfUMBY6AjyESLWz9nge2jk";
echo "签名是".generateHMACSHA256($str,$secret);
```

