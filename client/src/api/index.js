const getRankings = async (offset, dateTime) => {
  try {
    const responseData = await fetch(
      `/api/ranking?offset=${offset}&datetime=${dateTime}`,
      {
        method: 'GET',
      },
    );
    const jsonData = await responseData.json();
    return jsonData;
  } catch (error) {
    return [];
  }
};

const getRankingInformation = async () => {
  try {
    const responseData = await fetch(`/api/ranking/information`, {
      method: 'GET',
    });
    const jsonData = await responseData.json();
    return jsonData;
  } catch (error) {
    return [];
  }
};

export { getRankings, getRankingInformation };
