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

        
        $this->addForeignKey(
            'fk-loading_order-loading_id',
            '{{%loading_order}}',
            'loading_id',
            '{{%loading}}',
            'id'
        );
        
        $this->createIndex(
            'idx-order_id-loading_id',
            '{{%loading_order}}',
            ['loading_id', 'order_id'],
            true
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-loading_order-loading_id', '{{%loading_order}}');
        $this->dropIndex('idx-order_id-loading_id', '{{%loading_order}}');

        $this->dropTable('{{%loading_order}}');
    }
}
