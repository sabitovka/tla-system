<?php

namespace app\models;

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
}
