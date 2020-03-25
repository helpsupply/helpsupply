function searchByZip(hospital_index, zip) {
  let results = [];
  let city_hits = hospital_index.zip_index[zip] || [];

  for (var i = 0; i < city_hits.length; i++) {
    let h = hospital_index.id_index[city_hits[i]];
    let id = city_hits[i];
    results.push({ h, id });
  }

  return results;
}

module.exports = {
  searchByZip: searchByZip
};
