import React, { useState, useEffect } from 'react';

interface NameGeneratorProps {
  nouns: string[];
  adjectives: string[];
  handleNameSelect: (newName: string) => void;
}

const NameGenerator = ({ nouns, adjectives, handleNameSelect }: NameGeneratorProps) => {
  const [selectedAdjective, setSelectedAdjective] = useState<string | null>(null);
  const [selectedNoun, setSelectedNoun] = useState<string | null>(null);
  const [randomAdjectives, setRandomAdjectives] = useState<string[]>([]);
  const [randomNouns, setRandomNouns] = useState<string[]>([]);

  useEffect(() => {
    const getRandomItems = (arr: string[], count: number) => {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    setRandomAdjectives(getRandomItems(adjectives, 3));
    setRandomNouns(getRandomItems(nouns, 3));
  }, [nouns, adjectives]);

  const handleAdjectiveClick = (adjective: string) => {
    setSelectedAdjective(adjective);
  };

  const handleNounClick = (noun: string) => {
    setSelectedNoun(noun);
  };

  const handleGenerateName = () => {
    if (selectedAdjective && selectedNoun) {
      const generatedName = `${selectedAdjective} ${selectedNoun}`;
      alert(`Generated Name: ${generatedName}`);
    } else {
      alert('Please select one adjective and one noun.');
    }
  };

  return (
        <div className='flex flex-col items-center justify-center space-y-4'>
            <h2 className='text-lg font-semibold mb-2'>
                Select an adjective and a noun to create your username:
            </h2>
            
            <div className='space-x-2'>
                {randomAdjectives.map((adjective) => (
                    
                    <span
                        key={adjective}
                        className={`
                            cursor-pointer
                            inline-block
                            text-center
                            p-2
                            w-32
                            rounded
                            ${selectedAdjective === adjective ?
                                'bg-blue-500 text-white' :
                                'bg-gray-200'}
                            `}
                        onClick={() => handleAdjectiveClick(adjective)}
                    >
                        {adjective}
                    </span>
                ))}
            </div>
            <div className='space-x-2'>
                {randomNouns.map((noun) => (
                    <span
                        key={noun}
                        className={`
                        cursor-pointer
                        inline-block
                        text-center
                        p-2
                        w-32
                        rounded
                        ${selectedNoun === noun ?
                            'bg-green-500 text-white' :
                            'bg-gray-200'}
                        `}
                        onClick={() => handleNounClick(noun)}
                    >
                        {noun}
                    </span>
                ))}
            </div>
            <button
                disabled={!selectedAdjective || !selectedNoun}
                onClick={() => handleNameSelect(`${selectedAdjective} ${selectedNoun}`)}
                className='
                    bg-purple-500
                    text-white
                    px-4
                    py-2
                    rounded-full
                    hover:bg-purple-700
                    focus:outline-none
                    focus:shadow-outline-purple
                    active:bg-purple-800
                    disabled:bg-gray-700
                '
            >
                Generate Name
            </button>
        <h1 className='text-2xl mt-4'>{selectedAdjective} {selectedNoun}</h1>
    </div>

    
  );
};

export default NameGenerator;
