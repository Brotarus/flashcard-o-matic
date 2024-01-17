import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
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

  const handleDeleteDeck = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this deck?");
    if (confirmDelete) {
      try {
        await deleteDeck(deckId);
        history.push("/");
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  };

  const handleDeleteCard = async (cardId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this card?");
    if (confirmDelete) {
      try {
        await deleteCard(cardId);
        loadDeck(); // Reload the deck after deleting the card
      } catch (error) {
        console.error("Error deleting card:", error);
      }
    }
  };

  const renderCards = () => {
    if (!deck || !deck.cards || deck.cards.length === 0) {
      return <p>No cards available for this deck.</p>;
    }

    console.log("Deck Initial Values:", deck.cards.map((card) => ([ card.front, card.back ])));

    return (
      <div>
        <h3>Cards</h3>
        <ul className="list-group">
          {deck.cards.map((card) => (
            <li key={card.id} className="list-group-item">
              <div>
                <p>
                  <strong>Question:</strong> {card.front}
                </p>
                <p>
                  <strong>Answer:</strong> {card.back}
                </p>
              </div>
              <div className="float-right">
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary mr-2">
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck ? deck.name : "Loading..."}
          </li>
        </ol>
      </nav>
      <div>
        <h2>{deck ? deck.name : "Loading..."}</h2>
        <p>{deck ? deck.description : "Loading..."}</p>
        <div>
          <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
            Edit
          </Link>
          <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">
            Study
          </Link>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mr-2">
            Add Cards
          </Link>
          <button className="btn btn-danger" onClick={handleDeleteDeck}>
            Delete
          </button>
        </div>
        {renderCards()}
      </div>
    </div>
  );
}

export default Deck;
