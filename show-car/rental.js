document.addEventListener('DOMContentLoaded', function () {
  const now = new Date(); // Get the current date and time

  // Flatpickr for Pickup Date
  const pickupDatePicker = flatpickr("#pickupDate", {
    dateFormat: "d-m-Y",
    altInput: true,
    altFormat: "d-m-Y",
    allowInput: true,
    minDate: now, // Prevent selecting past dates
    onChange: function (selectedDates) {
      // Update the minimum date of the return date based on the selected pickup date
      const selectedPickupDate = selectedDates[0];
      if (selectedPickupDate) {
        returnDatePicker.set('minDate', selectedPickupDate); // Set min date to pickup date
      }
    },
    onReady: function(selectedDates, dateStr, instance) {
      const inputElement = instance.altInput; // Get the Flatpickr input element
      if (inputElement) {
        inputElement.placeholder = translations.pickup_date || 'DD-MM-YYYY';
      }
    }
  });

  // Flatpickr for Return Date
  const returnDatePicker = flatpickr("#returnDate", {
    dateFormat: "d-m-Y",
    altInput: true,
    altFormat: "d-m-Y",
    allowInput: true,
    minDate: now, // Prevent selecting past dates initially
    onReady: function(selectedDates, dateStr, instance) {
      const inputElement = instance.altInput; // Get the Flatpickr input element
      if (inputElement) {
        inputElement.placeholder = translations.return_date || 'DD-MM-YYYY';
      }
    }
  });

  // Flatpickr for Pickup Time
  flatpickr("#pickupTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    altInput: true,
    altFormat: "H:i",
    time_24hr: true,
    allowInput: true,
    minTime: now.getHours() + ":" + now.getMinutes(), // Prevent selecting past times
    onOpen: function (selectedDates, dateStr, instance) {
      // Dynamically update minTime when the date picker opens
      const selectedDate = new Date(document.getElementById('pickupDate').value.split('-').reverse().join('-'));
      if (selectedDate.toDateString() === now.toDateString()) {
        instance.set('minTime', now.getHours() + ":" + now.getMinutes()); // Restrict to future times today
      } else {
        instance.set('minTime', '00:00'); // Allow any time for future dates
      }
    },
    onReady: function(selectedDates, dateStr, instance) {
      const inputElement = instance.altInput; // Get the Flatpickr input element
      if (inputElement) {
        inputElement.placeholder = translations.pickup_time || 'HH:MM';
      }
    }
  });

  // Flatpickr for Return Time
  flatpickr("#returnTime", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    altInput: true,
    altFormat: "H:i",
    time_24hr: true,
    allowInput: true,
    onReady: function(selectedDates, dateStr, instance) {
      const inputElement = instance.altInput; // Get the Flatpickr input element
      if (inputElement) {
        inputElement.placeholder = translations.return_time || 'HH:MM';
      }
    }
  });

  // Language selector event listener
  document.getElementById('language-selector').addEventListener('change', function () {
    const selectedLanguage = this.value; // Get the selected language value

    // Update placeholders based on translations
    const pickupDateInput = document.querySelector("#pickupDate + .flatpickr-input");
    const pickupTimeInput = document.querySelector("#pickupTime + .flatpickr-input");
    const returnDateInput = document.querySelector("#returnDate + .flatpickr-input");
    const returnTimeInput = document.querySelector("#returnTime + .flatpickr-input");
    const discountCodeInput = document.getElementById('discountCode');

    if (pickupDateInput) pickupDateInput.placeholder = translations.pickup_date || 'DD-MM-YYYY';
    if (pickupTimeInput) pickupTimeInput.placeholder = translations.pickup_time || 'HH:MM';
    if (returnDateInput) returnDateInput.placeholder = translations.return_date || 'DD-MM-YYYY';
    if (returnTimeInput) returnTimeInput.placeholder = translations.return_time || 'HH:MM';
    if (discountCodeInput) discountCodeInput.placeholder = translations.discount_code || '';

    // Load the locale file dynamically based on selected language
    let localeScript = '';
    
    if (selectedLanguage === 'ro') {
      localeScript = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/ro.js';
    } else if (selectedLanguage === 'ru') {
      localeScript = 'https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/ru.js';
    }

    if (localeScript) {
      const script = document.createElement('script');
      script.src = localeScript;
      script.onload = function () {
        // After loading, localize Flatpickr
        flatpickr.localize(window.flatpickr.l10ns[selectedLanguage]);
        // Update the datepickers to apply the new locale
        pickupDatePicker.set('locale', selectedLanguage);
        returnDatePicker.set('locale', selectedLanguage);
      };
      document.body.appendChild(script);
    } else {
      // If English is selected or any other language
      flatpickr.localize(flatpickr.l10ns.default);
      pickupDatePicker.set('locale', 'default');
      returnDatePicker.set('locale', 'default');
    }
  });

  // Handle language changes
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get('id');
  let carPricing = {};

  // Disable form until data is fetched
  const rentalForm = document.getElementById('rentalForm');
  rentalForm.classList.add('loading');

  // Fetch the car's pricing data
  async function fetchCarPricing() {
    try {
      const response = await fetch(`http://127.0.0.1:5000/rentdescription/${carId}`);
      const car = await response.json();

      carPricing = {
        price_1_2_days: car.price_1_2_days,
        price_3_7_days: car.price_3_7_days,
        price_8_20_days: car.price_8_20_days,
        price_21_45_days: car.price_21_45_days,
        price_46_days: car.price_46_days
      };

      // Remove the loading state and allow input
      rentalForm.classList.remove('loading');
    } catch (error) {
      console.error("Failed to fetch car data:", error);
      document.getElementById('finalPriceText').innerText = 'Error fetching car pricing data';
    }
  }

  // Fetch car pricing data when the page loads
  fetchCarPricing();

  // Add form event listener for price calculation
  rentalForm.addEventListener('input', calculatePrice);

  // Function to calculate price
  function calculatePrice() {
    // Ensure pricing data is available before calculating
    if (Object.keys(carPricing).length === 0) {
      return; // Exit if pricing data is not yet available
    }

    const pickupDate = document.getElementById('pickupDate').value;
    const pickupTime = document.getElementById('pickupTime').value;
    const returnDate = document.getElementById('returnDate').value;
    const returnTime = document.getElementById('returnTime').value;
    const discountCode = document.getElementById('discountCode').value.trim().toLowerCase();

    if (!pickupDate || !pickupTime || !returnDate || !returnTime) {
      // Hide all price-related elements if any field is empty
      document.querySelector('.night-fee').style.display = 'none';
      document.getElementById('priceDetails').style.display = 'none';
      document.getElementById('discountAmountText').style.display = 'none';
      document.getElementById('finalPriceText').style.display = 'none';
      return; // Exit if fields are not valid
    }

    const pickupDateTime = `${pickupDate.split('-').reverse().join('-')}T${pickupTime}`;
    const returnDateTime = `${returnDate.split('-').reverse().join('-')}T${returnTime}`;

    const pickup = new Date(pickupDateTime);
    const returnDateObj = new Date(returnDateTime);

    if (isNaN(pickup.getTime()) || isNaN(returnDateObj.getTime())) {
      document.getElementById('finalPriceText').innerText = translations.invalid_date_or_time; // Use translation for invalid date
      return;
    }

    const days = Math.ceil((returnDateObj - pickup) / (1000 * 60 * 60 * 24));
    let pricePerDay = 0;

    if (days <= 2) {
      pricePerDay = carPricing.price_1_2_days;
    } else if (days <= 7) {
      pricePerDay = carPricing.price_3_7_days;
    } else if (days <= 20) {
      pricePerDay = carPricing.price_8_20_days;
    } else if (days <= 45) {
      pricePerDay = carPricing.price_21_45_days;
    } else {
      pricePerDay = carPricing.price_46_days;
    }

    let price = pricePerDay * days;

    // Add night fee if applicable
    const pickupHour = pickup.getHours();
    const returnHour = returnDateObj.getHours();
    const nightFee = 20;
    let nightFeeText = '';
    let nightFeeReturnText = '';
    if (pickupHour >= 18 || pickupHour < 8) {
      price += nightFee;
      nightFeeText = translations.night_pickup_fee; // Use translation for night pick-up fee
    }
    if (returnHour >= 18 || returnHour < 8) {
      price += nightFee;
      nightFeeReturnText = translations.night_return_fee; // Use translation for night return fee
    }

    // Apply discount if applicable
    let discountAmount = 0;
    if (discountCode === "special") {
      discountAmount = price * 0.1; // 10% discount
    }

    const finalPrice = price - discountAmount;

    // Update the UI with the calculated prices
    document.getElementById('priceDetails').innerHTML = `${translations.price_per_day}: ${pricePerDay} €<br>${translations.total_days}: ${days}`;
    document.getElementById('nightFeeText').innerHTML = nightFeeText;
    document.getElementById('nightFeeReturnText').innerHTML = nightFeeReturnText;
    document.getElementById('discountAmountText').innerHTML = discountAmount > 0 ? `${translations.discount_applied}: -${discountAmount.toFixed(2)} €` : '';
    document.getElementById('finalPriceText').innerHTML = `${translations.final_price}: ${finalPrice.toFixed(2)} €`;

    // Show relevant elements after calculation
    document.getElementById('nightFeeText').style.display = nightFeeText ? 'block' : 'none';
    document.getElementById('nightFeeReturnText').style.display = nightFeeReturnText ? 'block' : 'none';
    document.getElementById('priceDetails').style.display = 'block';
    document.getElementById('discountAmountText').style.display = discountAmount > 0 ? 'block' : 'none';
    document.getElementById('finalPriceText').style.display = 'block';
  }
});
