# 使用文档

#### 1. 目录结构
&emsp;|-- demo  
&emsp;&emsp;&emsp;|-- cmd  
&emsp;&emsp;&emsp;|-- hint  
&emsp;&emsp;&emsp;&emsp;&emsp;DemoUpdateHintCmd — 设置红点   
&emsp;&emsp;&emsp;|-- model  
&emsp;&emsp;&emsp;&emsp;&emsp;DemoProxy — 与后端交互并处理数据  
&emsp;&emsp;&emsp;&emsp;&emsp;DemoModel — 数据存储  
&emsp;&emsp;&emsp;|-- ui  
&emsp;&emsp;&emsp;&emsp;&emsp;DemoView — 皮肤  
&emsp;&emsp;&emsp;|-- view  
&emsp;&emsp;&emsp;&emsp;&emsp;DemoMdr — 页面逻辑   
&emsp;&emsp;&emsp;DemoMod.ts — 模块初始化，注册Cmd、Proxy和Mdr    
&emsp;&emsp;&emsp;tsconfig.json — 项目依赖  

#### 2. 主要流程

* 根据目录结构创建文件
* 在DemoMod对Cmd、Proxy和Mdr进行注册
    * 在ModuleView.d.ts 加入该模块页面枚举
    * 在game\entry\def 下创建该模块定义文件，并定义所需事件和枚举
* 通过DemoProxy发送和接收协议与后端交互  
    * 存储数据到DemoModel
    * 派发事件触发DemoUpdateHintCmd重新计算红点
    * 派发事件通知DemoMdr对页面进行更新
    
#### 3. 补充说明
* 看一遍其他模块的就懂了


    