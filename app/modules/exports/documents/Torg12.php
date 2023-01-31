<?php

namespace app\modules\exports\documents;

use DateTime;
use \PhpOffice\PhpWord\TemplateProcessor;

class Torg12 extends ExportDocument {

    public static $number = 1;

    public static function incNumber() {
        static::$number += 1;
    }

    public function __construct($params) {
        parent::__construct($params);
    }

	protected function documentName() : string {
        return "torg-12.docx";
    }

    protected function prepareValues(TemplateProcessor $templateProcessor) {
        $order = $this->params['order'];
        $templateProcessor->setValue('docNum', static::$number);
        $templateProcessor->setValue('docDate', date('d.m.Y'));
        $templateProcessor->setValue('customerName', $order['customer']['name']);
        
        $products = [];
        $number = 1;
        foreach ($order['products'] as &$product) {
            $row = [];
            $row['productNum'] = $number++;
            $row['productName'] = $product['title'];
            $row['productCount'] = $product['quantity'];
            $row['productWeight'] = $product['dimensions']['weight'];
            $row['productPrice'] = $product['price'];

            $products[] = $row;
        }

        $templateProcessor->cloneRowAndSetValues('productNum', $products);
    }
	
}