import os
import json
import mysql.connector

# Set the directory of this file
base_dir = os.path.dirname(os.path.abspath(__file__))
json_file_path = os.path.join(base_dir, 'cars.json')

def reset_database():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="sergiu2002",
        database="rentcarsdb"
    )
    cursor = connection.cursor()

    cursor.execute("DROP TABLE IF EXISTS rentdescription")

    cursor.execute(""" 
        CREATE TABLE rentdescription (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            year INT,
            transmission VARCHAR(255),
            transmissionRo VARCHAR(255),
            transmissionRu VARCHAR(255),
            fuel_type VARCHAR(255),
            fuel_typeRo VARCHAR(255),
            fuel_typeRu VARCHAR(255),
            engine_capacity DECIMAL(10, 2),
            body_type VARCHAR(255),
            body_typeRu VARCHAR(255),
            doors INT,
            seats INT,
            description TEXT,
            descriptionRo TEXT,
            descriptionRu TEXT,
            image_url VARCHAR(255),
            image_urls JSON,
            price_1_2_days INT,
            price_3_7_days INT,
            price_8_20_days INT,
            price_21_45_days INT,
            price_46_days INT
        )
    """)

    connection.commit()
    cursor.close()
    connection.close()

reset_database()

def load_cars_from_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except FileNotFoundError:
        print("Error: The file was not found.")
        return []
    except json.JSONDecodeError:
        print("Error: The file is not a valid JSON.")
        return []

def insert_cars_to_db(cars):
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="sergiu2002",
        database="rentcarsdb"
    )
    
    cursor = connection.cursor()
    
    # Prepare the SQL insert statement
    insert_query = """
    INSERT INTO rentdescription (
        name, year, transmission, transmissionRo, transmissionRu,
        fuel_type, fuel_typeRo, fuel_typeRu,
        engine_capacity, body_type, body_typeRu,
        doors, seats, description, descriptionRo, descriptionRu,
        image_url, image_urls,
        price_1_2_days, price_3_7_days, price_8_20_days,
        price_21_45_days, price_46_days
    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    
    # Loop through each car and insert it into the database
    for car in cars:
        try:
            # Check if image_urls is a list and convert it to a JSON string
            image_urls_json = json.dumps(car['image_urls']) if isinstance(car['image_urls'], list) else car['image_urls']

            prices = car.get('prices_per_day', {})
            price_1_2_days = int(prices.get('price_1_2_days', 0))  
            price_3_7_days = int(prices.get('price_3_7_days', 0))  
            price_8_20_days = int(prices.get('price_8_20_days', 0))  
            price_21_45_days = int(prices.get('price_21_45_days', 0))  
            price_46_days = int(prices.get('price_46_days', 0)) 

            cursor.execute(insert_query, (
                car['name'],
                car['year'],
                car['transmission'],
                car.get('transmissionRo', ''),  # New field for Romanian
                car.get('transmissionRu', ''),  # New field for Russian
                car['fuel_type'],
                car.get('fuel_typeRo', ''),  # New field for Romanian
                car.get('fuel_typeRu', ''),  # New field for Russian
                car['engine_capacity'],
                car['body_type'],
                car.get('body_typeRu', ''),  # New field for Russian
                car['doors'],
                car['seats'],
                car['description'],
                car.get('descriptionRo', ''),  # New field for Romanian
                car.get('descriptionRu', ''),  # New field for Russian
                car['image_url'],
                image_urls_json,
                price_1_2_days,
                price_3_7_days,
                price_8_20_days,
                price_21_45_days,
                price_46_days  
            ))
        except mysql.connector.Error as err:
            print(f"Error inserting car {car['name']}: {err}")

    # Commit the changes and close the connection
    connection.commit()
    cursor.close()
    connection.close()

def load_cars():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="sergiu2002",
        database="rentcarsdb"
    )
    
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM rentdescription")
    cars = cursor.fetchall()
    
    cursor.close()
    connection.close()
    
    return cars

def load_car_by_id(car_id):
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="sergiu2002",
        database="rentcarsdb"
    )
    
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM rentdescription WHERE id = %s", (car_id,))
    car = cursor.fetchone()

    if car and 'image_urls' in car:
        car['image_urls'] = json.loads(car['image_urls'])
    
    cursor.close()
    connection.close()
    
    return car

if __name__ == "__main__":
    cars_data = load_cars_from_json(json_file_path)
    
    if cars_data:
        insert_cars_to_db(cars_data)
        print("Data migration completed successfully!")
    else:
        print("No data to insert.")
