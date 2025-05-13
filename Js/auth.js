// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Auth state observer
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is signed in
      console.log("User logged in:", user.email);
      // Redirect to profile page if not already there
      if (!window.location.pathname.includes('profile.html')) {
        window.location.href = 'profile.html';
      }
    } else {
      // User is signed out
      console.log("User signed out");
      // Redirect to login page if not already there
      if (!window.location.pathname.includes('login.html') && 
          !window.location.pathname.includes('signup.html')) {
        window.location.href = 'login.html';
      }
    }
  });
  
  // Sign Up Function
  function signUp(email, password, name) {
    return auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Add additional user info to Firestore
        return db.collection('users').doc(userCredential.user.uid).set({
          name: name,
          email: email,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          role: 'student',
          grade: '',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c3aed&color=fff`
        });
      })
      .catch(error => {
        throw error;
      });
  }
  
  // Login Function
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        throw error;
      });
  }
  
  // Logout Function
  function logout() {
    return auth.signOut();
  }
  
  // Get Current User Data
  function getCurrentUserData() {
    const user = auth.currentUser;
    if (!user) return Promise.reject("No user logged in");
    
    return db.collection('users').doc(user.uid).get()
      .then(doc => {
        if (doc.exists) {
          return {
            uid: user.uid,
            email: user.email,
            ...doc.data()
          };
        } else {
          throw "User document not found";
        }
      });
  }
  
  // Update User Profile
  function updateProfile(data) {
    const user = auth.currentUser;
    if (!user) return Promise.reject("No user logged in");
    
    return db.collection('users').doc(user.uid).update(data);
  }