/*
 * 进度标签
 */
import React from 'react';
import { Tag } from 'antd';

const genKey = function *(num) {
  let i = 0;
  while(i < num) {    
    yield ++i;
  }
}


const ProgressTags = ({customer}) => {
  let tags = [];
  const generator = genKey(10)

  if (customer.fsTime) tags.push((<Tag key={generator.next().value} color="blue">复试</Tag>));
  if (customer.ybTime) tags.push((<Tag key={generator.next().value} color="green">预报</Tag>));
  if (customer.jbTime) tags.push((<Tag key={generator.next().value} color="blue">进班</Tag>));
  if (customer.zjTime) tags.push((<Tag key={generator.next().value} color="green">转缴</Tag>));
  if (customer.fkTime) tags.push((<Tag key={generator.next().value} color="green">放款</Tag>));
  if (customer.tybTime) tags.push((<Tag key={generator.next().value} >退预报</Tag>));
  if (customer.tfkTime) tags.push((<Tag key={generator.next().value} >退放款</Tag>));

  return (<div>{tags}</div>);    
}

export default ProgressTags;