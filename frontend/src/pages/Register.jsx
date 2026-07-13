import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import metaLogo from "../assets/meta-logo.png";
import { validateEmailOrPhone, validateNewPassword, validateRequired } from "../utils/validation.js";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    day: "",
    month: "",
    year: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};

    const firstNameErr = validateRequired(form.firstName, "Name");
    if (firstNameErr) errs.firstName = firstNameErr;

    const lastNameErr = validateRequired(form.lastName, "Surname");
    if (lastNameErr) errs.lastName = lastNameErr;

    const emailErr = validateEmailOrPhone(form.email);
    if (emailErr) errs.email = emailErr;

    const passwordErr = validateNewPassword(form.password);
    if (passwordErr) errs.password = passwordErr;

    if (!form.day || !form.month || !form.year) {
      errs.birthday = "Please confirm your own age.";
    } else {
      const day = Number(form.day);
      const month = Number(form.month);
      const year = Number(form.year);
      const maxDay = new Date(year, month, 0).getDate();
      if (day < 1 || day > maxDay) {
        errs.birthday = "Please enter a valid date.";
      } else {
        const dob = new Date(year, month - 1, day);
        const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        if (age < 13) {
          errs.birthday = "You must be at least 13 years old to register.";
        }
      }
    }

    if (!form.gender) errs.gender = "Please choose a gender.";

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setError("Please fix the errors below.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const allErrors = validate();
    setErrors((prev) => ({ ...prev, [name]: allErrors[name] || "" }));
  };

  return (
    <div className="reg-page">
      <div className="reg-container">
        <Link to="/" className="reg-back-arrow">&lt;</Link>

        <div className="reg-meta-logo">
          <img src={metaLogo} alt="Meta" className="reg-meta-logo-img" />
          <span className="reg-meta-logo-text">Meta</span>
        </div>

        <h1 className="reg-title">Get started on Facebook</h1>
        <p className="reg-subtitle">
          Create an account to connect with friends, family, and communities of people who share your interests.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {error && <div className="fb-error">{error}</div>}

          <div className="reg-label">Name</div>
          <div className="reg-name-row">
            <div className="reg-input-group reg-half">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder=" "
                className={`reg-input ${touched.firstName && errors.firstName ? "reg-input-error" : ""}`}
                value={form.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label htmlFor="firstName" className="reg-input-label">Name</label>
            </div>
            <div className="reg-input-group reg-half">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder=" "
                className={`reg-input ${touched.lastName && errors.lastName ? "reg-input-error" : ""}`}
                value={form.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <label htmlFor="lastName" className="reg-input-label">surname</label>
            </div>
          </div>
          {(errors.firstName || errors.lastName) && (
            <p className="reg-field-error">{errors.firstName || errors.lastName}</p>
          )}

          <div className="reg-label">
            birthday <span className="reg-info-icon">?</span>
          </div>
          <div className="reg-dob-row">
            <select name="day" className="reg-select" value={form.day} onChange={handleChange} required>
              <option value="">Day</option>
              {days.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select name="month" className="reg-select" value={form.month} onChange={handleChange} required>
              <option value="">month</option>
              {months.map((m, i) => (
                <option key={m} value={i + 1}>{m}</option>
              ))}
            </select>
            <select name="year" className="reg-select" value={form.year} onChange={handleChange} required>
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          {errors.birthday && <p className="reg-field-error">{errors.birthday}</p>}

          <div className="reg-label">
            gender <span className="reg-info-icon">?</span>
          </div>
          <select
            name="gender"
            className="reg-select reg-select-full"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">select your gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="custom">Custom</option>
          </select>
          {errors.gender && <p className="reg-field-error">{errors.gender}</p>}
            
          <div className="reg-label">Mobile number or email address</div>
          <div className="reg-input-group">
            <input
              type="text"
              id="email"
              name="email"
              placeholder=" "
              className={`reg-input ${errors.email ? "reg-input-error" : ""}`}
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label htmlFor="email" className="reg-input-label">Mobile number or email</label>
          </div>
          {errors.email && <p className="reg-field-error">{errors.email}</p>}
          <p className="reg-hint">
            You may receive notifications from us.{" "}
            <a href="#!">Learn why we ask for your contact information</a>.
          </p>
            
          <div className="reg-label">Password</div>
          <div className="reg-input-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" "
              className={`reg-input ${errors.password ? "reg-input-error" : ""}`}
              value={form.password}
              onChange={handleChange}
              minLength={6}
              onBlur={handleBlur}
            />
            <label htmlFor="password" className="reg-input-label">Password</label>
          </div>
          {errors.password && <p className="reg-field-error">{errors.password}</p>}

          <p className="reg-legal">
            People who use our service may have uploaded your contact information to Facebook.{" "}
            <a href="#!">Learn more</a>.
          </p>
          <p className="reg-legal">
            Tapping &apos;Submit&apos; means you agree to create an account. You also agree to Facebook&apos;s{" "}
            <a href="#!">Terms</a>, <a href="#!">Privacy Policy</a>, and <a href="#!">Cookie Policy</a>.
          </p>
          <p className="reg-legal">
            This Privacy Policy explains how we will use the information we collect from you when you create an
            account. For example, we will use your information to provide you with our products and services,
            personalize our products, and improve our products, including advertising.
          </p>

          <button type="submit" className="reg-submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>

          <Link to="/" className="reg-have-account-btn">
            I already have an account
          </Link>
        </form>
      </div>

      <RegFooter />
    </div>
  );
}

function RegFooter() {
  return (
    <footer className="reg-footer">
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
      <div className="reg-footer-copyright">Meta &copy; {new Date().getFullYear()}</div>
    </footer>
  );
}

export default Register;