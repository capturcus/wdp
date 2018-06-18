#!/usr/bin/python
# -*- coding: utf-8 -*-

import json, sys, io
reload(sys)
sys.setdefaultencoding("utf-8")

associations = []

LINE = 80

def jsonClean(text):
    return text.replace("\"", "\\\"")

with io.open("skojarzenia.txt", "r", encoding="utf-8") as f:
    line = 0
    content = f.readlines()
    # remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content]
    associatedConcepts = []
    mainConcept = jsonClean(content[line])
    line += 1
    while line < len(content):
        if content[line].strip() != "":
            associatedConcepts.append(jsonClean(content[line].strip()))
        else:
            associations.append({
                "main": mainConcept,
                "associated": associatedConcepts,
            })
            associatedConcepts = []
            line += 1
            mainConcept = jsonClean(content[line])
        line += 1

with io.open("tester/src/app/associations.ts", "w", encoding="utf-8") as f:
    f.write(unicode("export default class Associations { public static ASSOCIATIONS = " + json.dumps(associations, indent=4).decode("unicode-escape")+";}"))