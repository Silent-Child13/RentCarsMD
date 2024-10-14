document.addEventListener("DOMContentLoaded", () => {
    const carGrid = document.getElementById("car-grid");
    const languageSelector = document.getElementById('language-selector');
    const featuredCarsTitle = document.getElementById('featured-cars-title');

    const urlParams = new URLSearchParams(window.location.search);
    const bodyType = urlParams.get('body_type');


    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    languageSelector.value = savedLanguage; 

    async function fetchCars(lang) {
        try {
            const response = await fetch(`http://localhost:8000/rentcars/body/${bodyType}?lang=${lang}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const cars = await response.json();
            console.log(cars);
            displayCars(cars, lang); 
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    }

    async function fetchTranslations(lang) {
        try {
            const response = await fetch(`http://localhost:8000/translate/${lang}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const translations = await response.json();
            return translations; 
        } catch (error) {
            console.error('Error fetching translations:', error);
            return {};
        }
    }


    function displayCars(cars, lang) {
        carGrid.innerHTML = ''; 

        const translations = window.currentTranslations || {}; 

        
        if (featuredCarsTitle) {
            featuredCarsTitle.textContent = translateBodyType(bodyType, translations);
        }

        cars.forEach(car => {
            const carItem = document.createElement('div');
            carItem.classList.add('car-item');

            
            const name = car[`name_${lang}`] || car.name_en;
            const transmission = car[`transmission_${lang}`] || car.transmission_en;
            const fuelType = car[`fuel_type_${lang}`] || car.fuel_type_en;

            carItem.innerHTML = `
                <a href="/show-car/car4.html?id=${car.id}">
                    <img src="${car.image_url}" alt="${name}" class="image">
                </a>
                <div class="text-overlay">${name}</div>
                <p class="price-text">
                    <span class="span-from">${translations.from || 'From'}</span>
                    <span class="span-price">${car.price_per_day} €</span>/ 
                    <span>${translations.per_day || 'Day'}</span>
                </p>
                <div class="proprities">
                    <img src="/instruments-below-car/car-small.png">
                    <p>${translations.year_label || 'Year:'} ${car.year}</p>
                    <img src="/instruments-below-car/gear-box.png">
                    <p>${translations.transmission_label || ''} ${transmission}</p>
                    <img src="/instruments-below-car/fuel-pump.png">
                    <p>${translations.fuel_type_label || ''} ${fuelType}</p>
                </div>
                <div class="rent-btn">
                    <a href="/show-car/${car.id}.html" class="rent-now-btn">${translations.rent_now || 'Rent Now'}</a>
                </div>
            `;

            carGrid.appendChild(carItem);
        });
    }

    window.updateCarTranslations = async function(translations) {
        window.currentTranslations = translations; 
        fetchCars(languageSelector.value); 
    };


    fetchCars(savedLanguage);
    fetchTranslations(savedLanguage).then(translations => {
        window.currentTranslations = translations; 
    });

    languageSelector.addEventListener('change', async (event) => {
        const selectedLanguage = event.target.value;

        localStorage.setItem('selectedLanguage', selectedLanguage);

        const translations = await fetchTranslations(selectedLanguage);
        console.log('Fetched translations:', translations); 
        
        window.currentTranslations = translations;
        
        fetchCars(selectedLanguage);
    });
});
