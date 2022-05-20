import { useState } from "react";

function ReviewForm() {
  const [value, setValue] = useState({
    title: "",
    rating: 0,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ value });
  };

  return (
    <form className="ReviewForm" onSubmit={handleSubmit}>
      <input name="title" value={value.title} onChange={handleChange}></input>
      <input
        type="number"
        max={5}
        min={1}
        name="rating"
        value={value.rating}
        onChange={handleChange}
      ></input>
      <textarea
        name="content"
        value={value.content}
        onChange={handleChange}
      ></textarea>
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;
