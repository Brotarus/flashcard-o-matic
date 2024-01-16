import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api/index";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = async () => {
    try {
      const allDecks = await listDecks();
      setDecks(allDecks);
    } catch (error) {
      console.error("Error loading decks:", error);
    }
  };

  const handleDeleteDeck = async (deckId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this deck?");
    if (confirmDelete) {
      try {
        await deleteDeck(deckId);
        loadDecks(); // Refresh the decks after deletion
      } catch (error) {
        console.error("Error deleting deck:", error);
      }
    }
  };

  return (
    <div>
      <h2>Decks</h2>
      <Link to="/decks/new" className="btn btn-primary mb-2">
        Create Deck
      </Link>
      <div>
        {decks.map((deck) => (
          <div key={deck.id} className="card mb-2">
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <p className="card-text">{deck.description}</p>
              <p className="card-text">{deck.cards.length} cards</p>
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                View
              </Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
                Study
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteDeck(deck.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
