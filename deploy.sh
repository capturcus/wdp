#!/bin/bash
#./pytania2ts.py
./build.sh $1
git add docs
git commit -m"<quick deploy>"
git push
