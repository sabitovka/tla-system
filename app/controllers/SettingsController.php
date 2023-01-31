<?php

namespace app\controllers;

use yii\base\Controller;

class SettingsController extends Controller {

    public function actionIndex() {
        return $this->render('index');
    }

}