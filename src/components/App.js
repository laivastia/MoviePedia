import { useCallback, useEffect, useState } from "react";
import {
  createReviews,
  deleteReviews,
  getReviews,
  updateReviews,
} from "../api";
import useAsync from "../hooks/useAsync";
import LocaleSelect from "./LocaleSelect";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";
import "./App.css";
import logoImg from "../assets/logo.png";
import ticketImg from "../assets/ticket.png";
import t from "../hooks/useTranslate";

const LIMIT = 6;

function AppSortButton({ onClick, selected, children }) {
  return (
    <button onClick={onClick} selected={selected}>
      {children}
    </button>
  );
}

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  const handleDelete = async (id) => {
    const result = await deleteReviews(id);
    if (!result) return;

    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleLoad = useCallback(
    async (options) => {
      const result = await getReviewsAsync(options);
      if (!result) return;

      const { reviews, paging } = result;
      if (options.offset === 0) {
        setItems(reviews);
      } else {
        setItems((prevItems) => [...prevItems, ...reviews]);
      }
      setOffset(options.offset + reviews.length);
      setHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );

  const handleLoadMore = async () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItems((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);

  return (
    <div className="App">
      <nav className="App-nav">
        <div className="App-nav-container">
          <img className="App-logo" src={logoImg} alt="MOVIE PEDIA" />
          <LocaleSelect />
        </div>
      </nav>
      <div className="App-Container">
        <div
          className="App-ReviewForm"
          style={{
            backgroundImage: `url(${ticketImg})`,
          }}
        >
          <ReviewForm
            onSubmit={createReviews}
            onSubmitSuccess={handleCreateSuccess}
          />
        </div>
        <div className="App-sorts">
          <AppSortButton
            onClick={handleNewestClick}
            selected={order === "crearedAt"}
          >
            {t("newest")}
          </AppSortButton>
          <AppSortButton
            onClick={handleBestClick}
            selected={order === "rating"}
          >
            {t("rating")}
          </AppSortButton>
        </div>
        <div className="App-ReviewList">
          <ReviewList
            items={sortedItems}
            onDelete={handleDelete}
            onUpdate={updateReviews}
            onUpdateSuccess={handleUpdateSuccess}
          />
          {hasNext && (
            <button
              className="App-load-more-button"
              disabled={isLoading}
              onClick={handleLoadMore}
            >
              더 보기
            </button>
          )}
          {loadingError?.message && <span>{loadingError.message}</span>}
        </div>
      </div>
      <footer>
        <div></div>
      </footer>
    </div>
  );
}

export default App;
