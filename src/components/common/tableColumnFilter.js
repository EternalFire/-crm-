import React from 'react';
import {Input, Button} from 'antd';

function TableColumnFilter({
  value,
  placeholder,
  onChange,
  onPressEnter,
  onOk
}) {
  return (
    <div style={{
      padding: '8px',
      borderRadius: '6px',
      background: '#fff',
      boxShadow: '0 1px 6px rgba(0, 0, 0, .2)'
    }}>
      <Input 
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onPressEnter={onOk}
        style={{
          width: 130
        }}
      />
      <Button type="primary" onClick={onOk}>确定</Button>
    </div>    
  )
}

export default TableColumnFilter