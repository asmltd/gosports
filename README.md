![gosports](https://raw.githubusercontent.com/asmltd/gosports/master/gosports_logo.png)

## Manage and Monitor http://www.gosportsfoundation.in Athletes

### Setup Working Environment:
* Make Sure all dependencies and packages are installed for working with Django
* If not you can follow the installation steps from https://tutorial.djangogirls.org/en/installation/ 
* We are using PyCharm Community edition for development and debugging, you can download it from https://www.jetbrains.com/pycharm/download/ 
* Setting up Django in Virtual Environment
	* Install venv using the command `sudo apt-get install python3.4-venv`
	* Use `python3 -m venv myvenv  / sudo apt-get install python-virtualenv` command to create the virtual environment anywhere
	* To get inside the virtual environment use `source myvenv/bin/activate`

* Creating MySql Database
	* Get into Database as root user `mysql -uroot -ppassword`
	* Create database using the command `mysql>create database gosports_1` (this may change based on DATABASES in django Settings.py)
	* grant permissions with `mysql>grant all on gosports_1.* to 'gosports_1'@'localhost' identified by 'PASSWORD';`

### Starting the Server
* Before starting follow the below steps
	* `python manage.py makemigrations `
	* `python manage.py migrate`
	* `python manage.py createsuperuser`

* Start the server using `python manage.py runserver`
* Now we can hit on http://localhost:8000 to start.

### API Documents to follow
* ...


