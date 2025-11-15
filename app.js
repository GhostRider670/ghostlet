import { db, auth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, serverTimestamp } from './firebase.js';
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Sidebar links
function setupSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    sidebar.innerHTML = `
        <a href="chat.html">Chat</a>
        <a href="market.html">Market</a>
        <a href="blooks.html">Blooks</a>
        <a href="stats.html">Stats</a>
        <a href="settings.html">Settings</a>
        <a href="admin.html">Admin</a>
        <button id="logout-btn">Logout</button>
    `;
    document.getElementById('logout-btn').addEventListener('click', () => {
        signOut(auth).then(() => window.location.href = 'login.html');
    });
}

// Auth State
onAuthStateChanged(auth, user => {
    if (!user && window.location.pathname !== '/login.html' && window.location.pathname !== '/register.html') {
        window.location.href = 'login.html';
    }
});

// Login
export function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location.href = 'chat.html')
        .catch(err => alert(err.message));
}

// Register
export function register(email, password, username) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async cred => {
            await addDoc(collection(db, 'users'), {
                uid: cred.user.uid,
                username,
                tokens: 0,
                blooks: [],
                packsOpened: 0,
                messagesSent: 0,
                createdAt: serverTimestamp()
            });
            window.location.href = 'chat.html';
        })
        .catch(err => alert(err.message));
}

// Chat
export async function loadChat() {
    const messagesCol = collection(db, 'messages');
    const q = query(messagesCol, orderBy('createdAt', 'asc'));
    const snapshot = await getDocs(q);
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = '';
    snapshot.forEach(doc => {
        const data = doc.data();
        const msg = document.createElement('div');
        msg.textContent = `${data.username}: ${data.message}`;
        chatContainer.appendChild(msg);
    });
}

export async function sendMessage(username, message) {
    if (!message) return;
    await addDoc(collection(db, 'messages'), {
        username,
        message,
        createdAt: serverTimestamp()
    });
}
