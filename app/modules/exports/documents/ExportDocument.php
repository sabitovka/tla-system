<?php

namespace app\modules\exports\documents;

class ExportDocument {

    private $documentName = 'torg-12.docx';

    public function export($fileToSave) {
        // Creating the new document
        $file =  __DIR__."\\resources\\$this->documentName";
        $templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor($file);
        $templateProcessor->setValue('foo', 'bar');
        $dirToSave = $_SERVER['DOCUMENT_ROOT'].'/app/runtime/docs/';
        if (!file_exists($dirToSave)) {
            mkdir($dirToSave);
        }
        $templateProcessor->saveAs($dirToSave . $fileToSave);
    }
}