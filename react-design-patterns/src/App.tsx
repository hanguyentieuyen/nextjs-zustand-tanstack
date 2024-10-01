import "./App.css";
import UserContainer from "./component-pattern/UserContainer";
import GroupButton from "./factory-pattern/GroupButton";
import HoCwithButton from "./higher-order-component/HoCwithButton";

function App() {
  return (
    <>
      Design patterns
      <HoCwithButton />
      <UserContainer />
      <GroupButton />
    </>
  );
}

export default App;
