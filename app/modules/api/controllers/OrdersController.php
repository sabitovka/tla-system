<?php

namespace app\modules\api\controllers;

use app\models\LoadingOrder;
use yii\rest\ActiveController;
use GuzzleHttp\Client;

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

        

        return $actions;
    }

    public function actionView($id)
    {
        $orderLoading = LoadingOrder::findOne(['id' => $id]);

        // Create a client with a base URI
        $client = new Client(['base_uri' => 'localhost:3001']);
        // Send a request to https://foo.com/api/test
        $response = $client->get(`orders/$id?_include=products`);
        $orderLoading->products = json_decode($response->getBody());

        return $orderLoading;
    }

}