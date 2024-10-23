import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/SearchPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/footer";
import { Toaster } from "react-hot-toast";
import WatchPage from "./pages/watchPage";
import { useAuthUser } from "./store/AuthUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFound from "./pages/404";
function App() {
  const { user, ischeckingauth, checkauth } = useAuthUser();

  useEffect(() => {
    checkauth();
  }, [checkauth]);

  if (ischeckingauth) {
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <HomePage />} // Render HomePage if user is logged in
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <HomePage />} // Render HomePage if user is logged in
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <LoginPage />} // Render LoginPage if user is not logged in
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <LoginPage />} // Render LoginPage if user is not logged in
        />
        <Route
          path="/history"
          element={user ? <SearchHistoryPage /> : <LoginPage />} // Render LoginPage if user is not logged in
        />
        <Route
          path="/*"
          element={<NotFound />} // Render LoginPage if user is not logged in
        />
      </Routes>

      <Footer />
      <Toaster />
    </>
  );
}

export default App;
