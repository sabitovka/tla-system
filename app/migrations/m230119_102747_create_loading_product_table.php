<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%loading_product}}`.
 */
class m230119_102747_create_loading_product_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
      $this->createTable('{{%loading_order_product}}', [
          'loading_order_id' => $this->integer(),
          'poduct_id' => $this->integer(),
          'PRIMARY KEY(loading_order_id, poduct_id)',
      ]);

      $this->createIndex('idx-loading_order_product-loading_order_id', '{{%loading_order_product}}', 'loading_order_id');

      $this->addForeignKey(
        'fk-loading_order_product-loading_order_id',
        '{{%loading_order_product}}',
        'loading_order_id',
        '{{%loading_order}}',
        'id'
      );

      $this->createIndex('idx-loading_order_product-poduct_id', '{{%loading_order_product}}', 'poduct_id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-loading_order_product-loading_order_id', '{{%loading_order_product}}');
        $this->dropIndex('idx-loading_order_product-loading_order_id', '{{%loading_order_product}}');
        $this->dropIndex('idx-loading_order_product-poduct_id', '{{%loading_order_product}}');

        $this->dropTable('{{%loading_order_product}}');
    }
}
