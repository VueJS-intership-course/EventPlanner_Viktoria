import fb from "@/firebase/fbConfig.js";
import router from "@/router";

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
            isAdmin: user.isAdmin,
          });
      }
    } catch (error) {
      console.error("Error signing up:", error);
      router.push({ name: "errorPage" });
      throw error;
    }
  },

  async getUser(email) {
    try {
      const userDoc = await fb.fireStore
        .collection("users")
        .where("email", "==", email)
        .get();
      if (userDoc) {
        const [doc] = userDoc.docs;
        return doc.data();
      }
      console.log("User document does not exist.");
      return null;
    } catch (error) {
      console.error("Error retrieving user data:", error);
      router.push({ name: "errorPage" });
      throw error;
    }
  },

  async login(email, password) {
    try {
      await fb.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  },

  async logout() {
    await fb.auth.signOut();
  },

  async editUser({username, timezone}) {
    const querySnapshot = await fb.fireStore
      .collection("users")
      .where("email", "==", user.email)
      .get();

    const doc = querySnapshot.docs[0];
    try {
      await doc.ref.update({
        username: username,
        timezone: timezone,
      });
    } catch (error) {
      console.error("Error editing event: ", error);
      router.push({ name: "errorPage" });
    }
  },
};
