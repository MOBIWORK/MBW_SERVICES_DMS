/** @format */

import React, { useState } from "react";

function MapLegend() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLegend = () => {
    setIsOpen(!isOpen);
  };

  const options = {
    iconStart:
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="44px" height="44px" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fillRule:evenodd; clipRule:evenodd"><g><path style="opacity:1" fill="%232ac560" d="M 23.5,7.5 C 23.6107,8.11742 23.944,8.61742 24.5,9C 28.2255,9.75991 31.8922,9.59324 35.5,8.5C 37.0616,15.4204 36.7283,22.0871 34.5,28.5C 30.1311,28.5328 25.7978,28.1995 21.5,27.5C 21.4226,26.2502 20.756,25.4169 19.5,25C 16.633,24.1993 13.9664,24.3659 11.5,25.5C 10.5,25.5 9.5,25.5 8.5,25.5C 7.67618,29.3123 7.17618,33.3123 7,37.5C 6.50016,26.8385 6.3335,16.1719 6.5,5.5C 12.4855,2.62241 18.1522,3.28908 23.5,7.5 Z"/></g><g><path style="opacity:0.73" fill="%238fd8a8" d="M 34.5,28.5 C 36.7283,22.0871 37.0616,15.4204 35.5,8.5C 31.8922,9.59324 28.2255,9.75991 24.5,9C 23.944,8.61742 23.6107,8.11742 23.5,7.5C 28.4839,8.45762 33.3172,8.45762 38,7.5C 37.5937,14.5348 37.427,21.5348 37.5,28.5C 36.5,28.5 35.5,28.5 34.5,28.5 Z"/></g><g><path style="opacity:0.627" fill="%2381d09f" d="M 6.5,5.5 C 6.3335,16.1719 6.50016,26.8385 7,37.5C 7.17618,33.3123 7.67618,29.3123 8.5,25.5C 8.5,30.1667 8.5,34.8333 8.5,39.5C 7.17793,39.67 6.01127,39.3366 5,38.5C 4.83333,36.6667 4.66667,34.8333 4.5,33C 5.71694,24.656 5.71694,16.3226 4.5,8C 4.68423,6.62439 5.35089,5.79106 6.5,5.5 Z"/></g><g><path style="opacity:1" fill="%239be0b2" d="M 11.5,25.5 C 13.9664,24.3659 16.633,24.1993 19.5,25C 20.756,25.4169 21.4226,26.2502 21.5,27.5C 18.3652,25.9767 15.0318,25.31 11.5,25.5 Z"/></g><g><path style="opacity:0.975" fill="%235dc982" d="M 21.5,27.5 C 25.7978,28.1995 30.1311,28.5328 34.5,28.5C 33.036,29.1599 31.3693,29.4932 29.5,29.5C 26.5143,29.6183 23.8476,28.9517 21.5,27.5 Z"/></g></svg>',
    iconEnd:
      '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="44" height="44"><path d="M0 0 C1.06 -0.01 2.12 -0.03 3.21 -0.04 C6.18 0.19 7.6 0.85 10.19 2.19 C12.45 2.24 12.45 2.24 14.75 2 C17.14 1.96 17.14 1.96 19.19 2.19 C20.94 4.06 20.94 4.06 22.19 7.19 C22.62 7.97 23.05 8.76 23.5 9.57 C27.28 16.45 27.28 16.45 26.83 20 C26.62 20.72 26.41 21.44 26.19 22.19 C24.6 22.24 23.02 22.28 21.44 22.31 C20.56 22.34 19.67 22.36 18.77 22.38 C16.04 22.18 14.57 21.45 12.19 20.19 C8.47 19.99 5.73 20.01 2.19 21.19 C3.53 25.46 4.87 29.55 6.88 33.56 C8.19 36.19 8.19 36.19 8.19 39.19 C7.2 39.19 6.21 39.19 5.19 39.19 C3.24 35.23 1.3 31.26 -0.63 27.29 C-1.29 25.95 -1.94 24.6 -2.6 23.26 C-6.15 16.03 -9.53 8.93 -11.81 1.19 C-10.61 1.22 -10.61 1.22 -9.38 1.25 C-6.07 1.17 -3.67 0.02 0 0 Z M4.19 3.19 C4.52 4.18 4.85 5.17 5.19 6.19 C6.18 5.86 7.17 5.53 8.19 5.19 C6.87 4.53 5.55 3.87 4.19 3.19 Z M-4.81 3.19 C-5.8 3.68 -5.8 3.68 -6.81 4.19 C-6.48 5.51 -6.15 6.83 -5.81 8.19 C-4.49 7.53 -3.17 6.87 -1.81 6.19 C-2.8 5.2 -3.79 4.21 -4.81 3.19 Z M16.19 5.19 C15.86 5.85 15.53 6.51 15.19 7.19 C15.52 7.85 15.85 8.51 16.19 9.19 C17.18 9.19 18.17 9.19 19.19 9.19 C18.86 7.87 18.53 6.55 18.19 5.19 C17.53 5.19 16.87 5.19 16.19 5.19 Z M0.19 7.19 C0.52 8.51 0.85 9.83 1.19 11.19 C2.84 11.19 4.49 11.19 6.19 11.19 C5.53 9.87 4.87 8.55 4.19 7.19 C2.87 7.19 1.55 7.19 0.19 7.19 Z M12.19 10.19 C12.52 11.18 12.85 12.17 13.19 13.19 C15.2 13.92 15.2 13.92 17.19 14.19 C16.86 12.87 16.53 11.55 16.19 10.19 C14.87 10.19 13.55 10.19 12.19 10.19 Z M9.19 13.19 C9.52 14.18 9.85 15.17 10.19 16.19 C12.2 16.92 12.2 16.92 14.19 17.19 C13.53 15.87 12.87 14.55 12.19 13.19 C11.2 13.19 10.21 13.19 9.19 13.19 Z M0.19 13.19 C-0.8 13.68 -0.8 13.68 -1.81 14.19 C-1.48 15.84 -1.15 17.49 -0.81 19.19 C0.51 18.2 1.83 17.21 3.19 16.19 C2.2 15.2 1.21 14.21 0.19 13.19 Z M20.19 15.19 C20.52 16.84 20.85 18.49 21.19 20.19 C22.18 19.53 23.17 18.87 24.19 18.19 C23.53 17.2 22.87 16.21 22.19 15.19 C21.53 15.19 20.87 15.19 20.19 15.19 Z " fill="%23f85631" transform="translate(14.8125,2.8125)"/><path d="M0 0 C0.99 0.33 1.98 0.66 3 1 C3.33 2.98 3.66 4.96 4 7 C2.35 7 0.7 7 -1 7 C-0.67 8.65 -0.34 10.3 0 12 C-1.32 12 -2.64 12 -4 12 C-4.66 10.35 -5.32 8.7 -6 7 C-5.01 6.67 -4.02 6.34 -3 6 C-2.88 5.2 -2.75 4.39 -2.62 3.56 C-2.42 2.72 -2.21 1.87 -2 1 C-1.34 0.67 -0.68 0.34 0 0 Z " fill="%23f85631" transform="translate(35,11)"/><path d="M0 0 C1.53 0.09 3.05 0.25 4.56 0.44 C5.8 0.59 5.8 0.59 7.07 0.75 C7.7 0.83 8.34 0.91 9 1 C8.01 1.5 8.01 1.5 7 2 C7.33 3.32 7.66 4.64 8 6 C5.69 6 3.38 6 1 6 C1 4.68 1 3.36 1 2 C0.34 1.67 -0.32 1.34 -1 1 C-0.67 0.67 -0.34 0.34 0 0 Z " fill="%23f85631" transform="translate(11,3)"/><path d="M0 0 C1.65 0 3.3 0 5 0 C5.33 1.65 5.66 3.3 6 5 C5.01 5.66 4.02 6.32 3 7 C2.01 6.67 1.02 6.34 0 6 C0 4.02 0 2.04 0 0 Z " fill="%23f85631" transform="translate(17,15)"/><path d="M0 0 C2.64 0.33 5.28 0.66 8 1 C7.01 1.5 7.01 1.5 6 2 C6.33 3.32 6.66 4.64 7 6 C2.32 4.52 2.32 4.52 0.69 1.88 C0.46 1.26 0.23 0.64 0 0 Z " fill="%23f85631" transform="translate(23,6)"/><path d="M0 0 C5.75 0.75 5.75 0.75 8 3 C7.34 4.32 6.68 5.64 6 7 C5.55 6.5 5.09 6.01 4.62 5.5 C3.12 3.77 3.12 3.77 1 4 C0.67 2.68 0.34 1.36 0 0 Z " fill="%23f85631" transform="translate(17,3)"/><path d="M0 0 C2.47 0.49 2.47 0.49 5 1 C5 1.99 5 2.98 5 4 C3.35 4 1.7 4 0 4 C0 2.68 0 1.36 0 0 Z " fill="%23f85631" transform="translate(10,13)"/><path d="M0 0 C2.31 0 4.62 0 7 0 C6.01 0.33 5.02 0.66 4 1 C4 1.99 4 2.98 4 4 C2.68 3.67 1.36 3.34 0 3 C0 2.01 0 1.02 0 0 Z " fill="%23f85631" transform="translate(13,4)"/></svg>',
    iconStop:
      '<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="44" height="44" viewBox="0 0 44 44" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,44.000000) scale(0.100000,-0.100000)" fill="%231877f2" stroke="none"><path d="M167 426 c-21 -8 -47 -22 -57 -31 -52 -47 -65 -145 -27 -206 28 -46 130 -178 137 -178 7 0 109 132 137 178 79 125 -52 287 -190 237z m113 -51 c68 -35 78 -132 21 -189 -27 -26 -39 -31 -81 -31 -42 0 -54 5 -80 30 -101 101 14 255 140 190z"/><path d="M179 345 c-31 -17 -52 -60 -43 -89 27 -88 141 -88 168 1 9 29 -16 76 -49 91 -33 15 -44 15 -76 -3z m77 -13 c6 -4 13 -15 17 -25 7 -20 -24 -57 -48 -57 -9 0 -15 -9 -15 -25 0 -16 -6 -25 -15 -25 -12 0 -15 14 -15 70 l0 70 33 0 c17 0 37 -4 43 -8z"/><path d="M210 300 c0 -5 7 -10 15 -10 8 0 15 5 15 10 0 6 -7 10 -15 10 -8 0 -15 -4 -15 -10z"/></g></svg>',
    iconCheckin:
      '<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" version="1.1"><path d="M 17.914 0.925 C 7.822 4.105, 2.825 16.279, 8.075 24.892 C 11.082 29.823, 21.074 42, 22.114 42 C 23.040 42, 30.499 32.779, 35.250 25.761 C 41.903 15.934, 35.857 2.432, 24 0.639 C 22.075 0.348, 19.336 0.476, 17.914 0.925 M 15.763 6.565 C 12.329 8.429, 10 12.833, 10 17.465 C 10 22.258, 15.051 27.839, 20.118 28.644 C 29.846 30.189, 37.077 19.852, 32.483 10.967 C 29.655 5.498, 21.625 3.384, 15.763 6.565 M 18.213 8.507 C 16.072 9.437, 14.410 11.167, 13.449 13.467 C 12.148 16.582, 12.148 17.418, 13.451 20.536 C 16.686 28.281, 27.314 28.281, 30.549 20.536 C 32.613 15.597, 30.525 10.535, 25.568 8.464 C 21.451 6.744, 22.281 6.739, 18.213 8.507 M 19.389 11.430 C 18.393 14.025, 19.788 16.169, 22.246 15.820 C 25.450 15.365, 25.450 10.635, 22.246 10.180 C 20.893 9.988, 19.750 10.488, 19.389 11.430 M 18.223 18.557 C 15.300 20.604, 15.411 22.411, 18.547 23.839 C 22.085 25.452, 23.420 25.304, 26.139 23 L 28.500 21 26.139 19 C 23.301 16.595, 21.192 16.477, 18.223 18.557" stroke="none" fill="%23f85631" fillRule="evenodd"/></svg>',
  };

  return (
    <div id="ekmapplf_tracking_legend" className="ekmapplf_tracking-map-legend">
      <div className="ekmapplf_tracking-legend-title" onClick={toggleLegend}>
        <span
          className={`icon ${
            isOpen
              ? "ekmapplf_tracking-icon-square-minus"
              : "ekmapplf_tracking-icon-square-plus"
          }`}
          style={{
            filter:
              "invert(100%) sepia(100%) saturate(0%) hue-rotate(187deg) brightness(105%) contrast(103%)",
          }}></span>
        <span>Chú giải bản đồ</span>
      </div>
      <div
        className={`ekmapplf_tracking-legend-body ${isOpen ? "open" : ""}`}
        style={{ maxHeight: isOpen ? "none" : "0" }}>
        <ul>
          <li>
            <span
              className="ekmapplf_tracking-legend-icon"
              style={{
                backgroundImage: `url('data:image/svg+xml,${options.iconStart}')`,
              }}></span>
            Vị trí bắt đầu
          </li>
          <li>
            <span
              className="ekmapplf_tracking-legend-icon"
              style={{
                backgroundImage: `url('data:image/svg+xml,${options.iconEnd}')`,
              }}></span>
            Vị trí kết thúc
          </li>
          <li>
            <span
              className="ekmapplf_tracking-legend-icon"
              style={{
                backgroundImage: `url('data:image/svg+xml,${options.iconCheckin}')`,
              }}></span>
            Vị trí khách hàng
          </li>
          <li>
            <span
              className="ekmapplf_tracking-legend-icon"
              style={{
                backgroundImage: `url('data:image/svg+xml,${options.iconStop}')`,
              }}></span>
            Vị trí điểm dừng
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MapLegend;
