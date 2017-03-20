/*
 * 进度标签
 */
import React from 'react';
import { Tag } from 'antd';

function ProgressTags({customer}) {
  let tags = [];
  if (customer.fsTime) tags.push((<Tag color="blue">复试</Tag>));
  if (customer.ybTime) tags.push((<Tag color="green">预报</Tag>));
  if (customer.jbTime) tags.push((<Tag color="blue">进班</Tag>));
  if (customer.zjTime) tags.push((<Tag color="green">转缴</Tag>));
  if (customer.fkTime) tags.push((<Tag color="green">放款</Tag>));
  if (customer.tybTime) tags.push((<Tag>退预报</Tag>));
  if (customer.tfkTime) tags.push((<Tag>退放款</Tag>));

  return (<div>{tags}</div>);    
}

export default ProgressTags;