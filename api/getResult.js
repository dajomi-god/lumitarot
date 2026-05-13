module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).end();

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'ID 없음' });

  try {
    const response = await fetch(`${process.env.KV_REST_API_URL}/get/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!data.result && !data.value) return res.status(404).json({ error: '결과 없음' });

    const result = JSON.parse(data.result || data.value);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
