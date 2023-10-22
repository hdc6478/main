module.exports = [
    // 第一个服务器
    {
        host: "c1.y6.gzyyou.xyz", // 主机名，必须
        port: 80, // 端口，必须
        root: "D:/project/y6/trunk/y6_test", // 本地文件根目录，必须
        virtualDirectory: [ // 虚拟目录列表，可选
            {
                path: "/assets", // 浏览路径
                physicalPath: "../eui_prj/assets" // 本地物理路径，相对于根目录，可以用绝对路径
            },
            {path: "/resource", physicalPath: "../eui_prj/resource"},
        ],
        // watch: [ // 观察列表，可选
        //     {
        //         path: "/resource/default.thm.json", // 浏览路径
        //         physicalPath: "./dist-product/eui/gameEui.json", // 本地物理路径
        //         watchPath: "../eui_prj/resource/eui_skins", // 观察目录路径
        //         execCmd: "cd D:/project/y3/eui_prj && egret publish" // 目录变化执行命令
        //     }
        // ]
    },
    // 多个服务器配置
     {
        host: "c2.y6.gzyyou.xyz",
        port: 81,
        root: "D:/project/y6/trunk/bin-release"
    },
    {
        host: "editor.y6.gzyyou.xyz",
        port: 82,
        root: "D:/project/y6/trunk/editor"
    },
    {
        host: "editorres.y6.gzyyou.xyz",
        port: 83,
        root: "D:/project/y6/trunk/editorout"
    }, 
];