import { useState } from "react";

export default function AlphabetFilter({ onLetterSelect, selectedLetter }) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const handleLetterClick = (letter) => {
    onLetterSelect(letter);
  };

  return (
    <div className="mr-8">
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {alphabet.map((letter) => (
            <>  
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border font-Mulish  font-normal sm:font-medium rounded-md
              ${
                selectedLetter === letter
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:text-white hover:bg-primary"
              }`}
          >
            {letter}
          </button>
          </>
        ))}

      </div>
      
    </div>
  );
}

