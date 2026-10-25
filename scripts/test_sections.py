import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/completeLawData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

sections = re.findall(r"sectionNo:\s*['\"]([^'\"]+)['\"]", text)
print('Total sections in completeLawData:', len(sections))
print('Sample sections:', sections[:15])

with open('src/data/ruleLawData.ts', 'r', encoding='utf-8') as f:
    text2 = f.read()
sections2 = re.findall(r"sectionNo:\s*['\"]([^'\"]+)['\"]", text2)
print('Total sections in ruleLawData:', len(sections2))
print('Sample sections2:', sections2[:20])

paren_sections = [s for s in sections2 if '(' in s or ')' in s]
print('Paren sections in ruleLawData:', paren_sections)
