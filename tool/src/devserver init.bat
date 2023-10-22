@echo off
title devsever init
cd /D %~dp0
SET APP_PATH="node %cd%\devserver.js"
SCHTASKS /CREATE /TN devserver-y6 /SC ONSTART /DELAY 0001:00 /TR %APP_PATH% /RU SYSTEM /F
SCHTASKS /RUN /TN devserver-y6 /I
pause