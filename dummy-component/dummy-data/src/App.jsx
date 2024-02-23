import React from 'react';
import SlasherVillainComponent from './components/slashervillains';

const App = () => {
  const slasherVillainsData = [
    {
      name: "Michael Myers",
      movies: ["Halloween"],
      description: {
        physical_attributes: "Masked figure, imposing stature"
      },
      weapons: ["Kitchen Knife"],
      modus_operandi: "Stalks and kills his victims with methodical precision",
      motivation_background: {
        background: "Committed his first murder at the age of 6 and has a fixation on his sister"
      },
      kill_count: 100,
      weakness: {
        psychological: "Obsessive fixation on his original target (e.g., Laurie Strode)"
      }
    },
  ];

  return (
    <div className="app">
      <h1>Slasher Villains</h1>
      {slasherVillainsData.map((villain, index) => (
        <SlasherVillainComponent key={index} villain={villain} />
      ))}
    </div>
  );
};

export default App;
