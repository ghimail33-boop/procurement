import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/legalPrecedentsData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

decByRule = data['decByRule']
decByAct = data['decByAct']

print("Top 10 Rules in PPRC decisions:")
for k, v in sorted(decByRule.items(), key=lambda x: len(x[1]), reverse=True)[:10]:
    print(f"  Rule {k}: {len(v)} decisions")

print("Top 10 Acts in PPRC decisions:")
for k, v in sorted(decByAct.items(), key=lambda x: len(x[1]), reverse=True)[:10]:
    print(f"  Act {k}: {len(v)} decisions")
