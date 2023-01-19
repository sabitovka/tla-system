<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%loading_order}}`.
 */
class m230119_101233_create_loading_order_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%loading_order}}', [
            'id' => $this->primaryKey(),
            'loading_id' => $this->integer(),
            'order_id' => $this->integer(),
        ]);

        $this->createIndex('idx-loading_order-loading_id', '{{%loading_order}}', 'loading_id');

        $this->addForeignKey(
          'fk-loading_order-loading_id',
          '{{%loading_order}}',
          'loading_id',
          '{{%loading}}',
          'id'
        );

        $this->createIndex('idx-loading_order-order_id', '{{%loading_order}}', 'order_id');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-loading_order-loading_id', '{{%loading_order}}');
        $this->dropIndex('idx-loading_order-loading_id', '{{%loading_order}}');
        $this->dropIndex('idx-loading_order-order_id', '{{%loading_order}}');

        $this->dropTable('{{%loading_order}}');
    }
}
