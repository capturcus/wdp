#!/usr/bin/python
# -*- coding: utf-8 -*-

import json, sys, random
from whaaaaat import prompt, print_json
from colorama import Fore, Back, Style
reload(sys)
sys.setdefaultencoding("utf-8")

questions = []

LINE = 80

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

with open("pytania.txt") as f:
    line = 0
    content = f.readlines()
    # remove whitespace characters like `\n` at the end of each line
    content = [x.strip() for x in content]
    while line < len(content):
        questionPrompt = content[line]
        line += 2  # skip break
        options = []
        for i in range(4):
            options.append((content[line][:-1], True) if content[line][-1] == "x" else (content[line], False))
            line += 1
        line += 1  # skip ---
        questions.append({
            "prompt": questionPrompt,
            "options": options,
        })

questionsAsked = 0
questionsCorrect = 0

while True:
    randomQuestion = random.choice(questions)
    whatQuestion = [
        {
        'type': 'list',
        'name': 'question',
        'message': breakPrompt(randomQuestion["prompt"]),
        'choices': [breakPrompt(x[0]) for x in randomQuestion["options"]]
        },
    ]

    questionsAsked += 1

    answers = prompt(whatQuestion)
    goodAns = ""
    for q in randomQuestion["options"]:
        if q[1]:
            goodAns = q[0]
    for q in randomQuestion["options"]:
        if breakPrompt(q[0]) == answers['question']:
            if q[1]:
                print(Fore.GREEN + 'DOBRZE' + Style.RESET_ALL)
                questionsCorrect += 1
            else:
                print(Fore.RED + 'ŹLE' + Style.RESET_ALL+"\ndobra odpowiedź: "+goodAns)
    print("\n"+str(questionsCorrect)+"/"+str(questionsAsked)+"\n")
    if answers == {}:
        break
