document.addEventListener("DOMContentLoaded", () => {
  const carGrid = document.getElementById("car-grid");
  const languageSelector = document.getElementById('language-selector');

  // Get the current car ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const currentCarId = parseInt(urlParams.get('id'), 10);

  // Get the selected language from localStorage or default to 'en'
  const storedLanguage = localStorage.getItem('selectedLanguage') || 'en';
  
  // Set the language selector value to the stored language
  if (languageSelector) {
    languageSelector.value = storedLanguage;
  }

  // Fetch translations and car data based on selected language
  async function fetchTranslationsAndCars(lang) {
    // Fetch translations
    window.fetchTranslations(lang, (translations) => {
      window.currentTranslations = translations; // Save translations in global scope

      // Fetch cars with the language-specific data
      fetchCars(lang);
    });
  }

  async function fetchCars(lang) {
    try {
      const response = await fetch(`http://localhost:8000/rentcars/?lang=${lang}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const cars = await response.json();
      const translations = window.currentTranslations || {}; // Use current translations if available

      // Filter out the current car
      const otherCars = cars.filter(car => car.id !== currentCarId);
      displayCars(otherCars, translations);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  }

  function displayCars(cars, translations) {
    carGrid.innerHTML = ''; 
    cars.forEach(car => {
      const carItem = document.createElement('div');
      carItem.classList.add('car-item');
      carItem.innerHTML = `
        <a href="/show-car/car4.html?id=${car.id}">
          <img src="${car.image_url}" alt="${car.name}" class="image">
        </a>
        <div class="text-overlay">${car.name}</div>
        <p class="price-text">
          <span class="span-from">${translations.from || 'From'}</span>
          <span class="span-price">${car.price_per_day} €</span>/ 
          <span>${translations.per_day || 'Day'}</span>
        </p>
        <div class="proprities">
          <img src="/instruments-below-car/car-small.png">
          <p>${translations.year_label || 'Year:'}${car.year}</p>
          <img src="/instruments-below-car/gear-box.png">
          <p>${translations.transmission_label || ''}${car.transmission}</p>
          <img src="/instruments-below-car/fuel-pump.png">
          <p>${translations.fuel_type_label || ''}${car.fuel_type}</p>
        </div>
        <div class="rent-btn">
          <a href="/show-car/${car.id}.html" class="rent-now-btn">${translations.rent_now || 'Rent Now'}</a>
        </div>
      `;
      carGrid.appendChild(carItem);
    });
  }

  // Define this function to update translations when language changes
  window.updateCarTranslations = function(translations) {
    window.currentTranslations = translations; // Save translations to be used in fetchCars
    fetchCars(languageSelector.value); // Refresh cars with updated translations
  };

  // Fetch cars and translations based on the saved language
  fetchTranslationsAndCars(storedLanguage);

  // Event listener for language change
  languageSelector.addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    
    // Save the selected language to localStorage
    localStorage.setItem('selectedLanguage', selectedLanguage);
    
    // Fetch new translations and car data
    fetchTranslationsAndCars(selectedLanguage);
  });
});
