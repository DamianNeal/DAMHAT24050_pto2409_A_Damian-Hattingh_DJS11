const BASE = "https://podcast-api.netlify.app";
export const fetchPreviews = () => fetch(BASE).then(r => r.json());
export const fetchShowById = (id) => fetch(`${BASE}/id/${id}`).then(r => r.json());
