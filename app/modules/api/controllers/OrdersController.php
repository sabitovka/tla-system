<?php

namespace app\modules\api\controllers;

use app\models\LoadingOrder;
use app\models\LoadingOrderProduct;
use yii\rest\ActiveController;
use GuzzleHttp\Client;
use stdClass;

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
        $loadedOrder = LoadingOrder::findOne(['id' => $id]);
        $loadedProducts = LoadingOrderProduct::find()->where(['loading_order_id' => $id])->all();

        // Create a client with a base URI
        $client = new Client(['base_uri' => 'http://localhost:3001']);
        // Send a request to https://foo.com/api/test
        $response = $client->request('GET', "orders/$loadedOrder->order_id?_include=products");
        $order = json_decode($response->getBody(), true);

        foreach ($order['products'] as &$product) {
            $product['isLoaded'] = $this->searchForId($product['productId'], $loadedProducts, 'poduct_id') !== null;
        }

        $order['num'] = $order['id'];
        $order['id'] = (integer) $id;

        return $order;
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