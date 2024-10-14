document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the current language from local storage or set to default
  const currentLang = localStorage.getItem('selectedLanguage') || getCurrentLanguage();
  
  // Load translations with the current language
  loadTranslations(currentLang);
  
  // Add event listener to language selector
  document.getElementById('language-selector').addEventListener('change', (event) => {
      const selectedLang = event.target.value;
      // Store the selected language in local storage
      localStorage.setItem('selectedLanguage', selectedLang);
      loadTranslations(selectedLang);
  });
});

async function loadTranslations(lang) {
  try {
      const url = `http://127.0.0.1:8000/translate/${lang}`;
      console.log('Fetching translations from:', url);
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Error fetching translations: ${response.statusText}`);
      }

      const translations = await response.json();
      console.log('Translations received:', translations);

      // Update content with translations
      document.getElementById('airport-info').innerHTML = translations.airport_info || '';

  } catch (error) {
      console.error('Error loading translations:', error);
  }
}

function getCurrentLanguage() {
  // Implement logic to determine the current language, e.g., from local storage or URL
  return localStorage.getItem('selectedLanguage') || document.documentElement.lang || 'en'; // Default to 'en' if no language is set
}
