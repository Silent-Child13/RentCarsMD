document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get('id');
  const mainImage = document.getElementById("mainImage");
  const detailsContainer = document.querySelector(".details-container");
  const modal = document.getElementById("imageModal");
  const languageSelector = document.getElementById("language-selector");

  let currentCar = {};
  let language = languageSelector.value; // Set default language

  // Fetch car data when the page loads
  fetchCarData();

  // Update language and re-display car details on language change
  languageSelector.addEventListener("change", () => {
    language = languageSelector.value;
    displayCarDetails(currentCar); // Re-display car data with the new language
  });

  async function fetchCarData() {
    try {
      const response = await fetch(`http://127.0.0.1:5000/rentdescription/${carId}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      currentCar = await response.json();
      displayCarDetails(currentCar); // Store car data for future updates
    } catch (error) {
      console.error('Error fetching car data:', error);
      detailsContainer.innerHTML = `<p class="error">Failed to load car details. Please try again later.</p>`;
    }
  }

  function displayCarDetails(car) {

    const transmission = language === 'ro' ? car.transmissionRo : language === 'ru' ? car.transmissionRu : car.transmission;
    const fuelType = language === 'ro' ? car.fuel_typeRo : language === 'ru' ? car.fuel_typeRu : car.fuel_type;
    const bodyType = language === 'ru' ? car.body_typeRu : car.body_type; // Only for Russian
    const description = language === 'ro' ? car.descriptionRo : language === 'ru' ? car.descriptionRu : car.description;

    const carTypeLink = document.getElementById('carTypeLink');
    carTypeLink.textContent = bodyType || "Unknown";
    
    const carTypeHref = `/nav-rent-cars/rent-sedan.html?body_type=${car.body_type ? car.body_type.toLowerCase() : 'sedan'}`;
    carTypeLink.href = carTypeHref;
    

    const carNameLink = document.getElementById('carNameLink');
    carNameLink.textContent = car.name || "Unknown Car";
    carNameLink.href = `/show-car/car4.html?id=${car.id}`;

    mainImage.src = car.image_url || "";
    const formattedEngineCapacity = parseFloat(car.engine_capacity).toFixed(1);

  
  

    detailsContainer.innerHTML = `
      <h1>${car.name}</h1>
      <ul class="car-details">
        <li><img class="below" src="/instruments-below-car/car-small.png" alt="Car Small Image"><span class="label" data-key="year_label">Year:</span> <span class="value">${car.year}</span></li>
        <li><img class="below" src="/instruments-below-car/gear-box.png" alt="Car Small Image"><span class="label" data-key="gearbox_label">Gearbox:</span> <span class="value">${transmission}</span></li>
        <li><img class="below" src="/instruments-below-car/fuel-pump.png" alt="Car Small Image"><span class="label" data-key="fuel_type_label">Fuel Type:</span> <span class="value">${fuelType}</span></li>
        <li><img class="below" src="/instruments-below-car/fuel-pump.png" alt="Car Small Image"><span class="label" data-key="engine_capacity_label">Engine Capacity:</span> <span class="value">${formattedEngineCapacity}</span></li>
        <li><img class="below" src="/instruments-below-car/cross.png" alt="Car Small Image"><span class="label" data-key="car_body_type_label">Car Type Body:</span> <span class="value">${bodyType}</span></li>
        <li><img class="below" src="/instruments-below-car/doors.webp" alt="Car Small Image"><span class="label" data-key="doors_number_label">Doors Number:</span> <span class="value">${car.doors}</span></li>
        <li><img class="below" src="/instruments-below-car/seat.png" alt="Car Small Image"><span class="label" data-key="seats_number_label">Seats Number:</span> <span class="value">${car.seats}</span></li>
      </ul>
      <p>${description || "No description available."}</p>
    `;

    const pricingList = document.querySelector('.pricing-list');
    pricingList.innerHTML = `
        <li><img src="/instruments-below-car/calendar-small-icon-.png" alt="1-2 Days"><h4>1-2 Days</h4><p>${car.price_1_2_days} €</p></li>
        <li><img src="/instruments-below-car/calendar-small-icon-.png" alt="3-7 Days"><h4>3-7 Days</h4><p>${car.price_3_7_days} €</p></li>
        <li><img src="/instruments-below-car/nr20.png" alt="8-20 Days"><h4>8-20 Days</h4><p>${car.price_8_20_days} €</p></li>
        <li><img src="/instruments-below-car/cross.png" alt="21-45 Days"><h4>21-45 Days</h4><p>${car.price_21_45_days} €</p></li>
        <li><img src="/instruments-below-car/hate.jpg" alt="46+ Days"><h4>46+ Days</h4><p>${car.price_46_days} €</p></li>
    `;

    // Image modal setup
    if (car.image_urls && car.image_urls.length > 0) {
      setupModalImages(car.image_urls);
    } else {
      modal.innerHTML = `<p>No images available for this car.</p>`;
    }
  }

  function setupModalImages(images) {
    const modalContent = modal.querySelector(".modal-content");
    modalContent.innerHTML = ''; 

    images.forEach((imgSrc, index) => {
      const slide = document.createElement("div");
      slide.classList.add("mySlides");
      slide.innerHTML = `<img src="${imgSrc}" alt="Car Image ${index + 1}">`;
      modalContent.appendChild(slide);
    });

    currentSlide(1); // Show the first image
  }

  // Call the function to fetch car data
  fetchCarData();

  // Modal functions
  window.openModal = function() {
    modal.style.display = "block";
  };

  window.closeModal = function() {
    modal.style.display = "none";
  };

  // Slideshow functions
  let slideIndex = 1;
  window.plusSlides = function(n) {
    currentSlide(slideIndex += n);
  };

  function currentSlide(n) {
    const slides = modal.getElementsByClassName("mySlides");
    if (n > slides.length) slideIndex = 1;    
    if (n < 1) slideIndex = slides.length; 
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    slides[slideIndex - 1].style.display = "block";  
  }
});
