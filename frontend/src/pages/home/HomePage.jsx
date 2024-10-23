import { useAuthUser } from "../../store/AuthUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

function HomePage() {
  const { user } = useAuthUser();

  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
}

export default HomePage;
