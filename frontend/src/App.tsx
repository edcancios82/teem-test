import { useUser } from "./context/UserContext";
import { LoginPage, OnboardingPage } from './pages';

export const App = () => {
    const { user, } = useUser();
    return (
        <div>
            {user ? <OnboardingPage /> : <LoginPage />}
        </div>
    )
}
