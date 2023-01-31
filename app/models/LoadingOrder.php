<?php

namespace app\models;

use GuzzleHttp\Client;
use Yii;

/**
 * This is the model class for table "loading_order".
 *
 * @property int $id
 * @property int|null $loading_id
 * @property int|null $order_id
 *
 * @property Loading $loading
 * @property LoadingOrderProduct[] $loadingOrderProducts
 */
class LoadingOrder extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'loading_order';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['loading_id', 'order_id'], 'integer'],
            [['loading_id'], 'exist', 'skipOnError' => true, 'targetClass' => Loading::class, 'targetAttribute' => ['loading_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'loading_id' => 'Loading ID',
            'order_id' => 'Order ID',
        ];
    }

    public function fields()
    {
        return [
            'id',
            'loadingId' => 'loading_id',
            'orderId' => 'order_id'
        ];
    }

    /**
     * Gets query for [[Loading]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getLoading()
    {
        return $this->hasOne(Loading::class, ['id' => 'loading_id']);
    }

    /**
     * Gets query for [[LoadingOrderProducts]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getLoadingOrderProducts()
    {
        return $this->hasMany(LoadingOrderProduct::class, ['loading_order_id' => 'id']);
    }

    public function withProducts($onlyLoaded = false) {
        $loadedProducts = $this->getLoadingOrderProducts()->all();

        // Create a client with a base URI
        $client = new Client(['base_uri' => 'http://localhost:3001']);
        // Send a request to https://foo.com/api/test
        $response = $client->request('GET', "orders/$this->order_id?_include=products");
        $order = json_decode($response->getBody(), true);

        foreach ($order['products'] as &$product) {
            $product['isLoaded'] = $this->searchForId($product['productId'], $loadedProducts, 'poduct_id') !== null;
            $product['totalWeight'] = $product['dimensions']['weight'] * $product['quantity'];
            $product['dimensions']['volume'] = ($product['dimensions']['width'] * $product['dimensions']['height'] * $product['dimensions']['length']) / 1000000;
            $product['totalVolume'] = $product['dimensions']['volume'] * $product['quantity'];
        }

        if ($onlyLoaded) {
            $order['products'] = array_filter($order['products'], function($var) { return $var['isLoaded'] == true; });
        }

        $order['num'] = $order['id'];
        $order['id'] = (integer) $this->id;        

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
