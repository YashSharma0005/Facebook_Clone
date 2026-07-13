// Reusable field validators shared across Login, LoginFull, and Register pages.

export function validateRequired(value, label = "This field") {
  return value.trim() ? "" : `${label} is required.`;
}

export function validateEmailOrPhone(value) {
  if (!value.trim()) return "This field is required.";
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isPhone = /^[0-9]{7,15}$/.test(value); // digits only, 7-15 long
  if (!isEmail && !isPhone) {
    return "Enter a valid email address, or a phone number using digits only.";
  }
  return "";
}

// Used on the Register page, where a NEW password is being created.
export function validateNewPassword(value) {
  if (!value) return "This field is required.";
  if (value.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(value)) return "Password must include at least one uppercase letter.";
  if (!/[a-z]/.test(value)) return "Password must include at least one lowercase letter.";
  if (!/[0-9]/.test(value)) return "Password must include at least one number.";
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=]/.test(value)) {
    return "Password must include at least one special character.";
  }
  return "";
}

// Used on Login pages, where an EXISTING password is being entered — we only
// need to know it isn't empty, not enforce the strength rules again.
export function validateLoginPassword(value) {
  if (!value) return "This field is required.";
  return "";
}