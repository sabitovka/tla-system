<?php

namespace app\modules\api\controllers;

use app\models\LoadingOrder;
use app\models\LoadingOrderProduct;
use yii\rest\ActiveController;
use GuzzleHttp\Client;
use Yii;

class OrdersController extends ActiveController {

    public $modelClass = 'app\models\LoadingOrder';

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
 
    public function actions()
    {
        $actions = parent::actions();
        unset($actions['view']);       

        return $actions;
    }

    public function actionView($id)
    {
        $order = LoadingOrder::findOne(['id' => $id]);
        return $order->withProducts();
    }

    public function actionAll($forLoadingId = null) {
        // Create a client with a base URI
        $client = new Client(['base_uri' => 'http://localhost:3001']);
        // Send a request to https://foo.com/api/test
        $orders = json_decode($client->request('GET', "orders")->getBody(), true);

        if (!$forLoadingId) {
            return $orders;
        }

        $loadedOrders = LoadingOrder::find()->where(['loading_id' => $forLoadingId])->all();
        foreach ($orders as &$order) {
            $order['isSelected'] = $this->searchForId($order['id'], $loadedOrders, 'order_id') !== null;
        }
        return $orders;
    }

    public function actionSaveBatch() {
        $items = Yii::$app->request->post();

        $transaction = LoadingOrder::getDb()->beginTransaction();
        try {
            foreach ($items as $item) {
                if (strcmp($item['action'], 'delete') == 0) {
                    LoadingOrder::deleteAll(['order_id' => $item['id'], 'loading_id' => $item['loadingId']]);
                } else {
                    $newItem = new LoadingOrder();
                    $newItem->order_id = $item['id'];
                    $newItem->loading_id = $item['loadingId'];
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

    private function searchForId($id, $array, $idKey = 'id') {
        foreach ($array as $key => $val) {
            if ($val[$idKey] === $id) {
                return $key;
            }
        }
        return null;
     }

}