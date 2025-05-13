// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DeepSeek API configuration
const DEEPSEEK_API_KEY = "sk-1405fadec82a4d9ea9c4678cd69efb30"; // Replace with your actual API key
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"; // Update if different

// DOM Elements
const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('file-input');

// Chat history
let chatHistory = [
    {
        role: "system",
        content: "You are a helpful AI study assistant for students from 6th grade to college level. Provide clear, educational responses."
    }
];

// Initialize the chat
function initChat() {
    if (chatHistory.length <= 1) { // Only system message exists
        addBotMessage("Hello! I'm your AI-powered study assistant. I can help with math, science, coding, and more. What would you like to learn today?");
    }
}

// Add bot message to chat
function addBotMessage(text) {
    const messageId = Date.now().toString();
    const messageHtml = `
        <div class="flex items-start space-x-3 message-animation" id="msg-${messageId}">
            <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                <i class="fas fa-robot text-white"></i>
            </div>
            <div class="bg-white p-4 rounded-xl shadow-sm max-w-3xl border border-gray-100">
                <p class="font-bold text-primary-600 mb-2">StudyBot</p>
                <p class="text-gray-700">${text}</p>
            </div>
        </div>
    `;
    
    chatContainer.insertAdjacentHTML('beforeend', messageHtml);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    chatHistory.push({
        role: 'assistant',
        content: text
    });
    
    return messageId;
}

// Add user message to chat
function addUserMessage(text) {
    const messageId = Date.now().toString();
    const messageHtml = `
        <div class="flex items-start space-x-3 message-animation justify-end" id="msg-${messageId}">
            <div class="bg-indigo-50 p-4 rounded-xl shadow-sm max-w-3xl border border-gray-100">
                <p class="font-bold text-indigo-600 mb-2">You</p>
                <p class="text-gray-700">${text}</p>
            </div>
            <div class="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <i class="fas fa-user text-gray-600"></i>
            </div>
        </div>
    `;
    
    chatContainer.insertAdjacentHTML('beforeend', messageHtml);
    chatContainer.scrollTop = chatContainer.scrollHeight;
    
    chatHistory.push({
        role: 'user',
        content: text
    });
    
    return messageId;
}

// Get response from DeepSeek API
async function getDeepSeekResponse(prompt) {
    try {
        const response = await fetch(DEEPSEEK_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat", // or the specific model you're using
                messages: [
                    ...chatHistory,
                    { role: "user", content: prompt }
                ],
                temperature: 0.7,
                max_tokens: 2000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            console.error('API Error:', data);
            return "I'm having trouble with the AI service. Please try again later.";
        }

        if (data.choices && data.choices[0] && data.choices[0].message) {
            return data.choices[0].message.content;
        } else {
            console.error('Unexpected response format:', data);
            return "I'm having trouble understanding that. Could you ask differently?";
        }
    } catch (error) {
        console.error('Error calling DeepSeek API:', error);
        return "I'm having connection issues. Please try again in a moment.";
    }
}

// Handle user message
async function handleUserMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addUserMessage(message);
    userInput.value = '';
    userInput.style.height = 'auto';
    
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    try {
        const botResponse = await getDeepSeekResponse(message);
        addBotMessage(botResponse);
        await saveConversation(message, botResponse);
    } catch (error) {
        console.error('Error handling message:', error);
        addBotMessage("Sorry, something went wrong. Please try your question again.");
    } finally {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
    }
}

// Save conversation to Firebase
async function saveConversation(userMessage, botResponse) {
    try {
        await db.collection('conversations').add({
            userMessage,
            botResponse,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error saving conversation:', error);
    }
}

// Handle file upload
function handleFileUpload() {
    fileInput.click();
}

fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    addUserMessage(`[Attached file: ${file.name}]`);
    addBotMessage("I've received your file. For now, I can only process text questions, but file analysis is coming soon!");
    fileInput.value = '';
});

// Event Listeners
sendBtn.addEventListener('click', handleUserMessage);

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserMessage();
    }
});

uploadBtn.addEventListener('click', handleFileUpload);

// Initialize the chat
document.addEventListener('DOMContentLoaded', initChat);