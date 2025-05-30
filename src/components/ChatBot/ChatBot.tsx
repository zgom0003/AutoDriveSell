import { useState } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import { Paper, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ChatBot() {
    const [open, setOpen] = useState(true);

    if (!open) return (
        <IconButton
            sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                zIndex: 1000,
                background: "#1976d2",
                color: "white",
                "&:hover": { background: "#1565c0" }
            }}
            onClick={() => setOpen(true)}
        >
            💬
        </IconButton>
    );

    return (
        <Paper sx={{ p: 0, maxWidth: 400, position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}>
            <IconButton
                size="small"
                onClick={() => setOpen(false)}
                sx={{ position: "absolute", top: 4, right: 4, zIndex: 1100 }}
            >
                <CloseIcon />
            </IconButton>
            <Chatbot
                config={config}
                messageParser={MessageParser}
                actionProvider={ActionProvider}
            />
        </Paper>
    );
}