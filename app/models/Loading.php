<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "loading".
 *
 * @property int $id
 * @property string|null $creation_date
 * @property int|null $transport_id
 * @property int|null $is_loaded
 *
 * @property LoadingOrder[] $loadingOrders
 * @property Transport $transport
 */
class Loading extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'loading';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['creation_date'], 'safe'],
            [['transport_id'], 'integer'],
            [['is_loaded'], 'boolean'],
            ['transport_id', 'required'],
            [['transport_id'], 'exist', 'skipOnError' => true, 'targetClass' => Transport::class, 'targetAttribute' => ['transport_id' => 'id']],
        ];
    }

    public function extraFields() {
        return [
            'transport',
            'orders' => 'loadingOrders'
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'creation_date' => 'Creation Date',
            'transport_id' => 'Transport ID',
            'is_loaded' => 'Is Loaded',
        ];
    }

    /**
     * Gets query for [[LoadingOrders]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getLoadingOrders()
    {
        return $this->hasMany(LoadingOrder::class, ['loading_id' => 'id']);
    }

    /**
     * Gets query for [[Transport]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getTransport()
    {
        return $this->hasOne(Transport::class, ['id' => 'transport_id']);
    }
}
