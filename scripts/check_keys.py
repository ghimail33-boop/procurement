import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/legalPrecedentsData.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print('Number of Act keys in opsByAct:', len(data['opsByAct']))
print('Act keys in opsByAct sample:', sorted(data['opsByAct'].keys())[:20])

print('Number of Rule keys in opsByRule:', len(data['opsByRule']))
print('Rule keys in opsByRule sample:', sorted(data['opsByRule'].keys(), key=lambda x: (len(x), x))[:25])

print('Number of Act keys in decByAct:', len(data['decByAct']))
print('Act keys in decByAct sample:', sorted(data['decByAct'].keys())[:20])

print('Number of Rule keys in decByRule:', len(data['decByRule']))
print('Rule keys in decByRule sample:', sorted(data['decByRule'].keys(), key=lambda x: (len(x), x))[:25])
