async function callApi(url, method = 'GET', data = null) {
  const apiUrl = `http://135.181.165.228:8080${url}`;

  const headers = {
    'Content-Type': 'application/json',
  };

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(apiUrl, options);
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();

  } catch (error) {
    throw new Error(`API request failed: ${error.message}`);
  }
}

export default callApi;
