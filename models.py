from sqlalchemy import Column, Integer, String, Float
from database import Base

class Car(Base):
    __tablename__ = 'cars'

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String(255), index=True)  
    name_en = Column(String(255))
    name_ro = Column(String(255))
    name_ru = Column(String(255))
    price_per_day = Column(Float)
    per_day_en = Column(String(255))
    per_day_ro = Column(String(255))
    per_day_ru = Column(String(255))
    year = Column(Integer)
    transmission_en = Column(String(255))
    transmission_ro = Column(String(255))
    transmission_ru = Column(String(255))
    fuel_type_en = Column(String(255))
    fuel_type_ro = Column(String(255))
    fuel_type_ru = Column(String(255))
    from_en = Column(String(255))
    from_ro = Column(String(255))
    from_ru = Column(String(255))
    body_type = Column(String(50))
