<?php

use yii\bootstrap4\Html;
use yii\helpers\Url;

$this->title = 'Настройки';
$this->params['breadcrumbs'][] = $this->title;

?>

<div class="d-flex">
    <div class="w-25 mr-3">
        <div class="card mb-3">
            <div class="card-header">
                <h5>Настройки</h5>
            </div>
            <ul class="list-group list-group-flush">
                <?= Html::a('Параметры организации', Url::to('org'), ['class' => "list-group-item list-group-item-action"]) ?>
                <?= Html::a('Параметры системы', Url::to('system'), ['class' => "list-group-item list-group-item-action"]) ?>
            </ul>
        </div>
        
        <div class="card mb-3">
            <div class="card-header">
                <h5>Справочники</h5>
            </div>
            <ul class="list-group list-group-flush">
                <?= Html::a('Пользователи', Url::to('settings/users'), ['class' => "list-group-item list-group-item-action"]) ?>
                <?= Html::a('Транспорт', Url::to(['/transport']), ['class' => "list-group-item list-group-item-action"]) ?>
            </ul>
        </div>
    </div>

    <div class="card w-75 p-3">