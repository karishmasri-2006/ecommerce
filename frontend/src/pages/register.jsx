import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    console.log({
      name,
      email,
      password,
    });

    alert("Registration Successful ✅");

    navigate("/");
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
        onSubmit={handleRegister}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
        }}
      >
        <h1>Register</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Register</button>

        <p>
          Already have account?
          <span
            onClick={() => navigate("/")}
            style={{
              color: "blue",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;