<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "user".
 *
 * @property string $name
 * @property int $phone
 * @property string $email
 * @property string $password
 */
class User extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'phone', 'email', 'password'], 'required'],
            [['phone'], 'integer'],
            [['name', 'email'], 'string', 'max' => 50],
            [['password'], 'string', 'max' => 1000],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'name' => 'Name',
            'phone' => 'Phone',
            'email' => 'Email',
            'password' => 'Password',
        ];
    }
}
