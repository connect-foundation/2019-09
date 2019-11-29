const getRandomColor = () => {
  const colorList = [
    '#32ff7e',
    '#67e6dc',
    '#3d3d3d',
    '#c56cf0',
    '#ff3838',
    '#17c0eb',
    '#ffb8b8',
    '#ff9f1a',
    '#7158e2',
  ];
  return colorList[Math.round(Math.random() * colorList.length)];
};

module.exports = { getRandomColor };
