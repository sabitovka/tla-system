<?php

namespace app\controllers;

use yii\base\Controller;
use yii\filters\AccessControl;

class SettingsController extends Controller {

    public function behaviors() {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }

    public function actions() {
        return [
            'org' => [
                'class' => 'pheme\settings\SettingsAction',
                'modelClass' => 'app\models\OrgForm',
                'viewName' => 'org',
            ],
        ];
    }

}