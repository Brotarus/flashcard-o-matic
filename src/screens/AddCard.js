import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "../components/CardForm";

function AddCard() {
  const { deckId } = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [deck, setDeck] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const loadedDeck = await readDeck(deckId);
        setDeck(loadedDeck);
      } catch (error) {
        console.error("Error loading deck:", error);
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleAddCard = async () => {
    try {
      console.log("Creating card:", { front, back });
      await createCard(deckId, { front, back });

      const updatedDeck = await readDeck(deckId);
      setDeck(updatedDeck);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const handleDone = () => {
    // Navigate to the Deck screen
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck ? deck.name : "Deck Name"}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck ? `${deck.name}: ` : ""}Add Card</h2>
      {/* Form for adding a new card */}
      <CardForm
        initialValues={{ front, back }}
        onSubmit={handleAddCard}
        onDone={handleDone}
        actionText="Save"
        onUpdateValues={(updatedValues) => {
          setFront(updatedValues.front);
          setBack(updatedValues.back);
        }}
      />
    </div>
  );
}

export default AddCard;
