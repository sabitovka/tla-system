<?php

namespace app\models;

use yii\base\Model;

class OrgForm extends Model {
    public $orgName;

    public function rules() {
        return [
            [['orgName'], 'string'],
        ];
    }

    public function attributeLabels() {
        return [
            'orgName' => 'Название организации',
        ];
    }
}