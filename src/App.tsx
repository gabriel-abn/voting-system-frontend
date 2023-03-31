import "./App.css";
import { TemaList } from "./components/List-topics";
import { VotosList } from "./components/list-votes";
import { UserList } from "./pages/users";

function App() {
  return (
    <div>
      <UserList></UserList>
      <TemaList></TemaList>
      <VotosList></VotosList>
    </div>
  );
}

export default App;
