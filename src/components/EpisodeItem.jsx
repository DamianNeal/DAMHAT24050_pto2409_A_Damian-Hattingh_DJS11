import { useContext } from 'react';
import { GlobalAudioContext } from './GlobalAudio';

export default function EpisodeItem({ ep, onFav }) {
  const { setSrc } = useContext(GlobalAudioContext);

  return (
    <div className="episode">
      <button onClick={() => setSrc(ep.file)}>▶️</button>
      <span>{ep.title}</span>
      <button onClick={() => onFav(ep)}>❤️</button>
    </div>
  );
}
