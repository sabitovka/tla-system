<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "loading_order_product".
 *
 * @property int $loading_order_id
 * @property int $poduct_id
 *
 * @property LoadingOrder $loadingOrder
 */
class LoadingOrderProduct extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'loading_order_product';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['loading_order_id', 'poduct_id'], 'required'],
            [['loading_order_id', 'poduct_id'], 'integer'],
            [['loading_order_id', 'poduct_id'], 'unique', 'targetAttribute' => ['loading_order_id', 'poduct_id']],
            [['loading_order_id'], 'exist', 'skipOnError' => true, 'targetClass' => LoadingOrder::class, 'targetAttribute' => ['loading_order_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'loading_order_id' => 'Loading Order ID',
            'poduct_id' => 'Poduct ID',
        ];
    }

    /**
     * Gets query for [[LoadingOrder]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getLoadingOrder()
    {
        return $this->hasOne(LoadingOrder::class, ['id' => 'loading_order_id']);
    }
}
