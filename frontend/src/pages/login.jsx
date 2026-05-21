import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    console.log({
      email,
      password,
    });

    alert("Login Successful ✅");

    navigate("/home");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
        }}
      >
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>
          Don't have account?
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "blue",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;