import { Props } from "./type";

export const Bag = ({ size = 20, fill = "#1877F2" }: Props) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.86938 10.8181C1.86938 10.8181 1.96405 11.9768 1.98605 12.3421C2.01538 12.8321 2.20472 13.3794 2.52072 13.7594C2.96672 14.2981 3.49205 14.4881 4.19338 14.4894C5.01805 14.4908 11.0147 14.4908 11.8394 14.4894C12.5407 14.4881 13.0661 14.2981 13.5121 13.7594C13.8281 13.3794 14.0174 12.8321 14.0474 12.3421C14.0687 11.9768 14.1634 10.8181 14.1634 10.8181"
      stroke="#637381"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M5.66394 4.05307V3.80574C5.66394 2.99241 6.32261 2.33374 7.13594 2.33374H8.85727C9.66994 2.33374 10.3293 2.99241 10.3293 3.80574L10.3299 4.05307"
      stroke="#637381"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M7.99666 11.6188V10.7561"
      stroke="#637381"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1.83325 6.09287V8.4042C3.11192 9.24753 4.64392 9.8382 6.32525 10.0722C6.52659 9.3382 7.18859 8.8002 7.99325 8.8002C8.78525 8.8002 9.46059 9.3382 9.64859 10.0789C11.3366 9.84487 12.8746 9.2542 14.1599 8.4042V6.09287C14.1599 4.96353 13.2513 4.0542 12.1219 4.0542H3.87792C2.74859 4.0542 1.83325 4.96353 1.83325 6.09287Z"
      stroke="#637381"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);