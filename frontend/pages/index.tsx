import React, { useEffect, useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import MediaContainer from "../components/mediaContainer/mediaContainer";
import Tags from "../components/tags/tags";
import { lightTheme, darkTheme } from "../theme/theme";
import { GlobalStyles } from "../theme/global";
import ToggleSwitch from "../components/switch/switch";
import { ChakraProvider, Text } from "@chakra-ui/core";

const TagName = [
  {
    id: 1,
    name: "EndSars",
  },

  {
    id: 2,
    name: "EndSarsProtest",
  },
  {
    id: 3,
    name: "EndSarsNow",
  },
  {
    id: 4,
    name: "EndSarsImmediately",
  },
  {
    id: 5,
    name: "EndSars!!!",
  },
];

const MediaContent = [
  {
    id: 1,
    media: "",
    username: "@chuks",
    dateTime: "5:15 PM · Oct 9, 2020",
  },
  {
    id: 2,
    media: "",
    username: "@bigbrutha",
    dateTime: "5:15 PM · Oct 9, 2020",
  },
  {
    id: 4,
    media: "",
    username: "@dewaleolaoye",
    dateTime: "5:15 PM · Oct 9, 2020",
  },
  {
    id: 3,
    media: "",
    username: "@badmask121",
    dateTime: "5:15 PM · Oct 9, 2020",
  },
];

export default function Home() {
  const [theme, setTheme] = useState("light");

  const setMode = (mode: string) => {
    window.localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setMode("dark");
    } else {
      setMode("light");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches &&
    !localTheme
      ? setMode("dark")
      : localTheme
      ? setTheme(localTheme)
      : setMode("light");
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <ChakraProvider resetCSS>
        <GlobalStyles />

        <div className="switchWrapper">
          <ToggleSwitch switchHandler={toggleTheme} />
        </div>

        <div className="container">
          <Head>
            <title>End SARS Journey #ENDSARS</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Text className="title">End Sars, The Journey!!!</Text>

          <div className="container-tagWrapper">
            {TagName.map(({ id, name }) => {
              return <Tags key={id} tagName={name} />;
            })}
          </div>

          <div className="container-mediaWrapper">
            {MediaContent.map(({ id, dateTime, media, username }) => {
              return (
                <MediaContainer
                  key={id}
                  dateTime={dateTime}
                  username={username}
                />
              );
            })}
          </div>
        </div>
      </ChakraProvider>
    </ThemeProvider>
  );
}
