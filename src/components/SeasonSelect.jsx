export default function SeasonSelect({ seasons, selected, onChange }) {
  return (
    <select value={selected} onChange={e => onChange(+e.target.value)}>
      {seasons.map((s, i) => (
        <option key={s.id} value={i}>
          {s.title}
        </option>
      ))}
    </select>
  );
}
