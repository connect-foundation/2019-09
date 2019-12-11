const getRankings = async offset => {
  try {
    const responseData = await fetch(`/api/ranking?offset=${offset}`, {
      method: 'GET',
    });
    const jsonData = await responseData.json();
    return jsonData;
  } catch (error) {
    return [];
  }
};

export { getRankings };
