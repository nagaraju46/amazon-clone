import React, { useState } from "react";
import "./Login.css";

import { Link, useHistory } from "react-router-dom";

import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();

    if (email.trim() !== "" && password.trim() !== "") {
      setDisable(true);

      //firebase login stuff
      // eslint-disable-next-line
      auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
          history.push("/");
        })
        .catch((err) => {
          alert(err.message);
          setDisable(false);
        });
    }
  };

  const register = (e) => {
    e.preventDefault();

    if (email.trim() !== "" && password.trim() !== "") {
      setDisable(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
          // console.log(auth);
          setEmail("");
          setPassword("");

          if (auth) {
            history.push("/");
          }
        })
        .catch((err) => {
          alert(err.message);
          setDisable(false);
        });
      //firebase register stuff
    }
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          alt="login_logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG24.png"
          className="login__logo"
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />

          <h5>Password</h5>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <button
            type="submit"
            onClick={signIn}
            className="login__signInButton"
            disabled={disable}
          >
            Sign In
          </button>
        </form>
        <button
          onClick={register}
          disabled={disable}
          className="login__registerButton"
        >
          Create your Amazon account
        </button>
      </div>
    </div>
  );
}
