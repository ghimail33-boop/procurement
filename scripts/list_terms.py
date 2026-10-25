import re

with open('src/data/procurementGlossaryData.ts', encoding='utf-8') as f:
    text = f.read()
    terms = re.findall(r"termEnglish:\s*['\"]([^'\"]+)['\"]", text)
    for i, t in enumerate(terms, 1):
        print(f"{i}. {t}")
