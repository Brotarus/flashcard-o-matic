// src/screens/EditCard.js
import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const history = useHistory();

  useEffect(() => {
    const loadDeckAndCard = async () => {
      try {
        const loadedDeck = await readDeck(deckId);
        const loadedCard = await readCard(cardId);
        setDeck(loadedDeck);
        setCard(loadedCard);
        setFront(loadedCard.front);
        setBack(loadedCard.back);
      } catch (error) {
        console.error("Error loading deck and card:", error);
      }
    };

    loadDeckAndCard();
  }, [deckId, cardId]);

  const handleUpdateCard = async () => {
    try {
      await updateCard({ ...card, front, back });
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error("Error updating card:", error);
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
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>

      <h2>Edit Card</h2>
      {/* Form for editing the card */}
      <form>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            rows="3"
            value={front}
            onChange={(e) => setFront(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            rows="3"
            value={back}
            onChange={(e) => setBack(e.target.value)}
          ></textarea>
        </div>

        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
          Cancel
        </Link>
        <button type="button" className="btn btn-primary" onClick={handleUpdateCard}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditCard;
