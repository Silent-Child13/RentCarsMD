let translations = {};
let car = {};
let formattedEngineCapacity = '';

document.addEventListener("DOMContentLoaded", () => {
  const languageSelector = document.getElementById('language-selector');

  // Retrieve language from localStorage or set default to 'en'
  const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';

  // Set the selected language in the language selector dropdown
  languageSelector.value = selectedLanguage;

  // Function to fetch translations from the server
  window.fetchTranslations = async function(lang) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/translate/${lang}`);
      if (!response.ok) throw new Error("Translation fetch failed");

      translations = await response.json();
      setTimeout(() => {
       updateContent(translations);
      }, "100")
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  function updateContent(translations) {
    try {
      // Update elements with data-key attributes
      document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[key]) {
          element.innerHTML = translations[key];
        }
      });

      // Update static text for specific elements
      const heroTitle = document.querySelector('.hero h1');
      if (heroTitle) heroTitle.textContent = translations.hero_title || heroTitle.textContent;

      const heroSubtitle = document.querySelector('.hero p');
      if (heroSubtitle) heroSubtitle.textContent = translations.hero_subtitle || heroSubtitle.textContent;

      const bookNowBtn = document.querySelector('.book-now-btn');
      if (bookNowBtn) bookNowBtn.textContent = translations.book_now || bookNowBtn.textContent;

      const phoneElement = document.querySelector('.phone');
      if (phoneElement) {
        const phoneLabel = translations.phone || 'Phone:';
        const phoneNumber = '+37360123456'; // Static phone number
        phoneElement.innerHTML = `${phoneLabel} <img class="phone-img" src="/images/phone.png"> ${phoneNumber}`;
      }

      // Function to translate body type
      function translateBodyType(bodyType, translations) {
        switch (bodyType.toLowerCase()) {
          case 'sedan':
              return translations.sedan_cars || 'Sedan Cars';
          case 'suv':
              return translations.suv_cars || 'SUV Cars';
          case 'crossover':
              return translations.crossover_cars || 'Crossover Cars';
          case 'minivan':
              return translations.minivan_cars || 'Minivan Cars';
          case 'other': // Add this case for Other Cars
              return translations.other_cars || 'Other Cars'; // Return translation for Other Cars
          default:
              return translations.rent_cars || 'Rent Cars'; // Fallback to Rent Cars for unknown body types
        }
      }

      // Update featured cars heading
      const featuredCarsHeading = document.querySelector('.featured-cars h2[data-key="sedan_cars"]'); // Use data-key attribute
      if (featuredCarsHeading) {
        const bodyType = new URLSearchParams(window.location.search).get('body_type');
        
        // Use the translation for Rent Cars if bodyType is not provided or not recognized
        const translatedHeading = bodyType ? translateBodyType(bodyType, translations) : translations.sedan_cars || 'Rent Cars';

        featuredCarsHeading.textContent = translatedHeading; // Set the dynamic heading
      }

      // Update specific labels safely
      const pickupDateLabel = document.querySelector('label[data-key="pickup_date_label"]');
      if (pickupDateLabel) pickupDateLabel.textContent = translations.pickup_date_label || 'Pick Up Date';
      
      const pickupTimeLabel = document.querySelector('label[data-key="pickup_time_label"]');
      if (pickupTimeLabel) pickupTimeLabel.textContent = translations.pickup_time_label || 'Pick Up Time';
      
      const returnDateLabel = document.querySelector('label[data-key="return_date_label"]');
      if (returnDateLabel) returnDateLabel.textContent = translations.return_date_label || 'Return Date';
      
      const returnTimeLabel = document.querySelector('label[data-key="return_time_label"]');
      if (returnTimeLabel) returnTimeLabel.textContent = translations.return_time_label || 'Return Time';
      
      const pickupDatePlaceholder = document.getElementById('pickupDate');
      if (pickupDatePlaceholder) pickupDatePlaceholder.placeholder = translations.pickup_date;
  
      const pickupTimePlaceholder = document.getElementById('pickupTime');
      if (pickupTimePlaceholder) pickupTimePlaceholder.placeholder = translations.pickup_time;
  
      const returnDatePlaceholder = document.getElementById('returnDate');
      if (returnDatePlaceholder) returnDatePlaceholder.placeholder = translations.return_date;
  
      const returnTimePlaceholder = document.getElementById('returnTime');
      if (returnTimePlaceholder) returnTimePlaceholder.placeholder = translations.return_time;
  
      const discountCodePlaceholder = document.getElementById('discountCode');
      if (discountCodePlaceholder) discountCodePlaceholder.placeholder = translations.discount_code;

      const priceText = document.getElementById('priceText');
      if (priceText) priceText.textContent = translations.priceText;

      const dayElements = document.querySelectorAll('.pricing-list h4');
      dayElements.forEach((dayElement) => {
        dayElement.textContent = dayElement.textContent.replace(/Days|Zile|Дня/, translations.Day || 'Days');
      });

      const yearLabel = document.querySelector('li .label[data-key="year_label"]');
      console.log(yearLabel);
      if (yearLabel) yearLabel.innerHTML = translations.year || 'Year:';
      
      const gearboxLabel = document.querySelector('li .label[data-key="gearbox_label"]');
      if (gearboxLabel) gearboxLabel.innerHTML = translations.gearbox || 'Gearbox:';
      
      const fuelTypeLabel = document.querySelector('li .label[data-key="fuel_type_label"]');
      if (fuelTypeLabel) fuelTypeLabel.innerHTML = translations.fuel_type || 'Fuel Type:';
      
      const engineCapacityLabel = document.querySelector('li .label[data-key="engine_capacity_label"]');
      if (engineCapacityLabel) engineCapacityLabel.innerHTML = translations.engine_capacity || 'Engine Capacity:';
      
      const carBodyTypeLabel = document.querySelector('li .label[data-key="car_body_type_label"]');
      if (carBodyTypeLabel) carBodyTypeLabel.innerHTML = translations.car_body_type || 'Car Type Body:';
      
      const doorsNumberLabel = document.querySelector('li .label[data-key="doors_number_label"]');
      if (doorsNumberLabel) doorsNumberLabel.innerHTML = translations.doors_number || 'Doors Number:';
      
      const seatsNumberLabel = document.querySelector('li .label[data-key="seats_number_label"]');
      if (seatsNumberLabel) seatsNumberLabel.innerHTML = translations.seats_number || 'Seats Number:';

      const finalPriceLabel = document.querySelector('h2[data-key="final_price_label"]');
      if (finalPriceLabel) finalPriceLabel.textContent = translations.final_price_label || 'Final Price';
      
      const nightFeeText = document.getElementById('nightFeeText');
      if (nightFeeText) nightFeeText.textContent = translations.night_pickup_fee || 'Night pick-up fee +20 €';

      const nightFeeReturnText = document.getElementById('nightFeeText');
      if (nightFeeText) nightFeeReturnText.textContent = translations.night_return_fee || 'Night pick-up fee +20 €';
      
      const discountAmountText = document.getElementById('discountAmountText');
      if (discountAmountText) discountAmountText.textContent = translations.discount_applied || 'Discount applied';
      
      const finalPriceText = document.getElementById('finalPriceText');
      if (finalPriceText) finalPriceText.textContent = translations.final_price || 'Final Price';
      
      const invalidDateOrTimeText = document.getElementById('invalidDateOrTimeText');
      if (invalidDateOrTimeText) invalidDateOrTimeText.textContent = translations.invalid_date_or_time || 'Invalid date or time';

      const pricePerDayLabel = document.querySelector('label[data-key="price_per_day"]');
      if (pricePerDayLabel) pricePerDayLabel.textContent = translations.price_per_day || 'Price per day';
      
      const totalDaysLabel = document.querySelector('label[data-key="total_days"]');
      if (totalDaysLabel) totalDaysLabel.textContent = translations.total_days || 'Total days';

      // Check for specific paths to call updateCarTranslations
      if (window.location.pathname === '/index.html' || 
          window.location.pathname === '/airport-info/airport.html' || 
          window.location.pathname === '/nav-rent-cars/rent-fleet.html' || 
          window.location.pathname === '/show-car/car4.html') {
        if (window.updateCarTranslations) {
          window.updateCarTranslations(translations);
        }
      }

    } catch (error) {
      console.error('Error updating content:', error);
    }
  }

  // Fetch and update translations based on selected language
  fetchTranslations(selectedLanguage);

  // Handle language selector changes
  languageSelector.addEventListener('change', () => {
    const lang = languageSelector.value;

    // Save the selected language to localStorage
    localStorage.setItem('selectedLanguage', lang);

    // Fetch and update translations
    fetchTranslations(lang);
  });
});
