import React from 'react';

interface MediaProps {
  // media is either image or video
  media?: string;
  username: string;
  dateTime: string;
}
const MediaContainer = ({ dateTime, media, username }: MediaProps) => {
  return (
    <div className='media-container'>
      <div className='media-container__contents'>
        <p>Media Wrapper</p>
      </div>

      <div className='media-container__poster'>
        <p className='poster'>{username}</p>
        <p className='date'>{dateTime}</p>
      </div>
    </div>
  );
};

export default MediaContainer;
