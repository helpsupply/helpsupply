/*
 * Janky React
 * This code is the library I use to create HTML elements from Javascript. It's tree based and functional, so
 * you can do pretty much anything. I expect someone will convert this all to React at some point but I'd
 * rather avoid the hassle initially
 */

function tag(kind, properties, ...children) {
	let el = document.createElement(kind)
	for (let key in properties) {
		if (key.slice(0,2) == "on") {
			el.addEventListener(key.slice(2), properties[key])
		}
		el.setAttribute(key, properties[key])
	}
	for (let child of children) {
		if (typeof child == "string") {
			el.appendChild(document.createTextNode(child))
		} else if (Array.isArray(child)) {
			child.map(c => c ? el.appendChild(c) : null)
		} else if (child === undefined || child === null) {
			// No-op	
		} else {
			el.appendChild(child)
		}
	}
	return el
}

function makeTag(kind) {
	return function(properties, ...children) {
		return tag.apply(null, [kind, properties].concat(children))
	}
}

let div = makeTag('div')
let span = makeTag('span')
let center = makeTag('center')
let h1 = makeTag('h1')
let h2 = makeTag('h2')
let h3 = makeTag('h3')
let form = makeTag('form')
let button = makeTag('button')
let input = makeTag('input')
let a = makeTag('a')
let b = makeTag('b')
let p = makeTag('p')
let ul = makeTag('ul')
let li = makeTag('li')
let em = makeTag('em')
let label = makeTag('label')
let textarea = makeTag('textarea')

/*
 * Needs definition
 * Should be self explanatory, but this allows us to dynamically add and update new needs
 * as we come aware of them while still remaining semi-structured.
 */

let TEXT_INPUT = "TEXT_INPUT";
let LONG_TEXT_INPUT = "LONG_TEXT_INPUT";
let TIMESPANS = "TIMESPANS";
let ZIPCODE = "ZIPCODE";
let AGES = "AGES";
let AGE_RANGE = "AGE_RANGE";

const descriptions = {
	"equipment_need": new Map([
		['title', 'Institutional Equipment'],
		['subject', [TEXT_INPUT, "What do you need?", "i.e. N-95 Masks"]],
		['comments', [LONG_TEXT_INPUT, "Other details?", ""]]
	]),
	"supply_run_need": new Map([
		['title', 'Personal Supply Runs'],
		['subject', [TEXT_INPUT, "What supplies (groceries, cleaning) do you need?", "i.e. Groceries for 2"]],
		['constraints', [LONG_TEXT_INPUT, "Any dietary or other constraints?", "i.e. We're vegetarian"]],
		['delivery_windows', [TIMESPANS, "When can someone drop it off?"]],
		['zipcode', [ZIPCODE, "What zip code do you need supplies?", "i.e. 12345"]],
	]),
	"care_need": new Map([
		['title', 'Personal Care'],
		['subject', [TEXT_INPUT, "What care do you need?", "i.e. Babysitting"]],
		['constraints', [LONG_TEXT_INPUT, "Are there special constraints?"]],
		['care_hours', [TIMESPANS, "When do you need care?"]],
		['child_ages', [AGES, "How old are your children?", "i.e. 1,3"]],
		['zipcode', [ZIPCODE, "What zip code do you need care in?", "i.e. 12345"]],
	]),

	"equipment_offer": new Map([
		['title', 'Equipment'],
		['subject', [TEXT_INPUT, "What can you offer?", "i.e. N-95 Masks"]],
		['quantity', [TEXT_INPUT, "How much do you have?", "i.e. 50"]],
	]),
	"supply_run_offer": new Map([
		['title', 'Supply Runs'],
		['subject', [TEXT_INPUT, "What can you supply?", "i.e. Groceries"]],
		['delivery_hours', [TIMESPANS, "When can you drop things off?"]],
		['zipcode', [ZIPCODE, "What zip code are you in?", "i.e. 12345"]],
	]),
	"care_offer": new Map([
		['title', 'Care'],
		['subject', [TEXT_INPUT, "What care can you provide?", "i.e. Babysitting"]],
		['care_hours', [TIMESPANS, "When can you watch children"]],
		['age_range', [AGE_RANGE, "What age are you comfortable watching?"]],
	])
};

const needs = ['equipment_need', 'supply_run_need', 'care_need'];
const offers = ['equipment_offer', 'supply_run_offer', 'care_offer'];

/*
 * Base hospital page definition
 */

function renderNeed(need) {
	return li({'class': 'list-group-item needoffer'}, need.subject);
}

function renderOffer(offer) {
	return li({'class': 'list-group-item needoffer'}, offer.subject);
}

function renderHospitalPage(parameters) {
	data = {info: {name:''}, needs: [], offers: []}
	document.body.appendChild(
		div({'class': ''},
			tag('nav', {'class': "navbar navbar-light bg-light"},
				span({'class': "navbar-brand mb-0 h1", 'id': 'hospitalname'}),
				a({'href': '#', 'class': "navbar-brand mb-0 h1 logored"}, "hospital.community")
			),
			div({'class': 'content'},
				div({ 'class': 'panel' },
					h3({}, "Needs"),
					span({ 'class': 'group', 'id': 'needslist' })),
				div({ 'class': 'panel' },
					h3({}, "Offers for Help"),
					span({ 'class': 'group' },
						offers.map(o => {
							return div({},
								h3({ class: 'group-label' }, descriptions[o].get('title')),
								ul({ class: 'list-group' },
									data.offers.filter(x => x.kind === o).map(renderOffer)),
								button({'class':'addbutton btn btn-secondary'}, 'Add'))
						}))))
	));

	indexLoaded.then(() => {
		var h = hospital_index.id_index[parameters.get('id')];
		document.getElementById('hospitalname').innerHTML = '<b>' + h.name + "</b> in " + h.city + ", " + h.state;
	});

	db.collection('need').where('location_id', '==', parameters.get('id')).get().then(
		snapshot => {
			let data = snapshot.docs.map(d => {
				var dict = d.data();
				dict['id'] = d.id;
				return dict;
			})
			console.log(data)

			needslist = needs.map(n => {
				return div({},
					h3({ class: 'group-label' }, descriptions[n].get('title')),
					ul({ class: 'list-group' },
						data.filter(x => x.kind === n).map(renderNeed)),
					button({
						'class': 'addbutton btn btn-secondary',
						onclick: () => { navigateTo('add_need?location_id='+parameters.get('id')+'&kind=' + n) }
					}, 'Add'))
			})

			let container = document.getElementById('needslist');
			container.innerHTML = '';
			needslist.map(x => container.appendChild(x));
		}
	).catch(console.log)
}

/*
 * Need and offer pages
 */ 

var form_pieces = {
	TEXT_INPUT: function(key, heading, placeholder) {
		return div({'class': 'form-group'}, 
				label({'for': key}, heading),
				input({'class': 'form-control', 'id': key, 'placeholder': placeholder || ""})
			);
	},
	LONG_TEXT_INPUT: function(key, heading, placeholder) {
		return div({'class': 'form-group'}, 
				label({'for': key}, heading),
				textarea({'class': 'form-control', 'id': key, 'placeholder': placeholder || "", 'rows': 3})
			);
	},
	TIMESPANS: function(key, heading) {
		return div({'class': 'form-group'}, 
				label({'for': key}, heading),
				input({'class': 'form-control', 'id': key, 'placeholder': "i.e. 10-2,3-11"})
			);
	},
	ZIPCODE: function(key, heading, placeholder) {
		return div({'class': 'form-group'}, 
				label({'for': key}, heading),
				input({'class': 'form-control', 'id': key, 'placeholder': placeholder || ""})
			);
	},
	AGES: function(key, heading, placeholder) {
		return div({'class': 'form-group'}, 
				label({'for': key}, heading),
				input({'class': 'form-control', 'id': key, 'placeholder': placeholder || ""})
			);
	},
	AGE_RANGE: function(key, heading, placeholder) {
		return div({'class': 'form-group'}, 
				label({'for': key}, heading),
				input({'class': 'form-control', 'id': key, 'placeholder': placeholder || ""})
			);
	}
}

/*
 * Home page
 */ 

function renderHomePage(parameters) {
	document.body.appendChild(
		div({'class': 'entryportal container-sm'}, 
			h3({'class': 'logored'}, 'hospital.community'),
			h2({}, 'Supporting our heroes on the front lines of COVID-19'),
			p({}, 'Hospitals and the people who staff them need our help with ', b({},'supplies, childcare and moral support'),'. Search below to find your local hospital and find out how to seek or provide help.'),
			form({},
				div({'class': 'form-group'},
					label({'for': 'searchterm', 'style': 'font-weight: bold'}, "Enter your City or Hospital Name"),
					input({'class': 'form-control', 'id':'searchterm', 'placeholder': 'i.e. New York or Zuckerberg'})),
				ul({'id': 'searchresults', 'class': 'list-group'})),
			center({}, span({'class': 'logored'}, 'hospital.community'), ' is a volunteer project put together by a global team of volunteers.')));

	function updateSearch() {
		var term = document.getElementById('searchterm').value.toUpperCase();
		var results = document.getElementById('searchresults');
		if (window.hospital_index) {
			results.innerHTML = '';
			city_hits = hospital_index.city_index[term] || [];

			for (var i = 0; i < city_hits.length; i++) {
				var h = hospital_index.id_index[city_hits[i]];
				var id = city_hits[i];
				results.appendChild(li(
					{'class': 'list-group-item result', onclick: ((id) => (() => navigateTo('hospital?id=' + id)))(id)},
					b({}, h.name), " in ", h.city, ", ", h.state));
			}

			words = term.split(' ');
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
				var h = hospital_index.id_index[hits[i]]
				var id = hits[i];
				results.appendChild(li(
					{'class': 'list-group-item result', onclick: ((id) => (() => navigateTo('hospital?id=' + id)))(id)},
					b({}, h.name), " in ", h.city, ", ", h.state));
			}
		}
	}

	var searchTimer = null;
	document.getElementById('searchterm').addEventListener('keyup', function (event) {
		if (searchTimer) {
			clearTimeout(searchTimer);
		}
		searchTimer = window.setTimeout(updateSearch, 300);
	});
}

var db = firebase.firestore();
if (location.hostname === "localhost") {
  db.settings({
    host: "localhost:8080",
    ssl: false
  });
}

function renderNeedSubmissionPage(parameters) {
	let kind = parameters.get('kind');
	let location_id = parameters.get('location_id');

	document.body.appendChild(
		div({'class': ''},
			div({'class': 'form'},
				p({id:'hospitalname'}),
				Array.from(descriptions[kind].keys()).map(prop => {
					if (prop !== 'title') {
						var p = descriptions[kind].get(prop)
						return form_pieces[p[0]].apply(null, [prop].concat(p.slice(1)));
					}
					return h2({}, 'Add a need for ' + descriptions[kind].get('title'));
				}),
				p({}, "After you submit, we will contact you via your preferred method to validate your affiliation (you'll just need to send us a badge photo)"),
				button({'type': 'button', 'class': 'btn btn-primary', onclick: () => {
					let to_submit = {
						location_id: location_id,
						kind: kind
					};

					Array.from(descriptions[kind].keys()).map(prop => {
						if (prop != 'title') to_submit[prop] = document.getElementById(prop).value;
					});

					// TODO: Validate everything
					db.collection('need').add(to_submit)
						.then(docRef => {
							console.log("Added doc", docRef);
							history.go(-1);
						})
						.catch(error => console.log("Error", error));
				}}, "Submit")
			)));

	indexLoaded.then(() => {
		var h = hospital_index.id_index[parameters.get('location_id')];
		document.getElementById('hospitalname').innerHTML = h.name;
	});

}

// renderNeedSubmissionPage(mock_hospital.info, 'care_need')

/*
 * Page Navigation
 * 
 */

let pageIndex = {
	'': renderHomePage,
	'hospital': renderHospitalPage,
	'add_need': renderNeedSubmissionPage
};

function loadPage(hash) {
	if (hash[0] == '#') hash = hash.slice(1);
	var page_name = hash.split('?', 1);
	var params = new URLSearchParams(hash.slice(page_name[0].length + 1))
	document.body.innerHTML = '';
	pageIndex[page_name](params);
}

function navigateTo(hash) {
	history.pushState({}, null, '#' + hash)
	loadPage(hash);
}

window.addEventListener('hashchange', () => loadPage(window.location.hash))

loadPage(window.location.hash)
