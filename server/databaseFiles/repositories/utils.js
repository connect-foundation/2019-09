const convertSequelizeArrayData = sequelizeArrayData => {
  const convertedData = sequelizeArrayData.map(data => {
    return data.dataValues;
  });
  return convertedData;
};

module.exports = { convertSequelizeArrayData };
