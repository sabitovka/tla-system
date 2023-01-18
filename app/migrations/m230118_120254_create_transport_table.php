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
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%transport}}');
    }
}
