<?php 
use yii\bootstrap4\Modal;

$this->title = 'Погрузка товаров - Весь список';
?>

<h2><?= $this->title ?></h2>

<?php


Modal::begin([
  'title' => '<h4>Выберите транспорт</h4>',
  'toggleButton' => [
    'label' => 'Создать новую',
    'tag' => 'button',
    'class' => 'btn btn-success mb-2'
  ],
]); ?>

<form id="new-loading" method="POST" action="loadings/create" target="_blank">
  <div class="form-group">
    <select class="form-control mb-3" id="transport" name="transport" required>
        <option selected value="" disabled>Транспорт</option>
        <?php foreach ($transport as $t) {?>
        <?= "<option value='$t->id'>$t->name - $t->state_number</option>" ?>
        <?php } ?>
    </select>
    <div class="invalid-feedback">Необходимо выбрать транспорт</div>
  </div>
    <button type="submit" class="btn btn-primary float-right">Создать</button>
</form>

<?php Modal::end(); ?>

<div class="d-flex align-top">

  <?php foreach ($loadings as $loading) {
    echo $this->render('_loading-card', ['loading' => $loading]);
  }
  ?>

  <div class="card border-success mr-2 mb-2" style="width: 18rem;">
    <div class="card-header color-success">
      <div class="d-flex justify-content-between">
        <span>Погрузка №1 от 22.04.23</span>
        <a role="menu" data-toggle="dropdown" style="cursor: pointer; user-select: none;">
          ...
          <div class="dropdown-menu" >
            <a class="dropdown-item" href="#">Редактировать</a>
            <a class="dropdown-item" href="#">Зарегистировать оплату</a>
            <a class="dropdown-item" href="#">Груз отгружен</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Закрыть погрузку</a>
          </div>
        </a>
      </div>
    </div>
    <div class="card-body">
      <h6 class="card-subtitle mb-2 ">ГАЗель NEXT - A 226 ТУ</h6>
      <p class="card-text">
        Заказов <b>3</b> на сумму <b>4500 РУБ</b>.
        Всего товаров <b>10</b> весом <b>550 Кг</b>.
        Стоимость доставки: <b>500 РУБ</b>
      </p>
      <div class="d-flex justify-content-between">
        <a href="#" class="card-link text-success ">Отгружено</a>
        <a href="#" class="card-link text-success">Оплачено</a>
      </div>
    </div>
  </div>
  
  <div class="card border-dark mr-2 mb-2" style="width: 18rem;">
    <div class="card-header color-success">
      <div class="d-flex justify-content-between">
        <span>Погрузка №1 от 22.04.23</span>
        <a role="menu" data-toggle="dropdown" style="cursor: pointer; user-select: none;">
          ...
          <div class="dropdown-menu" >
            <span class="dropdown-item-text">Dropdown item text</span>
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </a>
      </div>
    </div>
    <div class="card-body">
      <h6 class="card-subtitle mb-2 ">ГАЗель NEXT - A 226 ТУ</h6>
      <p class="card-text">
        Заказов <b>3</b> на сумму <b>4500 РУБ</b>.
        Всего товаров <b>10</b> весом <b>550 Кг</b>.
        Стоимость доставки: <b>500 РУБ</b>
      </p>
      <div class="d-flex justify-content-between flex-wrap ">
        <a href="#" class="card-link text-success ml-0">Отгружено</a>
        <a href="#" class="card-link text-success ml-0">Оплачено</a>
      </div>
    </div>
    <div class="card-footer btn text-center p-1">
      Редактировать
    </div>
  </div>
</div>

<?php $js = <<<JS
  $('form#new-loading').on('submit', (e) => {
    setInterval(() => {
      window.location.reload();
    }, 10);
    return true;
  })
JS;

$this->registerJs($js, $this::POS_READY);
?>
