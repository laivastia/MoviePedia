import { useState } from "react";
import FileInput from "./FileInput";

function ReviewForm() {
  const [value, setValue] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleChange = (name, value) => {
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
      <FileInput
        name="imgFile"
        value={value.imgFile}
        onChange={handleInputChange}
      />
      <input
        name="title"
        value={value.title}
        onChange={handleInputChange}
      ></input>
      <input
        type="number"
        max={5}
        min={1}
        name="rating"
        value={value.rating}
        onChange={handleInputChange}
      ></input>
      <textarea
        name="content"
        value={value.content}
        onChange={handleInputChange}
      ></textarea>
      <button type="submit">확인</button>
    </form>
  );
}

export default ReviewForm;
