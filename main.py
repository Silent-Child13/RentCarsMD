from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.staticfiles import StaticFiles
from database import engine, SessionLocal, get_db
from models import Base, Car
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from translations.translations import get_translation
from translations.partner import get_translations
from translations.about_us import get_about_us_translations
from translations.contact import get_contact_translations
from translations.terms import get_terms_translations


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/translations", StaticFiles(directory="translations"), name="translations")
app.mount("/show-car", StaticFiles(directory="show-car"), name="show-car")
app.mount("/resources-images", StaticFiles(directory="resources-images"), name="resources-images")

def reset_database():
    # Drop all tables
    Base.metadata.drop_all(bind=engine)
    # Create all tables
    Base.metadata.create_all(bind=engine)

# Call the function to reset the database
reset_database()

class CarCreate(BaseModel):
    image_url: str
    name_en: str
    name_ro: str
    name_ru: str
    price_per_day: float
    per_day_en: str
    per_day_ro: str
    per_day_ru: str
    year: int
    transmission_en: str
    transmission_ro: str
    transmission_ru: str
    fuel_type_en: str
    fuel_type_ro: str
    fuel_type_ru: str
    from_en: str
    from_ro: str
    from_ru: str
    body_type: str 

@app.post("/rentcars/")
def create_cars(cars: List[CarCreate], db: Session = Depends(get_db)):
    created_cars = []
    for car in cars:
        existing_car = db.query(Car).filter(
            Car.name_en == car.name_en,
            Car.year == car.year,
            Car.price_per_day == car.price_per_day
        ).first()

        if existing_car:
            created_cars.append(existing_car)
        else:
            db_car = Car(
                image_url=car.image_url,
                name_en=car.name_en,
                name_ro=car.name_ro,
                name_ru=car.name_ru,
                price_per_day=car.price_per_day,
                per_day_en=car.per_day_en,
                per_day_ro=car.per_day_ro,
                per_day_ru=car.per_day_ru,
                year=car.year,
                transmission_en=car.transmission_en,
                transmission_ro=car.transmission_ro,
                transmission_ru=car.transmission_ru,
                fuel_type_en=car.fuel_type_en,
                fuel_type_ro=car.fuel_type_ro,
                fuel_type_ru=car.fuel_type_ru,
                from_en=car.from_en,
                from_ro=car.from_ro,
                from_ru=car.from_ru,
                body_type=car.body_type
            )
            db.add(db_car)
            db.commit()
            db.refresh(db_car)
            created_cars.append(db_car)
    
    return created_cars

@app.get("/rentcars/")
def get_cars(lang: str = 'en', db: Session = Depends(get_db)):
    cars = db.query(Car).all()
    for car in cars:
        car.name = getattr(car, f'name_{lang}', car.name_en)
        car.transmission = getattr(car, f'transmission_{lang}', car.transmission_en)
        car.fuel_type = getattr(car, f'fuel_type_{lang}', car.fuel_type_en)
        car.per_day = getattr(car, f'per_day_{lang}', car.per_day_en)
        car.from_field = getattr(car, f'from_{lang}', car.from_en)

    return cars

@app.get("/rentcars/{car_id}")
def get_car(car_id: int, db: Session = Depends(get_db)):
    car = db.query(Car).filter(Car.id == car_id).first()
    if car is None:
        raise HTTPException(status_code=404, detail="Car not found")
    return car

@app.get("/rentcars/body/{body_type}")
def get_cars_by_body_type(body_type: str, lang: str = 'en', db: Session = Depends(get_db)):
    cars = db.query(Car).filter(Car.body_type == body_type).all()
    if not cars:
        raise HTTPException(status_code=404, detail=f"No cars found for body type: {body_type}")

    for car in cars:
        car.name = getattr(car, f'name_{lang}', car.name_en)
        car.transmission = getattr(car, f'transmission_{lang}', car.transmission_en)
        car.fuel_type = getattr(car, f'fuel_type_{lang}', car.fuel_type_en)
        car.per_day = getattr(car, f'per_day_{lang}', car.per_day_en)
        car.from_field = getattr(car, f'from_{lang}', car.from_en)

    return cars

@app.get("/translate/{lang}")
def translate(lang: str):
    return get_translation(lang)

class TranslationResponse(BaseModel):
    airport_info: str

@app.get("/translate/{lang}", response_model=TranslationResponse)
def translate(lang: str):
    translation = get_translation(lang)
    return TranslationResponse(
        airport_info=translation.get("airport_info", "")
    )

@app.get("/partner/{lang}")
async def get_partner_translations(lang: str):
    translation = get_translations(lang)
    if translation:
        return {"partner_translation": translation}
    else:
        raise HTTPException(status_code=404, detail="Translation not found")
    
@app.get("/about-us/{lang}")
async def get_about_us_translations_endpoint(lang: str):
    translation = get_about_us_translations(lang)
    if translation:
        return {"about_us_translation": translation}
    else:
        raise HTTPException(status_code=404, detail="Translation not found")
    
@app.get("/contact/{lang}")
async def get_contact_translations_route(lang: str):
    translation = get_contact_translations(lang)
    if translation:
        return {"contact_translations": translation}
    else:
        raise HTTPException(status_code=404, detail="Translation not found")
    
@app.get("/terms/{lang}")
async def get_terms_translations_route(lang: str):
    translation = get_terms_translations(lang)
    if translation:
        return {"terms_translations": translation}
    else:
        raise HTTPException(status_code=404, detail="Translation not found")