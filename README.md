![gosports](https://raw.githubusercontent.com/asmltd/gosports/master/gosports_logo.png)

## Manage and Monitor http://www.gosportsfoundation.in Athletes


## Configuring GoSports project with Heroku:

#### Requirements:
* You should have a heroku account created


### Steps to start with heroku
* Navigate to webapp/ folder and do git init (this will generate git repo for versioning)
* Login into your heroku account (use `heroku login`)
* Create an heroku app using the command `heroku create asm-gosports` here asm-gosports is app name, anything can be given on this place
* Execute `echo ".py[cod]" > .gitignore` to generate an .gitignore file
* Now go to webapp/settings.py amd add "asm-gosports.herokuapp.com" to ALLOWED_HOSTS
* Disable CollectStatic with `heroku config:set DISABLE_COLLECTSTATIC=1` command
* Add the origin to the app `heroku git:remote -a asm-gosports`
* Add files to git `git add .`
* Commit the files `git commit -m "Initial Commit"`
* Push our code to Heroku `git push heroku master`
* This will start the app in "https://asm-gosports.herokuapp.com/"


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
	* Create database using the command `mysql>create database gosports_1;` (this may change based on DATABASES in django Settings.py)
	* grant permissions with `mysql>grant all on gosports_1.* to 'gosports_1'@'localhost' identified by 'PASSWORD';`

### Starting the Server
* We have to install the reqired packages for running the app, execute the below command to install the required packages
	* `pip install -r requirements.txt`
* Before starting follow the below steps
	* `python manage.py makemigrations `
	* `python manage.py migrate`
	* `python manage.py createsuperuser`

* Start the server using `python manage.py runserver`
* Now we can hit on http://localhost:8000 to start.

### API Documents to follow
* ...


