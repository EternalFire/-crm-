import React from 'react'

const logs = [
`
### v1.1.3, 2017.05.09

- 网络咨询
    - 增加表格的展示列(班型, 专业, 学历, 学校)
    - 修改表格列顺序
    - 修改编辑框
    - 修改聊天信息样式
    - 增加列筛选功能
`,

];

function renderLog(text, i) {
  return (
    <div style={{ fontSize: "1.1em" }} key={{i}}>
      <pre>{text}</pre>
    </div>    
  );
}

const HomePage = () => (
  <section>
    <header style={{ marginBottom: "2em" }}>
      <h1>善班 CRM</h1>
    </header>    
    <article>
      <h2>更新日志</h2>
      {logs.map(renderLog)}
    </article>
  </section>
)

export default HomePage