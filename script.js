import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAMp5-wqinWTl4z0ms6bmnXgm9EvqPcbug",
  authDomain: "mytwoplayergame.firebaseapp.com",
  databaseURL: "https://mytwoplayergame-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mytwoplayergame",
  storageBucket: "mytwoplayergame.firebasestorage.app",
  messagingSenderId: "1003705475156",
  appId: "1:1003705475156:web:0d56aeef31623413238dc1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const createBtn = document.getElementById("createBtn");
const status = document.getElementById("status");

// פונקציה ליצירת קוד רנדומלי
function generateCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

// פתח משחק
createBtn.onclick = async () => {
  const code = generateCode();
  status.innerText = "יוצר משחק...";

  try {
    await set(ref(db, "sync_test/" + code), {
      createdAt: Date.now()
    });
    status.innerText = "משחק נוצר! קוד: " + code;
  } catch (e) {
    console.error(e);
    status.innerText = "שגיאה ביצירת המשחק";
  }
};

// 🔹 מאזין בזמן אמת לכל הקודים שנוצרים
onValue(ref(db, "sync_test/"), (snapshot) => {
  const data = snapshot.val();
  console.log("כל המשחקים הנוכחיים:", data);
});
