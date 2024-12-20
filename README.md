# RentCarsMD

My Rental  Car Project

This project is a car rental platform with a FastAPI back-end and Flask front-end. It includes a MySQL database that needs to be set up before running the application.

Prerequisites

Before setting up the project, make sure you have the following installed:

- MySQL (for the database)
- Python 3.x
- Pip (for managing Python packages)

Setting Up the Project

1. Clone the Repository

Clone the repository to your local machine:

git clone https://github.com/Silent-Child13/RentCarsMD
cd RentCarsMD

2. Create the MySQL Database

You need to create and import the database schema before running the project.

a. Create a New Database

You can create the database using MySQL Workbench

- Using MySQL Workbench:
  1. Open MySQL Workbench and log in.
  2. Create a new database called rentcarsdb:
     CREATE DATABASE rentcarsdb;

Import the SQL files from the Data.config folder to create the tables and insert data.

- Using MySQL Workbench:
  1. Go to Server > Data Import.
  2. Choose Import from Self-Contained File and select the files:
     - rentcarsdb_cars.sql
     - rentcarsdb_rentdescription.sql
  3. Select the target database (rentcarsdb).
  4. Click Start Import.

3. Update Database Credentials

Ensure your .env or configuration files have the correct MySQL credentials. Here's an example .env file:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=rentcarsdb

Update the DB_PASSWORD with the password you use for MySQL.

4. Install Dependencies
   pip install -r requirements.txt

5. Running the Project

Start the Servers Automatically (using start.bat)

The project includes a start.bat file that will automatically:

1. Set up the database and import the schema.
2. Start the FastAPI server.
3. Start the Flask server.
4. Run additional Python scripts.

To run the project, double-click the start.bat file or execute it from the command line:

start.bat

This will launch the FastAPI and Flask servers, and it will also execute post_cars.py, databaseCars.py, and other relevant scripts.

Manually Running the Servers (if needed)

You can manually run each server and script if you prefer not to use the start.bat file.

Start FastAPI Server:
uvicorn main:app --reload

Run post_cars.py:
python post_cars.py

Start Flask Server:
Navigate to the Flask app directory:
cd show-car
python cars.py

Run databaseCars.py:
python databaseCars.py

6. Accessing the Application

Once the servers are running, you can access:

FastAPI Server at http://127.0.0.1:8000
Flask Server at http://127.0.0.1:5000

Troubleshooting

If you encounter any issues with database access or server startup, ensure that:
- MySQL is running and the rentcarsdb database exists.
- The .env or configuration files have the correct MySQL credentials.
- The necessary dependencies are installed.


