import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";

const ChatIntro = () => {
  const [connection, setConnection] = useState(null);
  const [inputText, setInputText] = useState("");
  const url = "https://fruitseasonms.azurewebsites.net";

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${url}/chat?userid=${userLogin.userId}`)
      .withAutomaticReconnect()
      .build();
    setConnection(connect);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on("ReceiveMessage", (sender, receiver, message, time) => {
            var chatUserId = document.getElementById('user-chat-id').textContent;
            let chatHistory = document.getElementById('chatHistory');

            if (sender == userLogin.userId + '' && receiver == chatUserId) {
              chatHistory.appendChild(createChatHistory(sender, message, time));
            }
            if (sender == chatUserId && receiver == userLogin.userId + '') {
              chatHistory.appendChild(createChatHistory(sender, message, time));
            }

            const chatLast = chatHistory.lastElementChild;
            chatLast.scrollIntoView({ behavior: "smooth" });
          });
        })
        .catch((error) => console.log(error));
    }

    return () => {
      if (connection) {
        connection.on("ReceiveMessage", (sender, receiver, message, time) => {

        });
      }
    };
  }, [connection]);

  var userInformation = localStorage.getItem('user');
  var userLogin = JSON.parse(userInformation);
  var token = userLogin.accessToken;

  console.log(token);
  if (!token) {
    alert('Please login before continue chat.');
    window.location.href = 'login.html';
  }

  fetch(`${url}/Chats/Users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      let users = response;
      let userList = document.getElementById('users');
      userList.innerHTML = '';
      users.forEach(user => {
        var li = document.createElement('li');
        li.className = 'person';
        li.innerHTML += `<div class="user">
                                        <img src= '../../avatar-1.png' alt="Retail Admin">
                                        <span class="status busy"></span>
                                    </div>`;
        li.innerHTML += `<p class="name-time">
                                        <span class="name">${user.fullName}</span>
                                    </p>`;

        li.setAttribute('data-chat', user.userId);
        li.addEventListener('click', () => {
          document.getElementById('send-to-user').textContent = user.fullName;
          document.getElementById('user-chat-id').textContent = user.userId;
          document.getElementById('user-chat-image').textContent = user.profileImageUrl;
          loadChatHistory(user);
        });
        userList.appendChild(li);
      });
    })
    .catch(error => {
      console.log(error);
    })

  function loadChatHistory(user) {
    fetch(`${url}/Chats/History/${user.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response);
        let chatHistory = document.getElementById('chatHistory');
        chatHistory.innerHTML = '';

        response.forEach(chat => {
          chatHistory.appendChild(createChatHistory(chat.sender, chat.message, chat.sendTimeOnUtc));
        });

        const chatLast = chatHistory.lastElementChild;
        chatLast.scrollIntoView({ behavior: "smooth" });
      })
      .catch(error => console.log(error));
  }

  function createChatHistory(sender, message, sendTimeOnUtc) {
    var li = document.createElement('li');
    let date = new Date(sendTimeOnUtc);
    let image = '../../avatar-1.png';

    if (sender == userLogin.userId) {
      li.className = 'chat-right';
      sender = userLogin.fullName;
    }
    else {
      li.className = 'chat-left';
      sender = document.getElementById('send-to-user').textContent;
    }

    li.innerHTML += `<div class="chat-avatar">
                                    <img src= ${image} alt="Retail Admin">
                                    <div class="chat-name">${sender}</div>
                                </div>`;
    li.innerHTML += `<div class="chat-text">
                                    ${message}
                                </div>
                                <div class="chat-hour">
                                    ${date.getHours()}:${date.getMinutes()} <span class="fa fa-check-circle"></span>
                                </div>`;

    return li;
  }

  const sendMessage = async (event) => {
    if (connection) {
      if (event.key === 'Enter' && event.target.value != '') {
        try {
          let messageElement = document.getElementById('message');
          let sender = userLogin.userId + '';
          let receiver = document.getElementById('user-chat-id').textContent;
          if (receiver == '') {
            alert('Cần chọn người bạn muốn nhắn tin trước')
            messageElement.value = '';
            return;
          }
          let message = messageElement.value;

          await connection.invoke("SendMessage", sender, receiver, message);
          messageElement.value = '';
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  return (
    <div style={{ height: '90vh' }}>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html:
            "\n        body {\n            height: 90vh;\n        }\n\n        .chat-search-box {\n            -webkit-border-radius: 3px 0 0 0;\n            -moz-border-radius: 3px 0 0 0;\n            border-radius: 3px 0 0 0;\n            padding: .75rem 1rem;\n        }\n\n        .chat-search-box .input-group .form-control {\n            -webkit-border-radius: 2px 0 0 2px;\n            -moz-border-radius: 2px 0 0 2px;\n            border-radius: 2px 0 0 2px;\n            border-right: 0;\n        }\n\n        .chat-search-box .input-group .form-control:focus {\n            border-right: 0;\n        }\n\n        .chat-search-box .input-group .input-group-btn .btn {\n            -webkit-border-radius: 0 2px 2px 0;\n            -moz-border-radius: 0 2px 2px 0;\n            border-radius: 0 2px 2px 0;\n            margin: 0;\n        }\n\n        .chat-search-box .input-group .input-group-btn .btn i {\n            font-size: 1.2rem;\n            line-height: 100%;\n            vertical-align: middle;\n        }\n\n        @media (max-width: 767px) {\n            .chat-search-box {\n                display: none;\n            }\n        }\n\n\n        /************************************************\n\t************************************************\n\t\t\t\t\t\t\t\t\tUsers Container\n\t************************************************\n************************************************/\n\n        .users-container {\n            position: relative;\n            padding: 1rem 0;\n            border-right: 1px solid #e6ecf3;\n            height: 100%;\n            display: -ms-flexbox;\n            display: flex;\n            -ms-flex-direction: column;\n            flex-direction: column;\n        }\n\n\n        /************************************************\n\t************************************************\n\t\t\t\t\t\t\t\t\t\t\tUsers\n\t************************************************\n************************************************/\n\n        .users {\n            padding: 0;\n        }\n\n        .users .person {\n            position: relative;\n            width: 100%;\n            padding: 10px 1rem;\n            cursor: pointer;\n            border-bottom: 1px solid #f0f4f8;\n        }\n\n        .users .person:hover {\n            background-color: #ffffff;\n            /* Fallback Color */\n            background-image: -webkit-gradient(linear, left top, left bottom, from(#e9eff5), to(#ffffff));\n            /* Saf4+, Chrome */\n            background-image: -webkit-linear-gradient(right, #e9eff5, #ffffff);\n            /* Chrome 10+, Saf5.1+, iOS 5+ */\n            background-image: -moz-linear-gradient(right, #e9eff5, #ffffff);\n            /* FF3.6 */\n            background-image: -ms-linear-gradient(right, #e9eff5, #ffffff);\n            /* IE10 */\n            background-image: -o-linear-gradient(right, #e9eff5, #ffffff);\n            /* Opera 11.10+ */\n            background-image: linear-gradient(right, #e9eff5, #ffffff);\n        }\n\n        .users .person.active-user {\n            background-color: #ffffff;\n            /* Fallback Color */\n            background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f9fb), to(#ffffff));\n            /* Saf4+, Chrome */\n            background-image: -webkit-linear-gradient(right, #f7f9fb, #ffffff);\n            /* Chrome 10+, Saf5.1+, iOS 5+ */\n            background-image: -moz-linear-gradient(right, #f7f9fb, #ffffff);\n            /* FF3.6 */\n            background-image: -ms-linear-gradient(right, #f7f9fb, #ffffff);\n            /* IE10 */\n            background-image: -o-linear-gradient(right, #f7f9fb, #ffffff);\n            /* Opera 11.10+ */\n            background-image: linear-gradient(right, #f7f9fb, #ffffff);\n        }\n\n        .users .person:last-child {\n            border-bottom: 0;\n        }\n\n        .users .person .user {\n            display: inline-block;\n            position: relative;\n            margin-right: 10px;\n        }\n\n        .users .person .user img {\n            width: 48px;\n            height: 48px;\n            -webkit-border-radius: 50px;\n            -moz-border-radius: 50px;\n            border-radius: 50px;\n        }\n\n        .users .person .user .status {\n            width: 10px;\n            height: 10px;\n            -webkit-border-radius: 100px;\n            -moz-border-radius: 100px;\n            border-radius: 100px;\n            background: #e6ecf3;\n            position: absolute;\n            top: 0;\n            right: 0;\n        }\n\n        .users .person .user .status.online {\n            background: #9ec94a;\n        }\n\n        .users .person .user .status.offline {\n            background: #c4d2e2;\n        }\n\n        .users .person .user .status.away {\n            background: #f9be52;\n        }\n\n        .users .person .user .status.busy {\n            background: #fd7274;\n        }\n\n        .users .person p.name-time {\n            font-weight: 600;\n            font-size: .85rem;\n            display: inline-block;\n        }\n\n        .users .person p.name-time .time {\n            font-weight: 400;\n            font-size: .7rem;\n            text-align: right;\n            color: #8796af;\n        }\n\n        @media (max-width: 767px) {\n            .users .person .user img {\n                width: 30px;\n                height: 30px;\n            }\n\n            .users .person p.name-time {\n                display: none;\n            }\n\n            .users .person p.name-time .time {\n                display: none;\n            }\n        }\n\n\n        /************************************************\n\t************************************************\n\t\t\t\t\t\t\t\t\tChat right side\n\t************************************************\n************************************************/\n\n        .selected-user {\n            width: 100%;\n            padding: 0 15px;\n            min-height: 64px;\n            line-height: 64px;\n            border-bottom: 1px solid #e6ecf3;\n            -webkit-border-radius: 0 3px 0 0;\n            -moz-border-radius: 0 3px 0 0;\n            border-radius: 0 3px 0 0;\n        }\n\n        .selected-user span {\n            line-height: 100%;\n        }\n\n        .selected-user span.name {\n            font-weight: 700;\n        }\n\n        .chat-container {\n            position: relative;\n            padding: 1rem;\n        }\n\n        .chat-container li.chat-left,\n        .chat-container li.chat-right {\n            display: flex;\n            flex: 1;\n            flex-direction: row;\n            margin-bottom: 40px;\n        }\n\n        .chat-container li img {\n            width: 48px;\n            height: 48px;\n            -webkit-border-radius: 30px;\n            -moz-border-radius: 30px;\n            border-radius: 30px;\n        }\n\n        .chat-container li .chat-avatar {\n            margin-right: 20px;\n        }\n\n        .chat-container li.chat-right {\n            justify-content: flex-end;\n        }\n\n        .chat-container li.chat-right>.chat-avatar {\n            margin-left: 20px;\n            margin-right: 0;\n        }\n\n        .chat-container li .chat-name {\n            font-size: .75rem;\n            color: #999999;\n            text-align: center;\n        }\n\n        .chat-container li .chat-text {\n            padding: .4rem 1rem;\n            -webkit-border-radius: 4px;\n            -moz-border-radius: 4px;\n            border-radius: 4px;\n            background: #ffffff;\n            font-weight: 300;\n            line-height: 150%;\n            position: relative;\n        }\n\n        .chat-container li .chat-text:before {\n            content: '';\n            position: absolute;\n            width: 0;\n            height: 0;\n            top: 10px;\n            left: -20px;\n            border: 10px solid;\n            border-color: transparent #ffffff transparent transparent;\n        }\n\n        .chat-container li.chat-right>.chat-text {\n            text-align: right;\n        }\n\n        .chat-container li.chat-right>.chat-text:before {\n            right: -20px;\n            border-color: transparent transparent transparent #ffffff;\n            left: inherit;\n        }\n\n        .chat-container li .chat-hour {\n            padding: 0;\n            margin-bottom: 10px;\n            font-size: .75rem;\n            display: flex;\n            flex-direction: row;\n            align-items: center;\n            justify-content: center;\n            margin: 0 0 0 15px;\n        }\n\n        .chat-container li .chat-hour>span {\n            font-size: 16px;\n            color: #9ec94a;\n        }\n\n        .chat-container li.chat-right>.chat-hour {\n            margin: 0 15px 0 0;\n        }\n\n        @media (max-width: 767px) {\n\n            .chat-container li.chat-left,\n            .chat-container li.chat-right {\n                flex-direction: column;\n                margin-bottom: 30px;\n            }\n\n            .chat-container li img {\n                width: 32px;\n                height: 32px;\n            }\n\n            .chat-container li.chat-left .chat-avatar {\n                margin: 0 0 5px 0;\n                display: flex;\n                align-items: center;\n            }\n\n            .chat-container li.chat-left .chat-hour {\n                justify-content: flex-end;\n            }\n\n            .chat-container li.chat-left .chat-name {\n                margin-left: 5px;\n            }\n\n            .chat-container li.chat-right .chat-avatar {\n                order: -1;\n                margin: 0 0 5px 0;\n                align-items: center;\n                display: flex;\n                justify-content: right;\n                flex-direction: row-reverse;\n            }\n\n            .chat-container li.chat-right .chat-hour {\n                justify-content: flex-start;\n                order: 2;\n            }\n\n            .chat-container li.chat-right .chat-name {\n                margin-right: 5px;\n            }\n\n            .chat-container li .chat-text {\n                font-size: .8rem;\n            }\n        }\n\n        .chat-form {\n            padding: 15px;\n            width: 100%;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background-color: #ffffff;\n            border-top: 1px solid white;\n        }\n\n        ul {\n            list-style-type: none;\n            margin: 0;\n            padding: 0;\n        }\n\n        .card {\n            border: 0;\n            background: #f4f5fb;\n            -webkit-border-radius: 2px;\n            -moz-border-radius: 2px;\n            border-radius: 2px;\n            margin-bottom: 2rem;\n            box-shadow: none;\n        }\n\n        .container-fluid,\n        .content-wrapper,\n        .gutters,\n        .no-gutters,\n        .card {\n            height: inherit;\n        }\n\n        .chat-container {\n            position: relative;\n            height: calc(100% - 70px);\n        }\n\n        .chat-message {\n            position: absolute;\n            bottom: 0px;\n            width: calc(100% - 30px);\n        }\n\n        .chatContainerScroll {\n            overflow-y: auto;\n            max-height: calc(100% - 100px);\n            height: calc(80vh - 100px);\n        }\n    ",
        }}
      />
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="container-fluid">
        <div className="content-wrapper">
          <div className="row gutters">
            <div className="gutters col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="card m-0">
                <div className="row no-gutters">
                  <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                    <div className="users-container">
                      <div className="chat-search-box">
                        <div className="input-group">
                          <input className="form-control" placeholder="Search" />
                          <div className="input-group-btn">
                            <button type="button" className="btn btn-info">
                              <i className="fa fa-search" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <ul className="users" id="users"></ul>
                    </div>
                  </div>
                  <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9 col-9">
                    <div className="selected-user">
                      <span>
                        To: <span className="name" id="send-to-user" />
                      </span>
                      <span style={{ display: "none" }} id="user-chat-id" />
                      <span style={{ display: "none" }} id="user-chat-image" />
                    </div>
                    <div className="chat-container">
                      <ul
                        className="chat-box chatContainerScroll"
                        id="chatHistory"
                      ></ul>
                      <div className="form-group mt-3 mb-0 chat-message">
                        <textarea
                          className="form-control"
                          rows={3}
                          id="message"
                          placeholder="Type your message here..."
                          defaultValue={""}
                          onKeyDown={(event) => sendMessage(event)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatIntro;
