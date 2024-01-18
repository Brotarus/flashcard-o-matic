import React, { useState, useEffect } from "react";

function CardForm({ onSubmit, onCancel, onDone, initialValues, actionText, onUpdateValues }) {
  const [front, setFront] = useState(initialValues.front || "");
  const [back, setBack] = useState(initialValues.back || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting card info:", { front, back });
    onSubmit({ front, back });
  };

  const handleButtonClick = () => {
    if (onDone) {
      onDone(); // Trigger onDone if it's provided
    } else if (onCancel) {
      onCancel(); // Trigger onCancel if onDone is not provided
    }
  };

  useEffect(() => {
    onUpdateValues({ front, back });
  }, [front, back, onUpdateValues]);

  return (
    <form onSubmit={handleSubmit}>
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

      {/* Conditional rendering of either Done or Cancel button */}
      {onDone ? (
        <button type="button" className="btn btn-success ml-2" onClick={handleButtonClick}>
          Done
        </button>
      ) : (
        <button type="button" className="btn btn-secondary ml-2" onClick={handleButtonClick}>
          Cancel
        </button>
      )}
      <button type="submit" className="btn btn-primary">
        {actionText}
      </button>
    </form>
  );
}

export default CardForm;
