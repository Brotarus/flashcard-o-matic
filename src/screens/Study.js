import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const history = useHistory();

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
    if (cardIndex === deck.cards.length - 1) {
      // Reached the last card
      const shouldRestart = window.confirm("Do you want to restart the deck?\n\nClick 'cancel' to return to the home page.");
      if (shouldRestart) {
        setCardIndex(0);
        setIsFlipped(false);
      } else {
        // If the user chooses not to restart, navigate to home
        history.push("/");
      }
    } else {
      // Increment cardIndex and flip to front
      setCardIndex((prevIndex) => prevIndex + 1);
      setIsFlipped(false);
    }
  };

  const renderStudyContent = () => {
    if (!deck) {
      return <p>Loading...</p>;
    }

    if (deck.cards.length <= 2) {
      // Not enough cards
      return (
        <div>
          <p>Not enough cards to study. Add more cards to the deck.</p>
          <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
      );
    }

    const currentCard = deck.cards[cardIndex];

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
