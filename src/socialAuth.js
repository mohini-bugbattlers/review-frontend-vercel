// utils/handleSocialLogin.js
import { signInWithPopup } from "firebase/auth";

export const handleSocialLogin = async (provider, auth, navigate) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // 👇 Check if this is a new user
    const isNewUser = result._tokenResponse?.isNewUser;

    if (isNewUser) {
      // ❌ Block login if user not previously registered
      alert("Account does not exist. Please sign up first.");
      await auth.signOut();
      return;
    }

    // ✅ Existing user — continue login
    const token = await user.getIdToken();
    sessionStorage.setItem("token", token);
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );

    alert("Login successful!");
    navigate("/home");
  } catch (error) {
    alert("Social login failed: " + error.message);
    console.error(error);
  }
};
