import React, { useState } from 'react';
import './App.css';
import Tarot from './components/Tarot/Tarot';
import Runes from './components/Runes/Runes';
import Psychological from './components/Psychological/Psychological';
import MagicBall from './components/MagicBall/MagicBall';
import Astrology from './components/Astrology/Astrology';

const App: React.FC = () => {
  const [selectedReading, setSelectedReading] = useState<string>('');

  const renderReadingComponent = () => {
    switch (selectedReading) {
      case 'Tarot':
        return <Tarot />;
      case 'Runes':
        return <Runes />;
      case 'Psychological':
        return <Psychological />;
      case 'MagicBall':
        return <MagicBall />;
      case 'Astrology':
        return <Astrology />;
      default:
        return <p>Please select a type of reading.</p>;
    }
  };

  return (
    <div className="container">
      <h1>Fortune Teller</h1>
      <div>
        <button onClick={() => setSelectedReading('Tarot')}>Tarot</button>
        <button onClick={() => setSelectedReading('Runes')}>Runes</button>
        <button onClick={() => setSelectedReading('Psychological')}>Psychological</button>
        <button onClick={() => setSelectedReading('MagicBall')}>Magic Ball</button>
        <button onClick={() => setSelectedReading('Astrology')}>Astrology</button>
      </div>
      {renderReadingComponent()}
    </div>
  );
};

export default App;