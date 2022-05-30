import { useState } from "react";
import useAsync from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

function ReviewForm({
  className = "",
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmitSuccess,
  onSubmit,
  onCancel,
}) {
  const t = useTranslate();
  const [isSubmintting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  const [values, setValue] = useState(initialValues);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    const result = await onSubmitAsync(formData);
    if (!result) return;

    const { review } = result;
    onSubmitSuccess(review);
    setValue(INITIAL_VALUES);
  };

  return (
    <form className={`ReviewForm ${className}`} onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        className="ReviewForm-preview"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      />
      <div className="ReviewForm-rows">
        <div className="ReviewForm-title-rating">
          <input
            className="ReviewForm-title"
            name="title"
            value={values.title}
            placeholder={t("title placeholder")}
            onChange={handleInputChange}
          ></input>
          <RatingInput
            className="ReviewForm-rating"
            name="rating"
            value={values.rating}
            onChange={handleChange}
          />
        </div>
        <textarea
          className="ReviewForm-content"
          name="content"
          value={values.content}
          placeholder={t("content placeholder")}
          onChange={handleInputChange}
        />
        <div className="ReviewForm-error-buttons">
          <div className="Review-error">
            {submittingError && <div> {submittingError.message}</div>}
          </div>
          <div className="ReviewForm-buttons">
            {onCancel && (
              <button
                className="ReviewForm-cancel-button"
                type="button"
                onClick={onCancel}
              >
                {t("cancel button")}
              </button>
            )}
            <button
              className="ReviewForm-submit-button"
              type="submit"
              disabled={isSubmintting}
            >
              {t("confirm button")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
