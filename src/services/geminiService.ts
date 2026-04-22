export const chatWithRae = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message, history }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to chat with Rae');
        }

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error("Error chatting with Rae:", error);
        return "I apologize, but my creative frequency is experiencing some static at the moment. Please try again or reach out directly via email.";
    }
};
