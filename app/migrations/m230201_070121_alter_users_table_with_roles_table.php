<?php

use yii\db\Migration;

/**
 * Class m230201_070121_alter_users_table_with_roles_table
 */
class m230201_070121_alter_users_table_with_roles_table extends Migration
{
    
    public function safeUp() {
        $this->addColumn('{{%users}}', 'role_id', 'integer not null');
        $this->addColumn('{{%users}}', 'active', 'boolean default 1');

        $this->truncateTable('{{%users}}');

        $this->addForeignKey(
            'fk-users-roles-id',
            '{{%users}}',
            'role_id',
            '{{%roles}}',
            '{{%id}}'
        );

        $adminRoleId = (new \yii\db\Query())
            ->select(['id'])
            ->from('{{%roles}}')
            ->where(['name' => 'Администратор'])
            ->one()['id'];

        $this->insert('{{%users}}', [
            'username' => 'admin',
            'password' => 'admin',
            'role_id' => $adminRoleId
        ]);

    }

    
    public function safeDown()
    {
        $this->dropForeignKey('fk-users-roles-id', '{{%users}}');

        $this->dropColumn('{{%users}}', 'role_id');
        $this->dropColumn('{{%users}}', 'active');
    }
}
