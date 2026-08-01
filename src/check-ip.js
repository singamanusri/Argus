export default async function handler(req, res) {
  const { ip } = req.query;

  const response = await fetch(
    `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}`,
    {
      headers: {
        Key: process.env.ABUSEIPDB_KEY,
        Accept: "application/json",
      },
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}