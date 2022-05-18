import items from "../mock.json";
import ReviewList from "./ReviewList";

function App() {
  return (
    <div>
      <ReviewList items={items} />
    </div>
  );
}

export default App;
