function updateSearch() {
  var term = document.getElementById("searchterm").value.toUpperCase();
  var results = document.getElementById("searchresults");
  console.log("searching");
  /*
  if (window.hospital_index) {
    results.innerHTML = "";
    city_hits = hospital_index.city_index[term] || [];

    for (var i = 0; i < city_hits.length; i++) {
      var h = hospital_index.id_index[city_hits[i]];
      var id = city_hits[i];
      results.appendChild(
        li(
          {
            class: "list-group-item result",
            onclick: (id => () => navigateTo("hospital?id=" + id))(id)
          },
          b({}, h.name),
          " in ",
          h.city,
          ", ",
          h.state
        )
      );
    }

    words = term.split(" ");
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
      var h = hospital_index.id_index[hits[i]];
      var id = hits[i];
      results.appendChild(
        li(
          {
            class: "list-group-item result",
            onclick: (id => () => navigateTo("hospital?id=" + id))(id)
          },
          b({}, h.name),
          " in ",
          h.city,
          ", ",
          h.state
        )
      );
    }
  }
  */
}
