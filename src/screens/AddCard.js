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
      await createCard(deckId, { front, back });
      const deck = await readDeck(deckId);
      history.push(`/decks/${deck.id}`);
    } catch (error) {
      console.error("Error adding card:", error);
    }
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
        onCancel={() => history.push(`/decks/${deckId}`)}
        actionText="Save" />
    </div>
  );
}

export default AddCard;
