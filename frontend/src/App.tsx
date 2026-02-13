import { useUser } from "./context/UserContext";
import { LoginPage, OnboardingPage } from './pages';

export const App = () => {
    const { user, } = useUser();
    return user ? <OnboardingPage /> : <LoginPage />;
}
