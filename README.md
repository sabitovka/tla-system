<p align="center">
    <a href="https://donntu.ru/" target="_blank">
        <img src="https://donntu.ru/sites/default/files/images/gerb_donntu_large.jpg" height="150px">
    </a>
    <a href="http://asu-cs.donntu.ru/" target="_blank">
        <img src="http://asu-cs.donntu.ru/sites/default/files/22222_1.png" height="150px">
    </a>
    <h2 align="center">Donetsk National Technical University / Department of Automated Control Systems</h2>
    <br>
</p>

# Transport Loading Accounting System - TLA
Web-based system for accounting for the loading of goods transport during transportation. It is carried out within the framework of a course project on the discipline "Designing web-oriented computer systems" at Donetsk National Technical University.

## Prerequisites

Ensure you have the following installed:

* [PHP](https://www.php.net/downloads.php) version >= 7.2.
* [Node.js](https://nodejs.org/en/) version >= 12.18.3.
* [npm](https://www.npmjs.com/) version >= 8.19.2.
* [Composer](https://getcomposer.org/download/) version 2.4.
* Any RDBMS, for example, [MySQL](https://downloads.mysql.com/archives/installer/?version=5.6.26) version 5.6.

## Installation and Running

### To install the project, follow these steps:

1. Clone the project
```cmd
git clone git@github.com:sabitovka/tla-system.git tla && cd tla
```

2. Install dependencies:
    * to fake api server;
    * to editor client;
    * to app server.

```cmd 
cd fake-api && npm install && cd ..
cd editor && npm install && cd ..
cd app && composer install
```

3. Prepare the database to work with the system

    Create a database named `tla` or whatever you wish.

    Edit the file `app/config/db.php` with real data, for example:

```php
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=tla',
    'username' => 'root',
    'password' => '1234',
    'charset' => 'utf8',
];
```

>**NOTES:**
>- This won't create the database for you, this has to be done manually before you can access it.
>- Check and edit the other files in the `config/` directory to customize your application as required.

Run migrations to the database with the following command:

```cmd
composer run-script migrate
```

5. Build the editor application

```cmd
cd .. && cd editor
npm run build
```

Install the static server:

```cmd
npm install http-server -g
```

### To run the project, follow these steps:
1. Run the fake API server

    Launch a new terminal instance and enter following

```cmd
cd fake-api
node index.js
```

2. Run the editor application build

    Launch a new terminal instance and enter following
    
```cmd
cd editor
http-server build -p 3000
```

>**NOTE**
>
>before building the editor application you need to specify an url to the application server in the file `editor\src\config\default.js`. If you are not sure leave the default.

3. Run the application 

    Launch a new terminal instance and enter following

```cmd
cd app\web
php -S 0.0.0.0:8080
```
Тow you can go to `localhost:8080` and work with the system