async function sendMessage() {

    const input =
        document.getElementById("message");

    const message = input.value;

    const chatBox =
        document.getElementById("chat-box");

    if (!message) return;

    chatBox.innerHTML +=
        `<div class="user">
        You: ${message}
    </div>`;

    input.value = "";

    const response =
        await fetch(
            fetch("https://chat-bot-oqb8.onrender.com/chat"),
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    message
                })

            }
        );

    const data =
        await response.json();

    chatBox.innerHTML +=
        `<div class="bot">
        AI: ${data.reply}
    </div>`;

}