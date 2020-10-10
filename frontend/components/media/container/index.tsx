import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import day from 'dayjs';
import { Spinner, Box } from '@chakra-ui/core';
import { MediaContent } from '..';
import { useTweetContext } from '../../context/Tweet';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/dist/client/router';

const Container = () => {
  const { fetchTweets, tweets, loading, error } = useTweetContext();
  const { query } = useRouter();

  useEffect(() => {
    const axiosSource = Axios.CancelToken.source();
    fetchTweets({ cancelToken: axiosSource.token });
    return () => axiosSource.cancel();
  }, []);

  const TweetsContent = React.useMemo(() => {
    return (
      Array.isArray(tweets) &&
      tweets.map((o) => (
        <MediaContent
          dateTime={day(o.timestamp).format('DD MMM YYYY, HH:MM')}
          username={o.user.name}
          media={o.media}
        />
      ))
    );
  }, [tweets]);

  const Loader = () => (
    <Box width='100%' d='flex' alignItems='center' justifyContent='center' paddingBottom='20px'>
      <Spinner size={'lg'} />
    </Box>
  );

  return (
    <React.Fragment>
      <InfiniteScroll
        dataLength={tweets.length} //This is important field to render the next data
        next={(e) => {
          if (tweets?.[tweets.length - 1]?.timestamp) {
            fetchTweets({
              lastTimestamp: tweets[tweets.length - 1].timestamp as number,
              tag: query?.index as string,
            });
          }
        }}
        hasMore={true}
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={() => {
          if (tweets?.[0]?.timestamp) {
            fetchTweets({
              lastTimestamp: tweets[0].timestamp as number,
              tag: query?.index as string,
            });
          }
        }}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        {TweetsContent}
      </InfiniteScroll>
    </React.Fragment>
  );
};

export default Container;
