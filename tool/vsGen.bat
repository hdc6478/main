@echo off
cd ../..
set root=%cd%

svn up %root%\tool --accept tc
node %root%\tool\GenVer.js -p %root%
pause