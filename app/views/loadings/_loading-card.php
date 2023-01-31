<?php

use yii\bootstrap4\Html;
use yii\helpers\Url;

$id = $loading->id;
$creationDate = gmdate('d.m.Y', strtotime($loading->creation_date));
$transportName = $loading->transport->name;
$transportStateNumber = $loading->transport->state_number;
$isLoaded = $loading->is_loaded;
$cardClassName = $isLoaded ? 'border-success' : 'border-dark';
$shippedButtonClassName = $isLoaded ? 'text-success' : 'text-danger';
?>

<div class="col-4">
  <div class='card mb-4 $cardClassName' >
    <div class="card-header color-success">
      <div class="d-flex justify-content-between">
        <span>Погрузка №<?= $id ?> от <?= $creationDate ?></span>
        <a role="menu" data-toggle="dropdown" style="cursor: pointer; user-select: none;">
          ...
          <div class="dropdown-menu" >
            <?= Html::a("Редактировать", Url::to(['loadings/editor', 'id' => $id]), ['class' => "dropdown-item", 'target' => "_blank"]) ?>
            <a class="dropdown-item" href="#">Зарегистировать оплату</a>
            <a class="dropdown-item" href="#">Отгрузить</a>
            <?= Html::a('Скачать пакет документов', Url::to(['/exports/docx/torg12', "loadingId" => $id]), ['class' => "dropdown-item"]) ?>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Закрыть погрузку</a>
          </div>
        </a>
      </div>
    </div>
    <div class="card-body">
      <h6 class="card-subtitle mb-2 "><?= $transportName ?> - <?= $transportStateNumber ?></h6>
      <p class="card-text">
        Заказов <b>3</b> на сумму <b>4500 РУБ</b>.</br>
        Всего товаров <b>10</b> весом <b>550 Кг</b>.
        Стоимость доставки: <b>500 РУБ</b>
      </p>
      <div class="d-flex justify-content-between">
        <a href="#" class="card-link text-success">Оплачено</a>
        <a href="#" class="card-link $shippedButtonClassName ">Не отгружено</a>
      </div>
    </div>
    <?= Html::a('Редактировать', Url::to(['loadings/editor', 'id' => $id]), ['class' => 'card-footer btn text-center p-1', 'target' => '_blank']) ?> 
  </div>
</div>