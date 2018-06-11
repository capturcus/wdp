#!/bin/bash
set -e
cd tester
npm run build
cd ..
rm -rf docs
mv tester/dist docs
sed -i'' 's/href="\/"/href="\/wdp\/"/' docs/index.html

