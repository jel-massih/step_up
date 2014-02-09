StepUp Messenger
====================

Stepup Messenger is a Messenging Community App Built for Step Up Womens Network


## Testing Messenger

### Requirements

* Apache HTTP Server
* MySQL Server
* PHP >5.2
* Git
* Composer
* Node

### Instructions

#### Step 1: Setup a development enviroment
You will need to setup a local *AMP enviroment (Apache, MySQL and PHP) in order to test StepUp Messenger. *AMP packages can be found for different platforms:

* [MAMP](http://www.mamp.info/en/index.html) for Mac OS
* [WAMP](http://www.wampserver.com/en/) for Windows
* [LAMP](https://help.ubuntu.com/community/ApacheMySQLPHP) for Linux

#### Step 2: Install git
You will need Git to keep your test version of StepUp up to date. Unless you already have Git installed, you can download it from [here](http://git-scm.com/).

#### Step 3: Pull down StepUp Messenger from github
Create a directory named "step_up" in the www root. Next, open the directory in the terminal and type:

```
$ git init
$ git clone https://github.com/jel-massih/step_up
```
#### Step 4: Install dependencies
StepUp uses composer to handle its php dependencies. Go to the `step_up/api/` folder and install composer:

```
$ curl -s https://getcomposer.org/installer | php
``` 
Then install the dependencies by executing:

```
$ php composer.phar install
```

#### Step 5: Setup the database
The AMP-packages listed above all include Phpmyadmin. The following three steps need to be completed in order to setup the database

1. Create the database
   1. Databases -> Create Database  
   2. Type *hackaccounts* as name and select *utf8_general_ci* as Collation. (Dont judge the name)
2. Create a user  
   1. Once you've created the database it will be visible in the left column – open it by clicking it.
   2. Privileges -> Add user
   3. Fill in *username* and *password*. Leave the other fields as defaults.
3. Import the database schema
   1. Import->File to Import->Choose file
   2. Open step_up/Dump20140209.sql
   3. Press Go  

#### Step 6: Setup Directus
Open `step_up/API/liv/db.setup.php` Add the database username and password from Step 5 to *DB_USER* and *DB_PASSWORD*. Save the file as ```step_up/API/db.php```

```
define('DB_USER', 		'myusername');
define('DB_PASSWORD',	'mypassword');
```
#### Step 7: Install Bower Dependencies

# Navigate to the /public_site folder

# Install global dependencies.  Depending on your user account you may need to
# gain elevated privileges using something like `sudo`.
npm install -g grunt-cli bower

# Optionally install coveralls (integration is baked in with Travis CI).
npm install -g coveralls

# Install NPM dependencies.
npm install

# Install Bower dependencies.
bower install



#### Step 8: Done!
Open StepUp App by navigating to the path *step_up/public_site* in your local host. Log in using the default user *admin@admin.com* and password *admin123*
