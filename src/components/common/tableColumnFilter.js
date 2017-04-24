/**
 * 表格列筛选框
 */
import React from 'react';
import {Input, Button, Icon} from 'antd';
import styles from './tableColumnFilter.css'

function TableColumnFilter({
  value,
  placeholder,
  onChange,
  onPressEnter,
  onOk,
  onEmpty
}) {
  let inputNode;

  const handleEmpty = () => {
    if (onEmpty) {
      onEmpty()
    }

    inputNode.focus();
  };

  return (
    <div className={styles.box}>
      <Input 
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onPressEnter={onOk}
        suffix={value ? <Icon className={styles.empty} type="close-circle" onClick={handleEmpty} /> : null}
        style={{
          width: 140,
          margin: 2
        }}
        ref={node => inputNode = node}
      />
      <Button type="primary" onClick={onOk}>确定</Button>
    </div>    
  )
}

export default TableColumnFilter