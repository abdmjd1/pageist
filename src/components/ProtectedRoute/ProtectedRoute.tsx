import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import FullPageLoader from "../ui/FullPageLoader/FullPageLoader";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    // 'loading' Waits until `onAuthStateChanged` finishes before checking `user`.
    // Without checking `loading`, `user` would always be `null` initially,
    // which can incorrectly redirect signed-in users to `/signup` on page reload.
    if (!loading && user === null) {
      // replace: true here replaces the tab's history with this page and prevents the user from pressing back button in the browser to go back to the protected page they were previously on before they logged out.
      navigate("/signup", { replace: true });
    }
  }, [user, loading, navigate]);

  // Show a fullscreen loader while Firebase is determining the auth state.
  if (loading) return <FullPageLoader />;

  return children;
}

export default ProtectedRoute;
