document.addEventListener("DOMContentLoaded", () => {
  const carGrid = document.getElementById("car-grid");
  const languageSelector = document.getElementById('language-selector');

  // Get the current car ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const currentCarId = parseInt(urlParams.get('id'), 10);

  async function fetchCars(lang) {
    try {
      const response = await fetch(`http://localhost:8000/rentcars/?lang=${lang}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const cars = await response.json();
      console.log(cars); // Inspect the fetched data
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

  // Define this function in script.js
  window.updateCarTranslations = function(translations) {
    window.currentTranslations = translations; // Save translations to be used in fetchCars
    fetchCars(languageSelector.value); // Refresh cars with updated translations
  };

  // Initial fetch for cars with the default language
  fetchCars(languageSelector.value);

  // Event listener for language change
  languageSelector.addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    window.fetchTranslations(selectedLanguage);
  });
});
