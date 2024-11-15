@echo off
REM Navigate to the project directory
cd "C:\Users\User\OneDrive\Desktop\cars rental + back-end - Restructured"

REM Check if the MySQL database exists, and create it if not
echo Checking if the database exists...
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS rentcarsdb;"

REM Import the database schema and data from the SQL files in Data.config folder
echo Importing the database schema and data...
mysql -u root -p rentcarsdb < "C:\Users\User\OneDrive\Desktop\cars rental + back-end - Restructured\Data.config\rentcarsdb_cars.sql"
mysql -u root -p rentcarsdb < "C:\Users\User\OneDrive\Desktop\cars rental + back-end - Restructured\Data.config\rentcarsdb_rentdescription.sql"

REM Start FastAPI server in a new terminal window
start cmd /k "uvicorn main:app --reload"

REM Wait a few seconds to ensure the server starts
timeout /t 4

REM Run post_cars.py
python post_cars.py

REM Start Flask server (cars.py) in a new terminal window
cd "C:\Users\User\OneDrive\Desktop\cars rental + back-end - Restructured\show-car"
start cmd /k "python cars.py"

REM Wait a few seconds to ensure Flask starts
timeout /t 4

REM Run databaseCars.py
python databaseCars.py

@echo All tasks completed!
