## php 认证示例


```php
<?php

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