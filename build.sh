#!/bin/bash
set -e
cd tester
#npm run build --base-href "/wdp/$1/" --deploy-url "/wdp/$1/"
ng build --prod --base-href "/wdp/$1/" --deploy-url "/wdp/$1/"
cd ..
rm -rf docs/$1
mv tester/dist docs/$1
# sed -i'' 's/href="\/"/href="\/wdp\/"/' docs/index.html

