import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    loadDeck();
  }, [deckId]);

  const loadDeck = async () => {
    try {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    } catch (error) {
      console.error("Error loading deck:", error);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setCardIndex((prevIndex) => prevIndex + 1);
    setIsFlipped(false);
  };

  const renderStudyContent = () => {
    if (!deck) {
      return <p>Loading...</p>;
    }

    const currentCard = deck.cards[cardIndex];

    if (!currentCard) {
      return (
        <div>
          <p>Congratulations! You've completed studying all cards.</p>
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
            Back to Deck
          </Link>
        </div>
      );
    }

    return (
      <div>
        <h4>Card {cardIndex + 1} of {deck.cards.length}</h4>
        <p>{isFlipped ? currentCard.back : currentCard.front}</p>
        <button className="btn btn-secondary mr-2" onClick={handleFlip}>
          Flip
        </button>
        <button className="btn btn-primary" onClick={handleNext}>
          Next
        </button>
      </div>
    );
  };

  return (
    <div>
      <h2>Study: {deck ? deck.name : "Loading..."}</h2>
      {renderStudyContent()}
    </div>
  );
}

export default Study;
