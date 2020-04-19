export const buildNeighborhoodOptions = (zipData) => {
  const target = zipData.map((zip) => {
    // data come back as: ['3', 'BK68', 'Brooklyn', 'Fort Greene']
    return { label: zip[3], value: `${zip[2]}: ${zip[3]}` };
  });

  return target;
};
