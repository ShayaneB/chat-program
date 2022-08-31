import React, { useState } from "react";
import axios from "axios";

const Chat = (props) => {
  const [msg, setMsg] = useState();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setMsg({ ...msg, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!msg) return;

    props.addMessage(msg);
    setMsg({ id: null, msg: "" });
  };

    const encodedParams = new URLSearchParams();
    const msgContent = msg && msg.msg   

  encodedParams.append("content", msgContent);
  encodedParams.append("censor-character", "*");

  const options = {
    method: "POST",
    url: "https://neutrinoapi-bad-word-filter.p.rapidapi.com/bad-word-filter",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "572422068amsh696ddce438f0e4dp16564bjsnb72b17631b93",
      "X-RapidAPI-Host": "neutrinoapi-bad-word-filter.p.rapidapi.com",
    },
    data: encodedParams,
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <>
      <ul className="main-content">
        {props.data.length > 0 &&
          props.data.map((messge) => (
            <li className="message-list" key={messge.id}>
              {messge.msg}
            </li>
          ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          className="msg-input"
          type="text"
          placeholder="Enter your message"
          name="msg"
          value={msg && msg.msg}
          onChange={handleInputChange}
        />
        <button type="submit"> SEND</button>
      </form>
    </>
  );
};

export default Chat;
