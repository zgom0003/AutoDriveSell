import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    botName: "DriveBot",
    initialMessages: [createChatBotMessage("Hi! How can I help you today?", { loading: true })],
    customStyles: {
        botMessageBox: { backgroundColor: "#1976d2" },
        chatButton: { backgroundColor: "#1976d2" },
    },
};

export default config;