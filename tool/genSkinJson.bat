@echo off
chcp 65001
set root=D:\project\p1_client\trunk

svn up %root%\main\tool --accept tc

cd %root%\main\tool
@set PATH=%PATH%;%cd%;
node src\GenResJson.js %root%\eui_prj\resource skins
pause