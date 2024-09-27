import "./App.css";
import UserContainer from "./component-pattern/UserContainer";
import HoCwithButton from "./higher-order-component/HoCwithButton";

function App() {
  return (
    <>
      Design patterns
      <HoCwithButton />
      <UserContainer />
    </>
  );
}

export default App;
