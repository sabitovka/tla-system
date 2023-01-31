<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%users}}`.
 */
class m230131_110027_create_users_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp() {
        $this->createTable('{{%users}}', [
            'id' => $this->primaryKey(),
            'username' => $this->string(),
            'password' => $this->string(),
            'auth_key' => $this->string()->defaultValue(\Yii::$app->security->generateRandomString()),
            'access_token' => $this->string(),
        ]);

        $this->insert('{{%users}}', [
            'username' => 'admin',
            'password' => 'admin'
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown() {
        $this->dropTable('{{%users}}');
    }
}
