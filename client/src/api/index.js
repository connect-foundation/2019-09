const getRankingsTop100 = async () => {
  try {
    const resData = await fetch(`http://localhost:3000/api/ranking/top-100`, {
      method: 'GET',
    });
    const jsonData = await resData.json();
    return jsonData;
  } catch (error) {
    return [];
  }
};

export { getRankingsTop100 };
