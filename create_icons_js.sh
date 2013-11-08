#!/bin/sh
echo "icons = (function(a) {a.pop(); return a;})([" `find . -name "*.png" | sed  's/\(.*\)/"\1",/'` "null]);" > ressources/icons.js
