import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const history = useHistory();
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = {
      name: deckName,
      description: deckDescription,
    };

    try {
      const createdDeck = await createDeck(newDeck);
      // Redirect to the created deck's page
      history.push(`/decks/${createdDeck.id}`);
    } catch (error) {
      console.error("Error creating deck:", error);
    }
  };

  const handleCancel = () => {
    // Redirect to the home page if the user cancels
    history.push("/");
  };

  return (
    <div>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="deckName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            placeholder="Deck Name"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deckDescription" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="deckDescription"
            rows="4"
            placeholder="Deck Description"
            value={deckDescription}
            onChange={(e) => setDeckDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
