import './App.css';
import { Route, Routes } from "react-router-dom";
import Practice from './components/Practice';
import Rank from './components/Rank';



function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Practice />} />
          <Route path="rank" element={<Rank />} />
      </Routes>
    </>
  );
}

export default App;



