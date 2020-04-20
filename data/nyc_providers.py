import numpy as np
import csv
import json
import hashlib

from collections import defaultdict
term_count = defaultdict(lambda : 0)

with open('nycproviders.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    nyc_providers = [row for row in reader]

for hospital in nyc_providers:
    hospital['CITY'] = hospital['COUNTY']
    hospital['STATE'] = 'NEW YORK'

# Compute total occurances for TF-IDF
for hospital in nyc_providers:
    name = hospital['NAME']
    words = name.split()
    for word in words:
        term_count[word] += 1

# Now for each word, index on it if TF-IDF is greater than some threshold
term_to_provider = defaultdict(lambda : [])
for hospital in nyc_providers:
    name = hospital['NAME']
    words = name.split()
    for word in words:
        term_to_provider[word].append((hospital['ID'], np.log(1.0 + 1.0/len(words))*np.log(len(nyc_providers))/term_count[word]))

# Trim to the top ten for each term
for term in term_to_provider:
    term_to_provider[term] = [i for i,score in sorted(term_to_provider[term], key=lambda v : -v[1])[:10]]

column_map = {
    'NAME': 'name',
    'CITY': 'city',
    'STATE': 'state',
}

important_columns = ['NAME', 'CITY', 'STATE']

hospital_lookup = {
    'term_index': term_to_provider,
    'city_index': {},
    'id_index': { h['ID']: { column_map[k]: h[k] for k in important_columns } for h in nyc_providers }
};

with open('../src/data/hospital_index.js', 'w') as f:
    f.write('const index = ' + json.dumps(hospital_lookup) + '\n; export { index };\n')
