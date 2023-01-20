<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "transport".
 *
 * @property int $id
 * @property string|null $name
 * @property int|null $width
 * @property int|null $height
 * @property int|null $length
 * @property int|null $load_capacity
 * @property int|null $state_number
 *
 * @property Loading[] $loadings
 */
class Transport extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'transport';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['width', 'height', 'length', 'load_capacity'], 'integer'],
            [['name', 'state_number'], 'string', 'max' => 255],
            [['state_number'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Название',
            'width' => 'Ширина кузова',
            'height' => 'Высота кузова',
            'length' => 'Длина кузова',
            'load_capacity' => 'Грузоподъемность',
            'state_number' => 'Гос. номер',
        ];
    }

    /**
     * Gets query for [[Loadings]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getLoadings()
    {
        return $this->hasMany(Loading::class, ['transport_id' => 'id']);
    }
}
