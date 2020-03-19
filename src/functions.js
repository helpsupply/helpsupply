function updateSearch(hospital_index, term) {
  let results = [];
  let city_hits = hospital_index.city_index[term] || [];

  for (var i = 0; i < city_hits.length; i++) {
    let h = hospital_index.id_index[city_hits[i]];
    let id = city_hits[i];
    results.push({ hospital: h, id: id });
  }

  let words = term.split(" ");
  let hits = [];
  for (var i = 0; i < words.length; i++) {
    let new_hits = hospital_index.term_index[words[i]] || [];
    if (new_hits.length > 0) {
      if (i == 0) {
        hits = new_hits;
      } else {
        hits = hits.filter(x => new_hits.includes(x));
      }
    }
  }

  for (var i = 0; i < hits.length; i++) {
    let h = hospital_index.id_index[hits[i]];
    let id = hits[i];
    results.push({ hospital: h, id: id });
  }

  // filter out for uniques
  var uniqueResults = [];
  results.forEach(function(result) {
    var i = uniqueResults.findIndex(x => x.id == result.id);
    if (i <= -1) {
      uniqueResults.push({ hospital: result.hospital, id: result.id });
    }
  });

  return uniqueResults;
}

export { updateSearch };
