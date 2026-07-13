import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { FacebookCircleIcon, MetaLogo } from "../components/Icons.jsx";
import hero1 from "../assets/hero-1.webp";
import hero2 from "../assets/hero-2.webp";
import hero3 from "../assets/hero-3.webp";
import { validateEmailOrPhone, validateLoginPassword } from "../utils/validation.js";

function LoginFull() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const heroImages = [hero1, hero2, hero3];
  const navigate = useNavigate();                                       

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [heroImg] = useState(
    () => heroImages[Math.floor(Math.random() * heroImages.length)]
  );

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    if (field === "email") {
      setErrors((e) => ({ ...e, email: validateEmailOrPhone(email) }));
    }
    if (field === "password") {
      setErrors((e) => ({ ...e, password: validateLoginPassword(password) }));
    }
  };

  return (
    <div className="full-login-page">
      <div className="full-login-top">
        <div className="full-login-left">
          <div className="fb-left-logo">
              <FacebookCircleIcon size={60} />
          </div>

          {/*
            IMAGE PLACEHOLDERS
            Replace these <div className="collage-img ..."> blocks with real
            <img src="/src/assets/your-photo.jpg" /> tags to match the
            original screenshot exactly. See README "Adding your own images".
          */}
          <div className="collage-wrap">
            <img src={heroImg} alt="" className="collage-full-img" />
          </div>
          
          <div className="tagline-wrapper">
            <h2 className="full-login-tagline">
              Find things
              <br />
              <span className="tagline-blue">you love</span>
              <span className="tagline-dot">.</span>
            </h2>
          </div>

        </div>
        <div className="full-login-right">
          <h1 className="full-login-heading">Log in to Facebook</h1>
          <form onSubmit={handleSubmit}>
            {error && <div className="fb-error">{error}</div>}
            <input
              type="text"
              placeholder="Email or mobile number"
              className={`full-login-input ${touched.email && errors.email ? "reg-input-error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur("email")}
              required
            />
            {touched.email && errors.email && <p className="reg-field-error">{errors.email}</p>}

            <input
              type="password"
              placeholder="Password"
              className={`full-login-input ${touched.password && errors.password ? "reg-input-error" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur("password")}
              required
            />
            {touched.password && errors.password && <p className="reg-field-error">{errors.password}</p>}

            <button type="submit" className="full-login-btn" disabled={loading}>
              {loading ? "logging in..." : "log in"}
            </button>
            <button type="button" className="full-forgot-btn">
              Forgot password?
            </button>
            <Link to="/register" className="full-create-btn">
              Create a new account
            </Link>
            <div className="full-meta-logo">
              <MetaLogo size={16} />
            </div>
          </form>
        </div>
      </div>

      <FullLoginFooter />
    </div>
  );
}

function FullLoginFooter() {
  return (
    <footer className="reg-footer full-login-footer">
      <div className="reg-footer-row reg-footer-languages">
        <a href="#!">Hindi</a>
        <a href="#!">اردو</a>
        <a href="#!">Punjabi</a>
        <a href="#!">বাংলা</a>
        <a href="#!">Gujarati</a>
        <a href="#!">Marathi</a>
        <a href="#!">தமிழ்</a>
        <a href="#!">And languages...</a>
      </div>
      <div className="reg-footer-row">
        <a href="#!">Sign up</a>
        <a href="#!">log in</a>
        <a href="#!">Messenger</a>
        <a href="#!">Facebook Lite</a>
        <a href="#!">Video</a>
        <a href="#!">Meta Pay</a>
        <a href="#!">Meta Store</a>
        <a href="#!">MetaQuest</a>
        <a href="#!">Ray-Ban Meta</a>
        <a href="#!">Meta AI</a>
        <a href="#!">Instagram</a>
        <a href="#!">Threads</a>
        <a href="#!">Privacy Policy</a>
      </div>
      <div className="reg-footer-row">
        <a href="#!">Privacy Center</a>
        <a href="#!">Introduction</a>
        <a href="#!">Create ads</a>
        <a href="#!">Create Page</a>
        <a href="#!">Developer</a>
        <a href="#!">career</a>           
        <a href="#!">Cookies</a>
        <a href="#!">Advertising Options</a>
        <a href="#!">terms</a>
        <a href="#!">Help Center</a>
      </div>
      <div className="reg-footer-row">
        <a href="#!">Contact uploading and non-users</a>
      </div>
      {/* <div className="reg-footer-copyright">Meta &copy; {new Date().getFullYear()}</div> */}
    </footer>
  );
}

export default LoginFull;
