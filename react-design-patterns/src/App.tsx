import "./App.css";
import UserContainer from "./component-pattern/UserContainer";
import ContentModal from "./compound-components/ContentModal";
import GroupButton from "./factory-pattern/GroupButton";
import HoCwithButton from "./higher-order-component/HoCwithButton";
import ProviderPattern from "./provider-pattern/Provider";

function App() {
  return (
    <>
      {/* Design patterns */}
      {/* <HoCwithButton />
      <UserContainer />
      <GroupButton /> */}
      {/* <ContentModal /> */}
      <ProviderPattern />
    </>
  );
}

export default App;
