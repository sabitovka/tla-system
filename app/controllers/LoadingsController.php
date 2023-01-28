<?php

namespace app\controllers;

use app\models\Loading;
use app\models\Transport;
use yii\base\Controller;
use yii\web\BadRequestHttpException;

class LoadingsController extends Controller {

  public function actionIndex() {
    $transport = Transport::find()->all();
    $loadings = Loading::find()->all();

    return $this->render('index', [
      'transport' => $transport,
      'loadings' => $loadings,
    ]);
  }

  public function actionCreate() {
    if ($this->request->isPost && ($data = $this->request->post()) != null) {
      $transportId = $data['transport'];
      $loading = new Loading();
      $loading->transport_id = $transportId;
      if ($loading->save()) {
        return json_encode($loading->id);
      }
    }
    throw new BadRequestHttpException('Необходимо выбрать транспорт');
  }

  public function actionEditor() {
    return $this->render('editor', ['id' => $_GET['id']]);
  }

}