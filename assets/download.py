#!/bin/env python3

import os
import json
import urllib.request

base_url = 'https://pirati.alvarium.cz/'
paths = [
  'budget_items',
  'budgetary_compositions',
  'centers',
  'organs',
  'budgets/budget_items',
  'budgets/centers',
  'budgets'
]

if not os.path.isdir('budgets'):
    os.mkdir('budgets')

for path in paths:
    url = base_url + path + '.json'
    filename = path + '.json'
    response = urllib.request.urlopen(url)
    js = json.load(response)
    print(filename, 'records:', len(js))
    with open(filename, 'w') as fp:
        json.dump(js, fp, indent=2)
