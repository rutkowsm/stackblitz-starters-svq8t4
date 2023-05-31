// App.js
import React, { useState, useEffect } from 'react';
import './style.css';

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>Stoper: {formatTime(time)}</h2>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={resetTimer}>Wyzeruj</button>
    </div>
  );
}

function Likes() {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
  };

  return (
    <div>
      <h2>Polubienia: {likes}</h2>
      <button onClick={toggleLike}>
        {liked ? 'Cofnij lajka' : 'Lubię to'}
      </button>
    </div>
  );
}

function Presentation({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div>
      <h2>
        Krok {currentIndex + 1} z {slides.length}
      </h2>
      <p>{slides[currentIndex]}</p>
      <button onClick={goToPreviousSlide}>Poprzedni krok</button>
      <button onClick={goToNextSlide}>Następny krok</button>
    </div>
  );
}

export default function App() {
  const slides = [
    'Makaron ugotować al dente.',
    'Do dużej patelni wlać oliwę, zeszklić pokrojony na plasterki czosnek i pokrojoną w kosteczkę cebulkę.',
    'Dodać opłukany, osuszony i grubo pokrojony szpinak oraz masło.',
    'Podgrzewać przez 2 minuty (stoper wyżej) na większym ogniu aż szpinak zwiędnie.',
    'Zmniejszyć ogień, wlać śmietankę i włożyć połowę pokruszonego sera gorgonzola, wymieszać.',
    'Delikatnie podgrzać i roztopić ser nie zagotowując. Doprawić świeżo zmielonym pieprzem oraz w razie potrzeby solą.',
    'Na patelnię dodać ugotowany makaron, wymieszać i posypać resztą pokruszonego sera gorgonzola.',
    'Podawać z białym wytrawnym winem, najlepiej Pinot Grigio. Smacznego!'
  ];

  return (
    <div className="App">
      <h1>Gotuj z Rudolfem</h1>
      <Timer />
      <Likes />
      <Presentation slides={slides} />
    </div>
  );
}
