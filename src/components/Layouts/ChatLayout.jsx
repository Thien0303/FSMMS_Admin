import React from "react";
import "./ChatLayout.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const ChatLayout = ({ children }) => {
    return (
        <div>
            <Topbar />
            <div className="body">
                <Sidebar />
                <div className="chat-component">{children}</div>
            </div>
        </div>
    );
};

export default ChatLayout;
