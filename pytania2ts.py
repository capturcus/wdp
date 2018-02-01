#!/usr/bin/python
# -*- coding: utf-8 -*-

import json, sys, io
reload(sys)
sys.setdefaultencoding("utf-8")

questions = []

LINE = 80

def jsonClean(text):
    return text.replace("\"", "\\\"")

def breakPrompt(text):
    words = text.split(" ")
    out = ""
    leng = 0
    for word in words:
        if leng > LINE:
            out += "\n" + word + " "
            leng = 0
        else:
            out += word + " "
            leng += len(word)
    return out

with io.open("pytania.txt", "r", encoding="utf-8") as f:
    line = 0
    content = f.readlines()
    # remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content]
    while line < len(content):
        questionPrompt = jsonClean(content[line])
        line += 2  # skip break
        options = []
        for i in range(4):
            options.append((jsonClean(content[line][:-1]), True) if content[line][-1] == "x" else (jsonClean(content[line]), False))
            line += 1
        line += 1  # skip ---
        questions.append({
            "prompt": questionPrompt,
            "options": options,
        })

with io.open("tester/src/app/pytania.ts", "w", encoding="utf-8") as f:
    f.write(unicode("export default class Questions { public static QUESTIONS = " + json.dumps(questions, indent=4).decode("unicode-escape")+";}"))