import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api/index";
import CardForm from "../components/CardForm";

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
      console.log("Updating card:", { ...card, front, back });
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

      <h2>{deck ? `${deck.name}: ` : ""}Edit Card</h2>
      {/* Form for editing the card */}
      <CardForm
        initialValues={{ front, back }}
        onSubmit={handleUpdateCard}
        onCancel={() => history.push(`/decks/${deckId}`)}
        actionText="Save"
        onUpdateValues={(updatedValues) => {
          setFront(updatedValues.front);
          setBack(updatedValues.back);
        }}
      />
    </div>
  );
}

export default EditCard;
