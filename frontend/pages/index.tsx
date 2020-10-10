import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import MediaContainer from '../components/mediaContainer/mediaContainer';
import Tags from '../components/tags/tags';
import { lightTheme, darkTheme } from '../theme/theme';
import { GlobalStyles } from '../theme/global';
import ToggleSwitch from '../components/switch/switch';
import Axios from 'axios';

const TagName = [
  {
    id: 1,
    name: 'EndSars',
  },

  {
    id: 2,
    name: 'EndSarsProtest',
  },
  {
    id: 3,
    name: 'EndSarsNow',
  },
  {
    id: 4,
    name: 'EndSarsImmediately',
  },
  {
    id: 5,
    name: 'EndSars!!!',
  },
];

const url = `https://endsars-dot-tweq-5cbdb.appspot.com/tweets?tag=endsars`;

const MediaContent = [
  {
    id: 1,
    media: '',
    username: '@chuks',
    dateTime: '5:15 PM · Oct 9, 2020',
  },
  {
    id: 2,
    media: '',
    username: '@bigbrutha',
    dateTime: '5:15 PM · Oct 9, 2020',
  },
  {
    id: 4,
    media: '',
    username: '@dewaleolaoye',
    dateTime: '5:15 PM · Oct 9, 2020',
  },
  {
    id: 3,
    media: '',
    username: '@badmask121',
    dateTime: '5:15 PM · Oct 9, 2020',
  },
];

export default function Home() {
  const [tweet, setTweetData] = useState({
    data: [
      {
        conts: '',
        tweets: [
          {
            id: '',
            timestamp: '',
            body: '',
            media: {
              display_url: '',
              id: '',
              id_str: '',
              media_url: '',
              media_url_https: '',
              type: '',
              url: '',
            },
            hashtag: '',
            user: {
              id: '',
              name: '',
              profile_image_url: '',
            },
          },
        ],
      },
    ],
  });

  const [theme, setTheme] = useState('light');

  const [todos, setTodos] = useState([]);

  const setMode = (mode: string) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    Axios.get(url).then((res) => {
      const response = res.data;
      setTweetData(response);
    });

    const localTheme = window.localStorage.getItem('theme');
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme
      ? setMode('dark')
      : localTheme
      ? setTheme(localTheme)
      : setMode('light');
  }, []);

  console.log(tweet, 'tweet data');

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />

      <div className='switchWrapper'>
        <ToggleSwitch switchHandler={toggleTheme} />
      </div>

      <div className='container'>
        <Head>
          <title>End SARS Journey #ENDSARS</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <h1>End Sars Journey!!!</h1>
        {/* {
          
        } */}
        <div className='container-tagWrapper'>
          {TagName.map(({ id, name }) => {
            return <Tags key={id} tagName={name} />;
          })}
        </div>

        <div className='container-mediaWrapper'>
          {MediaContent.map(({ id, dateTime, media, username }) => {
            return <MediaContainer key={id} dateTime={dateTime} username={username} />;
          })}
          {/* {tweet &&
            tweet.data.map(({ conts, tweets }) => {
              tweets.map(({ body, hashtag, id, media, timestamp, user }) => {
                return (
                  <>
                    <MediaContainer
                      key={id}
                      dateTime={timestamp}
                      username={user.name}
                    />
                  </>
                );
              });
            })} */}
        </div>
      </div>
    </ThemeProvider>
  );
}
