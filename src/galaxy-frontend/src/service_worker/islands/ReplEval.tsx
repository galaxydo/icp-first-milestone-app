export async function POST(req, res) {
  const formData = await req.formData();
  const code = formData.get('code');

  if (typeof code !== 'string') {
    return res.html('Invalid code');
  }

  try {
    const result = eval(code);
    return res.html(String(result));
  } catch (error) {
    return res.html(String(error));
  }
}
