#! /bin/sh
#
# compile.sh
# Copyright (C) 2014 Yannick Huerre <yannick.huerre@gmail.com>
#
# Distributed under terms of the MIT license.
#
cd ../
pleeease compile
uglifyjs js/featherbox.js -o ../build/featherbox.js --comments '/^!/' 
cd -
