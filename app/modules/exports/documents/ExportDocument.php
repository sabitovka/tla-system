<?php

namespace app\modules\exports\documents;

use \PhpOffice\PhpWord\TemplateProcessor;
use yii\helpers\FileHelper;

abstract class ExportDocument {

    protected $params;

    protected abstract function documentName() : string;
    protected abstract function prepareValues(TemplateProcessor $templateProcessor);

    public function __construct($params) {
        $this->params = $params;
    }

    public function export($fileToSave) {
        // Creating the new document
        $docName = static::documentName();
        $fileName =  __DIR__."\\resources\\$docName";
        $dirToSave = $_SERVER['DOCUMENT_ROOT'].'/app/runtime/docs/';
        if (!file_exists($dirToSave)) {
            mkdir($dirToSave);
        }

        $templateProcessor = new TemplateProcessor($fileName);
        static::prepareValues($templateProcessor);
        $templateProcessor->saveAs($dirToSave . $fileToSave);

        return FileHelper::normalizePath($dirToSave . $fileToSave);
    }
}