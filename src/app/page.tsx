"use client"
import React from 'react'
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header with arrow icon',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header with no arrow icon',
    children: <p>{text}</p>,
  },
];

const Home = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <div className='w-screen h-screen '>
      <Collapse defaultActiveKey={['1']} onChange={onChange} items={items} />
    </div>
  )
}

export default Home






