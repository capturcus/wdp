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

BOLD = '\033[1m'

while True:
    randNum = random.randint(0, len(questions)-1)
    randomQuestion = questions[randNum]
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
    good = False
    for q in randomQuestion["options"]:
        if breakPrompt(q[0]) == answers['question']:
            good = q[1]
    if good:
        questionsCorrect += 1
        print(Fore.GREEN + "DOBRZE" + Style.RESET_ALL)
    else:
        print(Fore.RED + "ŹLE" + Style.RESET_ALL)
        for option in randomQuestion["options"]:
            if option[1]:
                print(BOLD + option[0] + Style.RESET_ALL)
            else:
                print(option[0])
    print("\n"+str(questionsCorrect)+"/"+str(questionsAsked)+", zostało: "+str(len(questions))+"\n")

    del questions[randNum]

    if answers == {}:
        break
