async function postData(url, data) {
  const res = await fetch(url, {
    method: "POST",
    body: data,
    headers: { "Content-type": "application/json" },
  });

  return await res.json();
}

async function getResourse(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch, status: ${res.status}`);
  }

  return await res.json();
}

export { postData };
export { getResourse };
