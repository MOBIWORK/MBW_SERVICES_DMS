import { Props } from "./type";

export const Clock = ({ size = 20, fill = "#1877F2" }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.1666 8.50041C14.1666 11.9064 11.4059 14.6671 7.99992 14.6671C4.59392 14.6671 1.83325 11.9064 1.83325 8.50041C1.83325 5.09441 4.59392 2.33374 7.99992 2.33374C11.4059 2.33374 14.1666 5.09441 14.1666 8.50041Z"
      stroke="#637381"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.2876 10.4621L7.77429 8.96278V5.73145"
      stroke="#637381"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
