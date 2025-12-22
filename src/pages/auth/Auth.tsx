import { useContext, useState } from "react";
import { AppContext } from "../../features/app_context/AppContext";
import UserDao from "../../entities/user/api/UserDao";
import "./ui/Auth.css";

export default function Auth() {
  const { user } = useContext(AppContext);

  // Если юзер есть - показываем Профиль, иначе - Форму входа
  return (
    <div className="auth-page">
        {user == null ? <LoginForm /> : <UserProfile />}
    </div>
  );
}

function LoginForm() {
    const { setUser, showToast } = useContext(AppContext);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = () => {
        UserDao.authenticate(login, password).then((userData) => {
            if (userData) {
                setUser(userData);
                // Сохраняем в localStorage (требование преподавателя)
                window.localStorage.setItem("user-komercia", JSON.stringify(userData));
                showToast({ message: "Welcome back!" });
            } else {
                alert("Неверный логин или пароль! (Попробуй: user / 123)");
            }
        });
    };

    return (
        <div className="auth-card">
            <h1 className="auth-title">Login</h1>
            <input 
                type="text" 
                className="auth-input" 
                placeholder="Login (user)" 
                value={login}
                onChange={e => setLogin(e.target.value)}
            />
            <input 
                type="password" 
                className="auth-input" 
                placeholder="Password (123)" 
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <button className="auth-btn" onClick={handleLogin}>Sign In</button>
        </div>
    );
}

function UserProfile() {
    const { user, setUser } = useContext(AppContext);

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem("user-komercia");
    };

    return (
        <div className="auth-card profile-card">
            <img src={user?.imageUrl} alt="avatar" className="profile-avatar" />
            <h1 className="auth-title">{user?.name}</h1>
            
            <div className="profile-info">
                <div className="profile-label">Email</div>
                <div className="profile-value">{user?.email}</div>
                
                <div className="profile-label">Address</div>
                <div className="profile-value">{user?.address}</div>
            </div>

            <button className="auth-btn" style={{backgroundColor: '#dc3545'}} onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}