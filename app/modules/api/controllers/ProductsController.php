<?php

namespace app\modules\api\controllers;

use app\models\LoadingOrder;
use app\models\LoadingOrderProduct;
use Yii;
use yii\rest\ActiveController;

class ProductsController extends ActiveController {

    public $modelClass = 'app\models\LoadingOrderProduct';

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // remove authentication filter
        $auth = $behaviors['authenticator'];
        unset($behaviors['authenticator']);
        
        // add CORS filter
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
        ];
        
        // re-add authentication filter
        $behaviors['authenticator'] = $auth;
        // avoid authentication on CORS-pre-flight requests (HTTP OPTIONS method)
        $behaviors['authenticator']['except'] = ['options'];

        return $behaviors;
    }

    public function actionSaveBatch() {
        $items = Yii::$app->request->post();

        $transaction = LoadingOrderProduct::getDb()->beginTransaction();
        try {
            foreach ($items as $item) {
                if (strcmp($item['action'], 'delete') == 0) {
                    LoadingOrderProduct::deleteAll(['loading_order_id' => $item['orderId'], 'poduct_id' => $item['productId']]);
                } else {
                    $newItem = new LoadingOrderProduct();
                    $newItem->loading_order_id = $item['orderId'];
                    $newItem->poduct_id = $item['productId'];
                    $newItem->save();
                }
            }
            $transaction->commit();
        } catch(\Throwable $e) {
            $transaction->rollBack();
            throw $e;
        }

        return count($items);
    }
}