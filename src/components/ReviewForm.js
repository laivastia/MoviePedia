import { useState } from "react";

function ReviewForm() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRatingChange = (e) => {
    const nextRating = Number(e.target.value) || 0;
    setRating(nextRating);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form className="ReviewForm">
      <input value={title} onChange={handleTitleChange}></input>
      <input
        type="number"
        max={5}
        min={1}
        value={rating}
        onChange={handleRatingChange}
      ></input>
      <input value={content} onChange={handleContentChange}></input>
    </form>
  );
}

export default ReviewForm;
