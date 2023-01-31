<?php

namespace app\modules\exports\controllers;

use app\models\Loading;
use yii\web\Controller;
use app\modules\exports\documents\Torg12;
use ZipArchive;

/**
 * Default controller for the `api` module
 */
class DocxController extends Controller {

    public function actionTorg12($loadingId) {
        $loading = Loading::findOne(['id' => $loadingId]);
        $orders = $loading->getLoadingOrders()->all();

        $files = [];
        $num = 1;
        foreach ($orders as $order) {
            $order = $order->withProducts(true);

            $doc = new Torg12(['order' => $order]);
    
            $fileName = 'ТОРГ-12 - ' . $num++ . ' ' . $order['customer']['name'] . '.docx';
            $files[$fileName] = $doc->export($fileName);
        }

        $zip = new ZipArchive();

        $zipName = "ТОРГ-12 - Загрузка $loadingId.zip";
        $fullZipName = $_SERVER['DOCUMENT_ROOT'] . "/app/runtime/docs/" . $zipName;

        if(file_exists($fullZipName)) {
            unlink($fullZipName); 
        }
        if ($zip->open($fullZipName, ZIPARCHIVE::CREATE) != TRUE) {
            die("Could not open archive");
        }

        foreach ($files as $fileName => $path) {
            $zip->addFile($path, $fileName);
        }

        $zip->close(); 

        return json_encode($files, JSON_UNESCAPED_UNICODE);
    }
}
