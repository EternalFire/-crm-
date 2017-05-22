import React from 'react'

const logs = [
`
### v1.2.0, 2017.05.22

- 用户管理
    - 增加用户个人信息修改
    - 增加用户权限修改
    - 增加用户删除功能
`,
`
### v1.1.4, 2017.05.10

- 界面布局
    - 取消顶部区域
    - 侧边栏: 新增"用户退出", "关于"选项
    - 调整滚动条
`, 
`
### v1.1.3, 2017.05.09

- 网络咨询
    - 增加表格的展示列(班型, 专业, 学历, 学校)
    - 修改表格列顺序
    - 修改编辑框
    - 修改聊天信息样式
    - 增加列筛选功能
`
];

function renderLog(text, i) {  
  return (
    <div style={{ 
      marginBottom: "1em"
    }} key={i}>
      <pre style={{ 
        border: i == 0 ? "3px solid lightblue" : "2px solid lightgray", 
        borderRadius: "10px",
        display: "inline-block",
        width: "50em",
        paddingLeft: "2em",
        paddingBottom: "1.3em",
      }}>
        {text}
      </pre>
    </div>    
  );
}

const HomePage = () => (
  <section style={{
   fontSize: "1.1em",
  }}>
    <header style={{       
      padding: "2em 0" 
    }}>
      <h1>善班 CRM</h1>
    </header>

    <article>
      <h2>说明</h2>
      <br />
      <p>点击logo可伸缩侧边栏</p>
      <br />
    </article>
    
    <article>
      <h2 style={{
        marginBottom: "1em"
      }}>更新日志</h2>
      {logs.map(renderLog)}
    </article>
  </section>
)

export default HomePage