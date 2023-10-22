@echo off
chcp 65001
set root=D:\project\p1_client\trunk

svn up %root%\main\tool --accept tc

node %root%\main\tool\src\EgretBuild.js -p %root% --target %1 --declaration true --sourceMap true