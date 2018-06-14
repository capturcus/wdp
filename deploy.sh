#!/bin/bash
set -e
./pytania2ts.py
./build.sh
git add --all
git commit -m"<quick deploy>"
git push
