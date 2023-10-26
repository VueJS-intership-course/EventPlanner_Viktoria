import fb from "@/firebase/fbConfig.js";

export const authService = {
  async register(user, password) {
    try {
      const userCredential = await fb.auth.createUserWithEmailAndPassword(
        user.email,
        password
      );

      if (userCredential && userCredential.user) {
        await fb.fireStore
          .collection("users")
          .doc(userCredential.user.uid)
          .set({
            email: user.email,
            username: user.username,
            timezone: user.timezone,
          });
      }
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },

  async getUser(id) {
    try {
        const userDoc = await fb.fireStore.collection('users').doc(id).get();
        if (userDoc) {
            const userData = userDoc.data();
            console.log(userData)
            return userData;
        } else {
            console.log('User document does not exist.');
            return null;
        }

    } catch (error) {
        console.error('Error retrieving user data:', error);
        throw error;
    }
},

  async login(email, password) {
    try {
      const userCredential = await fb.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  },


  async logout() {
    await fb.auth.signOut();
  },


  async getAll() {
    try {
      const data = [];
      const querySnapshot = await fb.fireStore.collection("users").get();

      querySnapshot.forEach((doc) => {
        const { username, email, timezone } = doc.data();

        const id = doc.id;

        const user = { username, email, id, timezone };

        data.push(user);
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching user profiles:", error);
      throw error;
    }
  },
};
