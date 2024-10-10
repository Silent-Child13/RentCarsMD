document.addEventListener('DOMContentLoaded', () => {
  // Initialize with the current language
  loadTranslations(getCurrentLanguage());

  // Add event listener to language selector
  document.getElementById('language-selector').addEventListener('change', (event) => {
      const selectedLang = event.target.value;
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
  // Implement logic to determine the current language, e.g., from a cookie, local storage, or URL
  return document.documentElement.lang || 'en'; // Default to 'en' if no language is set
}
