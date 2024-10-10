from typing import Dict

def get_about_us_translations(lang: str) -> Dict[str, str]:
    about_us_translations = {
        "en": {
            "about_us_nav_title": "ABOUT US",
            "home_link_text": "Home",
            "vision_title": "Vision of the company",
            "vision_description": "Our vision is to become the most important operator in the Car Rental field from the Republic of Moldova, through continuous development of new relationships and opportunities, as well as the promise to always offer services of the highest quality.",
            "values_title": "Values of the company",
            "respect_description": "Respect: We work with our partners and suppliers with respect and integrity to develop and maintain long-term and mutually beneficial work relationships.",
            "passion_description": "Passion: We are truly passionate about our business. We look after our customers by showing the quality of our services; we promote creative and innovative ideas and solutions.",
            "excellence_description": "Excellence: We are committed to always being a high–performing organization focused on total satisfaction of the customer. We continuously analyze our processes and ourselves to become the best out of the best."
        },
        "ro": {
            "about_us_nav_title": "DESPRE NOI",
            "home_link_text": "Acasă",
            "vision_title": "Viziunea companiei",
            "vision_description": "Viziunea noastră este de a deveni cel mai important operator în domeniul închirierii de mașini din Republica Moldova, prin dezvoltarea continuă a noilor relații și oportunități, precum și prin promisiunea de a oferi întotdeauna servicii de cea mai înaltă calitate.",
            "values_title": "Valorile companiei",
            "respect_description": "Respect: Lucrăm cu partenerii și furnizorii noștri cu respect și integritate pentru a dezvolta și menține relații de muncă pe termen lung și reciproc avantajoase.",
            "passion_description": "Pasiune: Suntem cu adevărat pasionați de afacerea noastră. Ne ocupăm de clienții noștri arătând calitatea serviciilor noastre; promovăm idei și soluții creative și inovatoare.",
            "excellence_description": "Excelență: Ne angajăm să fim mereu o organizație de înaltă performanță, axată pe satisfacția totală a clientului. Ne analizăm continuu procesele și pe noi înșine pentru a deveni cei mai buni dintre cei mai buni."
        },
        "ru": {
            "about_us_nav_title": "О НАС",
            "home_link_text": "Главная",
            "vision_title": "Видение компании",
            "vision_description": "Наша цель — стать важнейшим оператором в сфере аренды автомобилей в Республике Молдова, через постоянное развитие новых отношений и возможностей, а также обещание всегда предоставлять услуги наивысшего качества.",
            "values_title": "Ценности компании",
            "respect_description": "Уважение: Мы работаем с нашими партнерами и поставщиками с уважением и честностью, чтобы развивать и поддерживать долгосрочные и взаимовыгодные рабочие отношения.",
            "passion_description": "Страсть: Мы искренне увлечены нашим бизнесом. Мы заботимся о наших клиентах, демонстрируя качество наших услуг; мы продвигаем креативные и инновационные идеи и решения.",
            "excellence_description": "Превосходство: Мы стремимся всегда быть высокоэффективной организацией, сосредоточенной на полном удовлетворении клиентов. Мы постоянно анализируем наши процессы и самих себя, чтобы стать лучшими из лучших."
        }
    }
    return about_us_translations.get(lang, about_us_translations['en'])