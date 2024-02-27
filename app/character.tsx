import React from 'react';

interface Result {
  id: number;
  name: string;
  url: string;
  image: string;
  episode: string[];
}

interface CharacterProps {
  result: Result;
  selectedCharacters: string[];
  handleCheckboxChange: (character: Result) => void;
}

const Character: React.FC<CharacterProps> = ({ result, selectedCharacters, handleCheckboxChange }) => {
  return (
    <div key={result.id} className="flex items-center mb-4">
      <input
        type="checkbox"
        checked={selectedCharacters.includes(result.name)}
        onChange={() => handleCheckboxChange(result)}
        className="mr-4"
      />
      <img src={result.image} alt={result.name} className="h-20 w-20 mr-4" />
      <div>
        <h2 className="text-xl font-bold">{result.name}</h2>
        <p className="text-sm text-gray-500">Number of episodes: {result.episode.length}</p>
      </div>
    </div>
  );
}

export default Character;