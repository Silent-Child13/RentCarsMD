document.addEventListener("DOMContentLoaded", () => {
  const carGrid = document.getElementById("car-grid");
  const languageSelector = document.getElementById('language-selector');
  const featuredCarsTitle = document.getElementById('featured-cars-title');

  const urlParams = new URLSearchParams(window.location.search);
  const bodyType = urlParams.get('body_type');


  // Fetch cars based on the selected language
  async function fetchCars(lang) {
      try {
          const response = await fetch(`http://localhost:8000/rentcars/body/${bodyType}?lang=${lang}`);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

          const cars = await response.json();
          console.log(cars); // Log the fetched car data
          displayCars(cars, lang); // Pass lang to displayCars
      } catch (error) {
          console.error('Error fetching cars:', error);
      }
  }

  async function fetchTranslations(lang) {
      try {
          const response = await fetch(`http://localhost:8000/translate/${lang}`);
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          
          const translations = await response.json();
          return translations; // Ensure this returns the translations
      } catch (error) {
          console.error('Error fetching translations:', error);
          return {}; // Return an empty object on error to avoid breaking the code
      }
  }

  // Display cars in the grid, with translations applied dynamically
  function displayCars(cars, lang) {
      carGrid.innerHTML = ''; // Clear existing cars from the grid

      const translations = window.currentTranslations || {}; // Ensure translations are applied

      // Update the <h2> based on body type
      if (featuredCarsTitle) {
          featuredCarsTitle.textContent = translateBodyType(bodyType, translations);
      }

      cars.forEach(car => {
          const carItem = document.createElement('div');
          carItem.classList.add('car-item');

          // Select the correct car attributes based on the current language
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

  fetchCars(languageSelector.value);

  languageSelector.addEventListener('change', async (event) => {
      const selectedLanguage = event.target.value;

      const translations = await fetchTranslations(selectedLanguage);
      console.log('Fetched translations:', translations); 
      
      window.currentTranslations = translations;
      
      fetchCars(selectedLanguage);
  });
});
