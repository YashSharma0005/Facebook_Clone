// Simple, original recreations of the general "f in a circle" and "infinity"
// mark shapes for a Facebook-style UI clone. These are NOT the official
// Meta/Facebook logo files — swap them for the real assets yourself if needed
// (see README "Adding your own images/logos" section).

export function FacebookCircleIcon({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="28" fill="#1877F2" />
      <path
        d="M37 28.5h-6.2V47h-7.6V28.5H19V21.8h4.2v-4.6c0-6 2.9-9.6 9.9-9.6h6.1v6.8h-3.8c-2.8 0-3 1-3 3v4.4H37l-.9 6.7z"
        fill="#fff"
      />
    </svg>
  );
}

export function MetaLogo({ size = 20 }) {
  return (
    <span className="meta-logo" style={{ fontSize: size }}>
      <svg
        width={size * 1.3}
        height={size}
        viewBox="0 0 42 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ verticalAlign: "middle", marginRight: 6 }}
      >
        <path
          d="M6 20c-3 0-5-3-5-8s2-8 5-8c2 0 3.5 1.5 5 4 1.5-2.5 3-4 5-4 3 0 5 3 5 8s-2 8-5 8c-2 0-3.5-1.5-5-4-1.5 2.5-3 4-5 4z"
          fill="none"
          stroke="#0064E0"
          strokeWidth="3"
        />
      </svg>
      Meta
    </span>
  );
}
