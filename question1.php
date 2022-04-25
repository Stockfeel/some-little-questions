<?php
// 你有幾檔尚未除權息的股票資料，包含公司名稱、股票代碼、今日股價、今日成交量與公司基本資料（公司地址、實收資本、董事長與總經理），以及本年度預計發放的現金與股票股利，每間公司的現金或股票股利並不相同，使用者希望能輸入現金與股票股利後就能事先知道除權息後的股價，請用 (PHP 或 JavaScript) 將這些資訊包裝成方便使用的資料結構與函式。

class Corp
{
    public $name, //公司名稱
    $code, //股票代碼
    $price, //今日股價
    $traded, //今日成交量
    $info; //公司基本資料

    public function __construct($name, $code, $price, $traded, $info)
    {
        $this->name   = $name;
        $this->code   = $code;
        $this->price  = $price;
        $this->traded = $traded;
        $this->info   = $info;
    }
    public function getReferencePrice($cash, $stock)
    {
        // 除權息計算方式: (今日股價 - 現金股利) / (1 + 股票股利 / 10)
        return ($this->price - $cash) / (1 + $stock / 10);
    }
}

class Info
{
    public $address, //公司地址
    $capital, //實收資本
    $chairman, //董事長
    $president; //總經理

    public function __construct($address, $capital, $chairman, $president)
    {
        $this->address   = $address;
        $this->capital   = $capital;
        $this->chairman  = $chairman;
        $this->president = $president;
    }
}

$corp = new Corp(
    "台灣積體電路製造股份有限公司",
    2330,
    548,
    35568,
    new Info("新竹科學園區力行六路8號", 259320000000, "劉德音", "魏哲家")
);

$cash   = 10; //設定現金股利
$stock  = 10; //設定股票股利
$result = $corp->getReferencePrice($cash, $stock);

?>

<!DOCTYPE html>
<html>
<head>
<title>除權除息參考價試算</title>
</head>
<body>

<h1>除權除息參考價試算</h1>
<h2>股票資料</h2>
<ul>
<li>公司名稱: <?php echo $corp->name; ?></li>
<li>股票代碼: <?php echo $corp->code; ?></li>
<li>今日股價: <?php echo $corp->price; ?></li>
<li>今日成交量: <?php echo $corp->traded; ?></li>
</ul>
<h2>公司基本資料</h2>
    <ul>
    <li>公司地址: <?php echo $corp->info->address; ?></li>
    <li>實收資本: <?php echo $corp->info->capital; ?></li>
    <li>董事長: <?php echo $corp->info->chairman; ?></li>
    <li>總經理: <?php echo $corp->info->president; ?></li>
</ul>
<hr>
<h2>計算結果</h2>
<p>
    現金股利: <?php echo $cash; ?></br>
    股票股利: <?php echo $stock; ?></br>
    除權息: <?php echo $result; ?>
</p>

</body>
</html>