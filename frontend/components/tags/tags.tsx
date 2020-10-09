import React from 'react';

interface TagProps {
  tagName: string;
}
const Tags = ({ tagName }: TagProps) => {
  return (
    // <div className='tags'>
    <p className='tags'>#{tagName}</p>
    // </div>
  );
};

export default Tags;
