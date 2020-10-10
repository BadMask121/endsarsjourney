import React from 'react';
import { Media } from '../../../../@types/tweet';
import Player from '../player';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

interface MediaProps {
  media: Media[];
  username: string;
  dateTime: string;
}
const Content = ({ dateTime, media, username }: MediaProps) => {
  const _renderMedia = media.map((o, i) => {
    return (
      <Slide key={i} index={i}>
        <Player {...o} videoProp={{ playing: true }} />
      </Slide>
    );
  });

  return (
    <div className='media-container'>
      <div className='media-container__contents'>
        <CarouselProvider naturalSlideWidth={1} naturalSlideHeight={1} totalSlides={media.length}>
          <Slider>{_renderMedia}</Slider>
          {/* <Box>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </Box> */}
        </CarouselProvider>
      </div>
      <div className='media-container__poster'>
        <p className='poster'>{username}</p>
        <p className='date'>{dateTime}</p>
      </div>
    </div>
  );
};

export default Content;
