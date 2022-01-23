const sendData = async ({ url, method, data }) => {
  try {
    const props = {
      GET: { method: 'GET' },
      POST: {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    };
    const response = await fetch(url, {
      ...props[method],
    });
    // console.log(response);
    if (!response.ok) {
      throw response;
    }
    return { ok: true, data: await response.json() };
  } catch (response) {
    const errorMessage = `status: ${response.status}${
      response.statusText ? `, statusText: ${response.statusText}` : ''
    }`;
    console.error(errorMessage);
    return { ok: false };
  }
};

export default sendData;
