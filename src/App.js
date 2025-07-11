import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalAudio from './components/GlobalAudio';
import Home from './pages/Home';
import ShowPage from './pages/ShowPage';
import FavouritesPage from './pages/FavouritesPage';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalAudio>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowPage />} />
          <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
      </GlobalAudio>
    </BrowserRouter>
  );
}
