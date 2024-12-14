import "./App.css";
import UserContainer from "./component-pattern/UserContainer";
import ContentModal from "./compound-components/ContentModal";
import GroupButton from "./factory-pattern/GroupButton";
import HoCwithButton from "./higher-order-component/HoCwithButton";
import ProviderPattern from "./provider-pattern/Provider";
import Count from "./zustand-context-pattern/Count";

function App() {
  return (
    <>
      {/* Design patterns */}
      {/* <HoCwithButton />
      <UserContainer />
      <GroupButton /> */}
      {/* <ContentModal /> */}
      {/* <ProviderPattern /> */}
      <Count initialCount={299} />
    </>
  );
}

export default App;
