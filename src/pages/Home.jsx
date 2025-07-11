import { useEffect, useState } from 'react';
import { fetchPreviews } from '../utils/api';
import ShowCard from '../components/ShowCard';
import { Link } from 'react-router-dom';
import { genreMap } from '../utils/genreMap';

export default function Home() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genreFilter, setGenreFilter] = useState(0);
  const [sortType, setSortType] = useState('az');

  useEffect(() => {
    fetchPreviews().then(d => {
      setShows(d);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>🔄 Loading shows...</p>;

  const filtered = genreFilter
    ? shows.filter(s => s.genreIds.includes(genreFilter))
    : shows;

  const sortedShows = [...filtered].sort((a, b) => {
    if (sortType === 'az') return a.title.localeCompare(b.title);
    if (sortType === 'za') return b.title.localeCompare(a.title);
    if (sortType === 'newest')
      return new Date(b.updated) - new Date(a.updated);
    return new Date(a.updated) - new Date(b.updated);
  });

  return (
    <div>
      <h1>All Shows</h1>
      <Link to="/favourites">⭐ Favourites</Link>

      <div className="filters">
        <label>
          Genre:
          <select
            value={genreFilter}
            onChange={e => setGenreFilter(+e.target.value)}
          >
            <option value={0}>All</option>
            {Object.entries(genreMap).map(([id, t]) => (
              <option key={id} value={id}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort:
          <select value={sortType} onChange={e => setSortType(e.target.value)}>
            <option value="az">Title A–Z</option>
            <option value="za">Title Z–A</option>
            <option value="newest">Newest updated</option>
            <option value="oldest">Oldest updated</option>
          </select>
        </label>
      </div>

      <div className="grid">
        {sortedShows.map(s => (
          <ShowCard key={s.id} show={s} />
        ))}
      </div>
    </div>
  );
}
