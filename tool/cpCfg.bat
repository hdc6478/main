@echo off
chcp 65001
set root=D:\project\p1_client\trunk

svn up %root%\proto --accept tc
svn up %root%\eui_prj\assets --accept tc

echo F |xcopy %root%\proto\tips_client.json %root%\eui_prj\assets\data_server\tips_client.json /Y /Q
echo F |xcopy %root%\proto\hints_client.json %root%\eui_prj\assets\data_server\hints_client.json /Y /Q
echo F |xcopy %root%\proto\gm_doc.json %root%\eui_prj\assets\data_server\gm_doc.json  /Y /Q
echo F |xcopy %root%\proto\reason.ts %root%\main\src\game\entry\config\Reason.ts  /Y /Q
echo F |xcopy %root%\eui_prj\assets\data\GameConfig.d.ts %root%\main\libs\config.g.d.ts  /Y /Q
echo F |xcopy %root%\eui_prj\assets\data\Localization.d.ts %root%\main\libs\Localization.d.ts  /Y /Q
pause
