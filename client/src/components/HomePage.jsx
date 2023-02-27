import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
// import { Segment } from "semantic-ui-react";

const HomePage = () => {
  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#EF6C00",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#EF6C00",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };
  const steps = [
    {
      id: "Greet",
      message: "Hello, Welcome to our website",
      trigger: "Ask Name",
    },
    {
      id: "Ask Name",
      message: "Please enter your name",
      trigger: "waiting",
    },
    {
      id: "waiting",
      user: true,
      trigger: "Name",
    },
    {
      id: "Name",
      message: `Hi {previousValue}, Please select your issue`,
      trigger: "issues",
    },
    {
      id: "issues",
      options: [
        { value: "React", label: "React", trigger: "React" },
        { value: "Vue", label: "Vue", trigger: "Vue" },
      ],
    },
    {
      id: "React",
      message: "Thanks for telling your react issue",
      end: true,
    },
    {
      id: "Vue",
      message: "Thanks for telling your vue issue",
      end: true,
    },
  ];
  return (
    <>
      <h1>Holi</h1>

      <div className="d-flex justify-content-end align-items-end">
        <ThemeProvider theme={theme}>
          <ChatBot steps={steps} floating="true" />
        </ThemeProvider>
      </div>
    </>
  );
};

export default HomePage;
