import re

with open('src/data/procurementGlossaryData.ts', encoding='utf-8') as f:
    g_content = f.read()
    g_count = len(re.findall(r"id:\s*['\"]", g_content))
    print(f"Glossary count: {g_count}")

with open('src/data/procurementDilemmasData.ts', encoding='utf-8') as f:
    d_content = f.read()
    d_count = len(re.findall(r"id:\s*['\"]", d_content))
    print(f"Dilemmas count: {d_count}")
