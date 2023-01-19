<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%transport}}`.
 */
class m230118_120254_create_transport_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%transport}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
            'width' => $this->integer(),
            'height' => $this->integer(),
            'length' => $this->integer(),
            'load_capacity' => $this->integer(),
            'state_number' => $this->integer()
        ]);

        $this->createIndex('idx-state_number', '{{%transport}}', 'state_number', true);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropIndex('idx-state_number', '{{%transport}}');
        $this->dropTable('{{%transport}}');
    }
}
