<?php

use yii\bootstrap4\ActiveForm;
use yii\bootstrap4\Html;

echo $this->render('_header');

$this->title = 'Параметры организации';
$this->params['breadcrumbs'][] = $this->title; ?>

<h4><?= $this->title ?></h4>

<?php $form = ActiveForm::begin(['id' => 'org-settings-form']); ?>

<?= $form->field($model, 'orgName') ?>

<?= Html::submitButton('Сохранить', ['class' => 'btn btn-success']) ?>

<?php ActiveForm::end(); ?>

</div>
</div