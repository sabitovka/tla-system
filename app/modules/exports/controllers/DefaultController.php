<?php

namespace app\modules\exports\controllers;

use app\modules\exports\documents\ExportDocument;
use app\modules\exports\documents\Torg12PDF;
use yii\web\Controller;

/**
 * Default controller for the `api` module
 */
class DefaultController extends Controller
{
    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionIndex()
    {
        $doc = new ExportDocument();
        return $doc->export('ТОРГ-12.docx');
    }
}
