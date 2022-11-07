import { AuthPage } from "@pages/Auth/AuthPage";
import { HomePage } from "@pages/HomePage";
import { UsersPage } from "@pages/Private/UsersPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/private/users" element={<UsersPage />} />
      </Routes>
    </div>
  );
}

export default App;
