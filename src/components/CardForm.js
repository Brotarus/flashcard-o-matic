import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CardForm({ onSubmit, onCancel, initialValues, actionText }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  useEffect(() => {
    // Set initial values only once when the component mounts
    setFront(initialValues.front || "");
    setBack(initialValues.back || "");
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ front, back });
  };

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

      <button type="button" className="btn btn-secondary mr-2" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        {actionText}
      </button>
    </form>
  );
}

export default CardForm;

