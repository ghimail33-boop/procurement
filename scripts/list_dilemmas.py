import re, sys

sys.stdout.reconfigure(encoding='utf-8')
with open('src/data/procurementDilemmasData.ts', encoding='utf-8') as f:
    text = f.read()
    questions = re.findall(r"question:\s*['\"]([^'\"]+)['\"]", text)
    for i, q in enumerate(questions, 1):
        print(f"{i}. {q}")
