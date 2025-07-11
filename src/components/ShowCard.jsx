import { Link } from 'react-router-dom';
import { genreMap } from '../utils/genreMap';

export default function ShowCard({ show }) {
  return (
    <div className="card">
      <Link to={`/show/${show.id}`}>
        <img src={show.image} alt={show.title} width="200" />
        <h3>{show.title}</h3>
      </Link>
      <p>Seasons: {show.seasons}</p>
      <p>Genres: {show.genreIds.map(i => genreMap[i]).join(', ')}</p>
      <p>Updated: {new Date(show.updated).toLocaleDateString()}</p>
    </div>
  );
}
