import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShowById } from '../utils/api';
import SeasonSelect from '../components/SeasonSelect';
import EpisodeItem from '../components/EpisodeItem';

export default function ShowPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seasonIdx, setSeasonIdx] = useState(0);

  useEffect(() => {
    fetchShowById(id).then(s => {
      setShow(s);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>🔄 Loading show...</p>;
  if (!show) return <p>Show not found</p>;

  const season = show.seasons[seasonIdx];

  const addFav = ep => {
    const fav = {
      id: ep.id,
      title: ep.title,
      file: ep.file,
      show: show.title,
      season: season.title,
      date: new Date().toISOString()
    };
    const arr = JSON.parse(localStorage.getItem('favs') || '[]');
    if (!arr.find(f => f.id === ep.id)) {
      arr.push(fav);
      localStorage.setItem('favs', JSON.stringify(arr));
      alert('Added to favourites!');
    } else {
      alert('Already in favourites.');
    }
  };

  return (
    <div>
      <button onClick={() => nav(-1)}>← Back</button>
      <h1>{show.title}</h1>
      <SeasonSelect
        seasons={show.seasons}
        selected={seasonIdx}
        onChange={setSeasonIdx}
      />
      <img src={season.image} alt="" width="300" />
      <p>{season.episodes.length} episodes</p>
      {season.episodes.map(ep => (
        <EpisodeItem key={ep.id} ep={ep} onFav={addFav} />
      ))}
    </div>
  );
}
