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

<div class="d-flex align-items-start flex-wrap row">

  <?php foreach ($loadings as $loading) {
    echo $this->render('_loading-card', ['loading' => $loading]);
  }
  ?>

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
