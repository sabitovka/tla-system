<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%loading}}`.
 */
class m230119_081659_create_loading_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%loading}}', [
            'id' => $this->primaryKey(),
            'creation_date' => $this->timestamp()->defaultExpression('NOW()'),
            'transport_id' => $this->integer(),
            'is_loaded' => $this->boolean()->defaultValue(false),
        ]);

        $this->addForeignKey(
          'fk-loading-transport-id',
          '{{%loading}}',
          'transport_id',
          '{{%transport}}',
          'id',
          'NO ACTION',
          'NO ACTION'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-loading-transport-id', '{{%loading}}');
        $this->dropTable('{{%loading}}');
    }
}
