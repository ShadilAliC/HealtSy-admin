export const DotsSVG = ({ active }) => (
  <svg
    width="9"
    height="9"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="6"
      cy="6"
      r="5"
      fill={active === "Active" || active === true ? "#158844" : "#C1A53F"}
      stroke={active === "Active" || active === true ? "#158844" : "#C1A53F"}
    />
  </svg>
);
