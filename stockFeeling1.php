<?php
// 你有幾檔尚未除權息的股票資料，包含公司名稱、股票代碼、今日股價、今日成交量與公司基本資料（公司地址、實收資本、董事長與總經理），以及本年度預計發放的現金與股票股利，每間公司的現金或股票股利並不相同，使用者希望能輸入現金與股票股利後就能事先知道除權息後的股價，請用 (PHP 或 JavaScript) 將這些資訊包裝成方便使用的資料結構與函式。
require_once __DIR__.'/vendor/autoload.php';

use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;

$latestNews = 'https://tw.stock.yahoo.com/class-quote?sectorId=38&exchange=TAI';
$client = new Client();
$response = $client->request('GET', $latestNews);
$latestNewsString = (string) $response->getBody();
$allInfo = [];
$stocks = [];
$prices = [];
$str = '.TW';
$crawler = new Crawler($latestNewsString);
$crawler = $crawler
    ->filter('span')
    ->reduce(function (Crawler $node, $i) {
        global $allInfo;
        $allInfo[] = $node->text();
    });

for ($i = 0; $i < count($allInfo); ++$i) {
    if (strpos($allInfo[$i], $str) == true) {
        $stocks[] = $allInfo[$i];
        $prices[] = $allInfo[$i + 1];
    }
}

?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <!-- Bootstrap -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">

    </head>

    <body>
        <div class="container d-flex justify-content-center">
            <!-- <form class="form-horizontal" role="form" id="rightref_form" method="get" onsubmit="return false;"> -->
            <form class="form-horizontal" role="form" id="rightref_form" method="get">
                <legend style="display:none">除權除息參考價試算</legend>
                <h3>除權除息參考價試算</h3>
                <div class="form-group">
                    <label for="pre-pr">除權除息前股價 <span style="color: #990000;">(必填)</span></label>
                    <select name="prePr" id="prePr">
                        <?php
                    for ($i = 0; $i < count($stocks); ++$i) {
                        echo '<option>';
                        echo $stocks[$i].'  目前收盤價 '.$prices[$i];
                        echo '</option>';
                    }
                    ?>
                    </select>
                </div>
                <div class="form-group">
                    <label for="cash">現金股利(選填)</label>
                    <input type="form-control text" class="input-text ui-corner-all number" id="cash" name="cash"
                        value="0.00"><span>元</span><em class="error"></em>
                </div>
                <div class="form-group">
                    <label for="divd">股票股利(選填)</label>
                    <input type="form-control text" class="input-text ui-corner-all number" id="divd" name="divd"
                        value="0.00"><span>股</span><em class="error"></em>
                </div>
                <div class="form-group d-flex justify-content-center">
                    <!-- <button class="btn-cal" type="submit" name="sub">試算</button>
                    <button class="btn-clear">清除</button> -->
                    <input class="btn btn-primary" type="submit" value="提交">
                    <input type="reset" value="重置">
                </div>
            </form>

            <?php
            //當表單被提交後，進行如下操作
            $sum = 0;
            $prePr = isset($_GET['prePr']) ? $_GET['prePr'] : 0;
            $cash = isset($_GET['cash']) ? $_GET['cash'] : 0;
            $divd = isset($_GET['divd']) ? $_GET['divd'] : 0;
            $price = strrchr($prePr, ' ');

            // 除權息參考價=﹝除權除息前一日收盤價-現金股利﹞÷﹝1＋（股票股利÷10）﹞
            // 除權息參考價=（股價 – 現金股利 ） / （1 + 配股率） // ref:https://reurl.cc/1oal08
                    $sum = ($price - $cash) / (1 + $divd * 0.01);
                    echo '<h2>';
                    echo '參考價試算結果'.$sum;
                    echo '</h2>';
        ?>


        </div>
    </body>

</html>
