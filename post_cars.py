import requests

def translate_text(text, lang):
    translations = {
        'ro': {
            'Automatic': 'Automat',
            'Diesel': 'Diesel',
            'Petrol': 'Benzină',
            'Hybrid': 'Hibrid',
            'From': 'De',
            'per day': 'pe zi'
        },
        'ru': {
            'Automatic': 'Автомат',
            'Diesel': 'Дизель',
            'Petrol': 'Бензин',
            'Hybrid': 'Гибрид',
            'From': 'От',
            'per day': 'в день'
        }
    }
    return translations.get(lang, {}).get(text, text)

def translate_car_data(cars, lang):
    translated_data = []
    for car in cars:

        name = car.get(f"name_{lang}", car.get("name_en", "Unknown"))

        translated_car = {
            "image_url": car["image_url"],
            "name_en": car.get("name_en", name),
            "name_ro": car.get("name_ro", translate_text(name, 'ro')),
            "name_ru": car.get("name_ru", translate_text(name, 'ru')),
            "price_per_day": car["price_per_day"],
            "per_day_en": car.get("per_day_en", translate_text("per day", 'en')),
            "per_day_ro": car.get("per_day_ro", translate_text("per day", 'ro')),
            "per_day_ru": car.get("per_day_ru", translate_text("per day", 'ru')),
            "year": car["year"],
            "transmission_en": car.get("transmission_en", car.get("transmission", "Unknown")),
            "transmission_ro": car.get("transmission_ro", translate_text(car.get("transmission", "Unknown"), 'ro')),
            "transmission_ru": car.get("transmission_ru", translate_text(car.get("transmission", "Unknown"), 'ru')),
            "fuel_type_en": car.get("fuel_type_en", car.get("fuel_type", "Unknown")),
            "fuel_type_ro": car.get("fuel_type_ro", translate_text(car.get("fuel_type", "Unknown"), 'ro')),
            "fuel_type_ru": car.get("fuel_type_ru", translate_text(car.get("fuel_type", "Unknown"), 'ru')),
            "from_en": car.get("from_en", translate_text("From", 'en')),
            "from_ro": car.get("from_ro", translate_text("From", 'ro')),
            "from_ru": car.get("from_ru", translate_text("From", 'ru')),
            "body_type": car.get("body_type", "Unknown")
            
        }
        translated_data.append(translated_car)
    return translated_data


def fetch_and_post_cars(lang):
    url = 'http://127.0.0.1:8000/rentcars/'
    car_data = [
        {
            "image_url": "/resources-images/GLS/Mercedes_GLS_Chirie_Auto_Chisinau.jpg",
            "name_en": "Mercedes-Benz GLS 350d",
            "name_ro": "Mercedes-Benz GLS 350d",
            "name_ru": "Mercedes-Benz GLS 350d",
            "price_per_day": 80.0,
            "per_day_en": "per day",
            "per_day_ro": "pe zi",
            "per_day_ru": "в день",
            "year": 2017,
            "transmission_en": "Automatic",
            "transmission_ro": "Automat",
            "transmission_ru": "Автомат",
            "fuel_type_en": "Diesel",
            "fuel_type_ro": "Diesel",
            "fuel_type_ru": "Дизель",
            "from_en": "From",
            "from_ro": "De",
            "from_ru": "От",
            "body_type": "Crossover"
        },
        {
            "image_url": "/resources-images/car2-img/Gle_1.jpg",
            "name_en": "Mercedes-Benz GLE",
            "name_ro": "Mercedes-Benz GLE",
            "name_ru": "Mercedes-Benz GLE",
            "price_per_day": 70.0,
            "per_day_en": "per day",
            "per_day_ro": "pe zi",
            "per_day_ru": "в день",
            "year": 2023,
            "transmission_en": "Automatic",
            "transmission_ro": "Automat",
            "transmission_ru": "Автомат",
            "fuel_type_en": "Diesel",
            "fuel_type_ro": "Diesel",
            "fuel_type_ru": "Дизель",
            "from_en": "From",
            "from_ro": "De",
            "from_ru": "От",
            "body_type": "Crossover"
        },
        {
            "image_url": "/resources-images/car3-img/Gla_1.jpg",
            "name_en": "Mercedes-Benz GLE AMG",
            "name_ro": "Mercedes-Benz GLE AMG",
            "name_ru": "Mercedes-Benz GLE AMG",
            "price_per_day": 60.0,
            "per_day_en": "per day",
            "per_day_ro": "pe zi",
            "per_day_ru": "в день",
            "year": 2018,
            "transmission_en": "Automatic",
            "transmission_ro": "Automat",
            "transmission_ru": "Автомат",
            "fuel_type_en": "Diesel",
            "fuel_type_ro": "Diesel",
            "fuel_type_ru": "Дизель",
            "from_en": "From",
            "from_ro": "De",
            "from_ru": "От",
            "body_type": "Crossover"
        },
        {
            "image_url": "/resources-images/car4-img/S_Class_1.jpg",
            "name_en": "Mercedes-Benz S Class",
            "name_ro": "Mercedes-Benz S Class",
            "name_ru": "Mercedes-Benz S Class",
            "price_per_day": 100.0,
            "per_day_en": "per day",
            "per_day_ro": "pe zi",
            "per_day_ru": "в день",
            "year": 2017,
            "transmission_en": "Automatic",
            "transmission_ro": "Automat",
            "transmission_ru": "Автомат",
            "fuel_type_en": "Diesel",
            "fuel_type_ro": "Diesel",
            "fuel_type_ru": "Дизель",
            "from_en": "From",
            "from_ro": "De",
            "from_ru": "От",
            "body_type": "Sedan"
        },
        {
            "image_url": "/resources-images/car5-img/E_Class_1.jpg",
            "name_en": "Mercedes-Benz E Class W213",
            "name_ro": "Mercedes-Benz E Class W213",
            "name_ru": "Mercedes-Benz E Class W213",
            "price_per_day": 50.0,
            "per_day_en": "per day",
            "per_day_ro": "pe zi",
            "per_day_ru": "в день",
            "year": 2020,
            "transmission_en": "Automatic",
            "transmission_ro": "Automat",
            "transmission_ru": "Автомат",
            "fuel_type_en": "Diesel",
            "fuel_type_ro": "Diesel",
            "fuel_type_ru": "Дизель",
            "from_en": "From",
            "from_ro": "De",
            "from_ru": "От",
            "body_type": "Sedan"
        },
        {
            "image_url": "/resources-images/car6-img/A5_11.jpg",
            "name_en": "Audi A5 Quattro",
            "name_ro": "Audi A5 Quattro",
            "name_ru": "Audi A5 Quattro",
            "price_per_day": 80.0,
            "per_day_en": "per day",
            "per_day_ro": "pe zi",
            "per_day_ru": "в день",
            "year": 2019,
            "transmission_en": "Automatic",
            "transmission_ro": "Automat",
            "transmission_ru": "Автомат",
            "fuel_type_en": "Petrol",
            "fuel_type_ro": "Benzină",
            "fuel_type_ru": "Бензин",
            "from_en": "From",
            "from_ro": "De",
            "from_ru": "От",
            "body_type": "Sedan"
        },
        {
            "image_url": "/resources-images/car7-img/Q7_1.jpg",
            "name_en": "Audi Q7",
            "name_ro": "Audi Q7",
            "name_ru": "Audi Q7",
            "price_per_day": 70.0,
            "per_day_en": "per day",
            "per_day_ro": "pe zi",
            "per_day_ru": "в день",
            "year": 2020,
            "transmission_en": "Automatic",
            "transmission_ro": "Automat",
            "transmission_ru": "Автомат",
            "fuel_type_en": "Petrol",
            "fuel_type_ro": "Benzină",
            "fuel_type_ru": "Бензин",
            "from_en": "From",
            "from_ro": "De",
            "from_ru": "От",
            "body_type": "SUV"
        },
        {
            "image_url": "/resources-images/car8-img/Koleos_1.jpg",
            "name_en": "Renault Koleos",
            "name_ro": "Renault Koleos",
            "name_ru": "Renault Koleos",
            "price_per_day": 35.0,
            "per_day_en": "per day",
            "per_day_ro": "pe zi",
            "per_day_ru": "в день",
            "year": 2017,
            "transmission_en": "Automatic",
            "transmission_ro": "Automat",
            "transmission_ru": "Автомат",
            "fuel_type_en": "Diesel",
            "fuel_type_ro": "Diesel",
            "fuel_type_ru": "Дизель",
            "from_en": "From",
            "from_ro": "De",
            "from_ru": "От",
            "body_type": "SUV"
        },
        {
            "image_url": "/resources-images/car9-img/X3.jpg",
            "name_en": "BMW X3",
            "name_ro": "BMW X3",
            "name_ru": "BMW X3",
            "price_per_day": 55.0,
            "per_day_en": "per day",
            "per_day_ro": "pe zi",
            "per_day_ru": "в день",
            "year": 2017,
            "transmission_en": "Automatic",
            "transmission_ro": "Automat",
            "transmission_ru": "Автомат",
            "fuel_type_en": "Diesel",
            "fuel_type_ro": "Diesel",
            "fuel_type_ru": "Дизель",
            "from_en": "From",
            "from_ro": "De",
            "from_ru": "От",
            "body_type": "SUV"
        },
        {
            "image_url": "/resources-images/car10-img/Volkswagen_Atlas.jpg",
            "name_en": "Volkswagen Atlas",
            "name_ro": "Volkswagen Atlas",
            "name_ru": "Volkswagen Atlas",
            "price_per_day": 60.0,
            "per_day_en": "per day",
            "per_day_ro": "pe zi",
            "per_day_ru": "в день",
            "year": 2020,
            "transmission_en": "Automatic",
            "transmission_ro": "Automat",
            "transmission_ru": "Автомат",
            "fuel_type_en": "Petrol",
            "fuel_type_ro": "Benzină",
            "fuel_type_ru": "Бензин",
            "from_en": "From",
            "from_ro": "De",
            "from_ru": "От",
            "body_type": "Minivan"
        },
        {
            "image_url": "/resources-images/car11-img/Toyota_Hyghlander.jpg",
            "name_en": "Toyota Highlander",
            "name_ro": "Toyota Highlander",
            "name_ru": "Toyota Highlander",
            "price_per_day": 70.0,
            "per_day_en": "per day",
            "per_day_ro": "pe zi",
            "per_day_ru": "в день",
            "year": 2018,
            "transmission_en": "Automatic",
            "transmission_ro": "Automat",
            "transmission_ru": "Автомат",
            "fuel_type_en": "Hybrid",
            "fuel_type_ro": "Hibrid",
            "fuel_type_ru": "Гибрид",
            "from_en": "From",
            "from_ro": "De",
            "from_ru": "От",
            "body_type": "Minivan"
        },
        {
            "image_url": "/resources-images/car12-img/Skoda_Kodiaq_Chirie.jpg",
            "name_en": "Skoda Kodiaq",
            "name_ro": "Skoda Kodiaq",
            "name_ru": "Skoda Kodiaq",
            "price_per_day": 50.0,
            "per_day_en": "per day",
            "per_day_ro": "pe zi",
            "per_day_ru": "в день",
            "year": 2019,
            "transmission_en": "Automatic",
            "transmission_ro": "Automat",
            "transmission_ru": "Автомат",
            "fuel_type_en": "Diesel",
            "fuel_type_ro": "Diesel",
            "fuel_type_ru": "Дизель",
            "from_en": "From",
            "from_ro": "De",
            "from_ru": "От",
            "body_type": "Minivan"
        }
    ]

    translated_car_data = translate_car_data(car_data, lang)
    
    try:
        response = requests.post(url, json=translated_car_data)
        response.raise_for_status()  
        print(f"Response: {response.json()}")
    except requests.exceptions.HTTPError as err:
        print(f"HTTP error occurred: {err}")
        print("Response Content:", response.content)
    except Exception as err:
        print(f"Other error occurred: {err}")

fetch_and_post_cars('ro')  