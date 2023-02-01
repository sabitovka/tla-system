<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%roles}}`.
 */
class m230201_065737_create_roles_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%roles}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
            'description' => $this->string(),
        ]);

        $this->insert('{{%roles}}', ['name' => 'Администратор', 'description' => 'Имеет полный доступ к системе']);
        $this->insert('{{%roles}}', ['name' => 'Зав. складом', 'description' => 'Имеет доступ ко всем функциям системы, за исключеием администрирования']);
        $this->insert('{{%roles}}', ['name' => 'Кладовщик', 'description' => 'Может составлять планы погрузки']);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%roles}}');
    }
}
