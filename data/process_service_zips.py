import csv
import json

groceries = []
childcare = []
mentalhealth = []

with open('servicezipcodes.csv') as csvfile:
     spamreader = csv.reader(csvfile)
     rows = [row for row in spamreader][1:]
     groceries = [r[0] for r in rows if r[0] != '']
     childcare = [r[1] for r in rows if r[1] != '']
     mentalhealth = [r[2] for r in rows if r[2] != '']
     print "Groceries"
     print json.dumps(groceries)
     print "Childcare"
     print json.dumps(childcare)
     print "Mentalhealth"
     print json.dumps(mentalhealth)

