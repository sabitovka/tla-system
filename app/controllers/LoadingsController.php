<?php

namespace app\controllers;

use yii\base\Controller;

class LoadingsController extends Controller {

  public function actionIndex() {
    return $this->render('index');
  }

}