import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import FullPageLoader from "../ui/FullPageLoader/FullPageLoader";

function PublicRoute({ children }: PropsWithChildren) {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user !== null) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) return <FullPageLoader />;

  return children;
}

export default PublicRoute;
