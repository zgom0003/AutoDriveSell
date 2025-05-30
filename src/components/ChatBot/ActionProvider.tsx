class ActionProvider {
    constructor(createChatBotMessage: any, setStateFunc: any) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    async handleUserMessage(message) {
        // Show user message as loading
        const loadingMsg = this.createChatBotMessage("...");
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, loadingMsg],
        }));

        try {
            // Call your backend
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/chatbot`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await res.json();

            // Remove loading and add bot reply
            this.setState((prev) => ({
                ...prev,
                messages: [
                    ...prev.messages.slice(0, -1),
                    this.createChatBotMessage(data.reply || data.response || "Sorry, I couldn't get a response."),
                ],
            }));
        } catch (error) {
            // Remove loading and show error message
            this.setState((prev) => ({
                ...prev,
                messages: [
                    ...prev.messages.slice(0, -1),
                    this.createChatBotMessage("Sorry, the support service is currently unavailable. Please try again later."),
                ],
            }));
        }
    }
}

export default ActionProvider;