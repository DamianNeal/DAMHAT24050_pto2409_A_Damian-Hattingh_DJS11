import { useState, useEffect } from 'react';

export default function FavouritesPage() {
  const [favs, setFavs] = useState([]);
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    let arr = JSON.parse(localStorage.getItem('favs') || '[]');
    arr = arr.sort((a, b) => {
      if (sort === 'az') return a.title.localeCompare(b.title);
      if (sort === 'za') return b.title.localeCompare(a.title);
      if (sort === 'newest') return new Date(b.date) - new Date(a.date);
      return new Date(a.date) - new Date(b.date);
    });
    setFavs(arr);
  }, [sort]);

  const remove = id => {
    const arr = JSON.parse(localStorage.getItem('favs') || '[]').filter(
      f => f.id !== id
    );
    localStorage.setItem('favs', JSON.stringify(arr));
    setFavs(arr);
  };

  const reset = () => {
    if (window.confirm('Reset all favourites?')) {
      localStorage.removeItem('favs');
      setFavs([]);
    }
  };

  return (
    <div>
      <h1>Favourites</h1>
      <button onClick={reset}>Reset All</button>

      <label>
        Sort:
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="az">Title A–Z</option>
          <option value="za">Title Z–A</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </label>

      {favs.length === 0 && <p>No favourites yet.</p>}
      {favs.map(f => (
        <div key={f.id} className="fav">
          <h3>{f.title}</h3>
          <p>
            {f.show} — {f.season}
          </p>
          <p>Added: {new Date(f.date).toLocaleString()}</p>
          <audio controls src={f.file}></audio>
          <button onClick={() => remove(f.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
