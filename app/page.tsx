'use client';

// page.tsx

import React, { useState, useEffect, ChangeEvent } from 'react';
import clsx from 'clsx';
import Character from './character';

interface Result {
  id: number;
  name: string;
  url: string;
  image: string;
  episode: string[];
}

export default function Home() {
  const [search, setSearch] = useState<string>('');
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search) {
      fetch(`https://rickandmortyapi.com/api/character?name=${search}`)
        .then(response => response.json())
        .then(data => {
          if (data.results) {
            setResults(data.results);
          } else {
            setResults([]);
          }
        });
    }
  }, [search]);

  useEffect(() => {
    const storedCharacters = JSON.parse(localStorage.getItem('selectedCharacters') || '[]');
    setSelectedCharacters(storedCharacters);
  }, []);

  const handleCheckboxChange = (character: Result) => {
    if (selectedCharacters.includes(character.name)) {
      const newSelectedCharacters = selectedCharacters.filter(name => name !== character.name);
      setSelectedCharacters(newSelectedCharacters);
      localStorage.setItem('selectedCharacters', JSON.stringify(newSelectedCharacters));
    } else {
      const newSelectedCharacters = [...selectedCharacters, character.name];
      setSelectedCharacters(newSelectedCharacters);
      localStorage.setItem('selectedCharacters', JSON.stringify(newSelectedCharacters));
    }
  };

  return (
    <div className="relative">
      <input type="text" value={search} onChange={handleSearchChange} onClick={() => setShowDropdown(!showDropdown)} className="w-full p-2 border border-gray-300 rounded" />
      <div className={clsx('absolute top-full left-0', { 'block': showDropdown, 'hidden': !showDropdown })}>
        {results.map(result => (
          <Character key={result.id} result={result} selectedCharacters={selectedCharacters} handleCheckboxChange={handleCheckboxChange} />
        ))}
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Selected Characters:</h2>
        <p>{selectedCharacters.join(', ')}</p>
      </div>
    </div>
  );
}