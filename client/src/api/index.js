const getRankings = async offset => {
  try {
    const resData = await fetch(`/api/ranking?offset=${offset}`, {
      method: 'GET',
    });
    const jsonData = await resData.json();
    return jsonData;
  } catch (error) {
    return [];
  }
};

export { getRankings };
