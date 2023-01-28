<?php

namespace app\modules\exports\controllers;

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
        $pdf = new Torg12PDF();

        $pdf->SetTitlePDF('20016101_torg12');

        $pdf->SetEntity('Индивидуальный предприниматель Иванов Иван Иванович');
        $pdf->SetOkpoEntity('0232578541');
        $pdf->SetPositionEntity('Индивидуальный предприниматель');
        $pdf->SetFioEntity('Иванов И.И.');

        $pdf->SetConsignee('Петров Петр Петрович');
        $pdf->SetPayer('Петров Петр Петрович');
        $pdf->SetBaseValue('Заказ #20016101 от 16.01.202');

        $pdf->SetInvoiceNumber('20016101');
        $pdf->SetInvoiceDate('1');

        $pdf->AddProducts([
            [
                'name'    => 'Товар 1',
                'count'   => 1,
                'price'   => 100,
            ],
            [
                'name'    => 'Товар 2',
                'count'   => 2,
                'price'   => 200,
            ],
        ]);

        $pdf->OutputPDF();
    }
}
