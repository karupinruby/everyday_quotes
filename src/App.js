import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_ADVICE_URL = 'https://api.adviceslip.com/advice';
const API_TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2';
const API_PIXABAY_URL = 'https://pixabay.com/api';
const API_TRANSLATE_KEY = 'AIzaSyCuh1Y4bycAICJ2NaJ4T3f9XzNVIYcNWu4';
const API_PIXABAY_KEY = '33549801-bec28115310862b5b69905318';

function App() {
  const [advice, setAdvice] = useState('');
  const [translatedAdvice, setTranslatedAdvice] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    // Get advice from API
    axios.get(API_ADVICE_URL)
      .then(response => {
        const quote = response.data.slip.advice;
        setAdvice(quote);
        // Translate advice using Google Cloud Translation API
        axios.post(`${API_TRANSLATE_URL}?key=${API_TRANSLATE_KEY}&q=${quote}&source=en&target=ko`)
          .then(response => {
            setTranslatedAdvice(response.data.data.translations[0].translatedText);
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
      });

    // Get background image from Pixabay API
    axios.get(`${API_PIXABAY_URL}?key=${API_PIXABAY_KEY}&q=clear%20sky&category=nature`)
      .then(response => {
        const images = response.data.hits;
        const randomIndex = Math.floor(Math.random() * images.length);
        setBackgroundImage(images[randomIndex].largeImageURL);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '30px', textAlign: 'center', width: '100%' }}>
        <h1>파이팅 해야지</h1>
        <p>{advice}</p>
        <p>{translatedAdvice}</p>
      </div>
    </div>
  );
}

export default App;
