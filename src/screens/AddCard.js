import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";

function AddCard() {
  const { deckId } = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const history = useHistory();

  const handleAddCard = async () => {
    try {
      await createCard(deckId, { front, back });
      const deck = await readDeck(deckId);
      // Optional: You can redirect to the Deck screen after adding a card
      history.push(`/decks/${deck.id}`);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <div>
      <h2>Add Card</h2>
      {/* Form for adding a new card */}
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
        <button type="button" className="btn btn-primary" onClick={handleAddCard}>
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
