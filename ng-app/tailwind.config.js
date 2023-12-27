const { iconsPlugin } = require("@egoist/tailwindcss-icons");

module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter Variable",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        wedgewood: {
          50: "#f2f8f9",
          100: "#deeaef",
          200: "#c0d7e1",
          300: "#94b9cc",
          400: "#6193af",
          500: "#467894",
          600: "#3d637d",
          700: "#365268",
          800: "#334657",
          900: "#2e3d4b",
          950: "#1b2631",
        },
        locally: {
          background: "#F9FAFB",
          "header-background": "#F3F4F6",
          text: "#4B5563",
          "caption-text": "#6B7280",
          "link-text": "#467894",
          "focus-outline": "#94B9CC",
          "error-focus-outline": "#E79898",
          "hover-background": "#DEEAEF",
          "selected-background": "#C0D7E1",
          "primary-text": "#FFFFFF",
          "primary-background": "#467894",
          "primary-hover-background": "#3D637D",
          "primary-pressed-background": "#365268",
          "primary-disabled-background": "#94B9CC",
          "status-success": "#469460",
          "status-warning": "#948346",
          "status-important": "#944646",
          "text-field-outline": "#9CA3AF",
          "text-field-disabled-text": "#9CA3AF",
          "text-field-disabled-ouline": "#D1D5DB",
        },
      },
    },
  },
  plugins: [
    iconsPlugin({
      collections: {
        locally: {
          icons: {
            create: {
              body: '<g fill="currentColor"><path d="M7 12H9V10H11V8H9V6H7V8H5V10H7V12ZM3 16C2.45 16 1.97917 15.8042 1.5875 15.4125C1.19583 15.0208 1 14.55 1 14V2C1 1.45 1.19583 0.979167 1.5875 0.5875C1.97917 0.195833 2.45 0 3 0H11L15 4V14C15 14.55 14.8042 15.0208 14.4125 15.4125C14.0208 15.8042 13.55 16 13 16H3ZM10 5V2H3V14H13V5H10Z"/></g>',
            },
            edit: {
              body: '<g fill="currentColor"><path d="M2 14H3.425L11.2 6.225L9.775 4.8L2 12.575V14ZM0 16V11.75L11.2 0.575C11.4 0.391667 11.6208 0.25 11.8625 0.15C12.1042 0.05 12.3583 0 12.625 0C12.8917 0 13.15 0.05 13.4 0.15C13.65 0.25 13.8667 0.4 14.05 0.6L15.425 2C15.625 2.18333 15.7708 2.4 15.8625 2.65C15.9542 2.9 16 3.15 16 3.4C16 3.66667 15.9542 3.92083 15.8625 4.1625C15.7708 4.40417 15.625 4.625 15.425 4.825L4.25 16H0ZM10.475 5.525L9.775 4.8L11.2 6.225L10.475 5.525Z"/></g>',
            },
            delete: {
              body: '<g fill="currentColor"><path d="M3 16C2.45 16 1.97917 15.8042 1.5875 15.4125C1.19583 15.0208 1 14.55 1 14V3H0V1H5V0H11V1H16V3H15V14C15 14.55 14.8042 15.0208 14.4125 15.4125C14.0208 15.8042 13.55 16 13 16H3ZM13 3H3V14H13V3ZM5 12H7V5H5V12ZM9 12H11V5H9V12Z"/></g>',
            },
            add: {
              body: '<g fill="currentColor"><path d="M7 9H1V7H7V1H9V7H15V9H9V15H7V9Z"/></g>',
            },
            remove: {
              body: '<g fill="currentColor"><path d="M1 9V7H15V9H1Z"/></g>',
            },
            settings: {
              body: '<g fill="currentColor"><path d="M3 14V12H0V10H3V8H5V14H3ZM7 12V10H16V12H7ZM11 8V2H13V4H16V6H13V8H11ZM0 6V4H9V6H0Z"/></g>',
            },
            close: {
              body: '<g fill="currentColor"><path d="M2.4 15L1 13.6L6.6 8L1 2.4L2.4 1L8 6.6L13.6 1L15 2.4L9.4 8L15 13.6L13.6 15L8 9.4L2.4 15Z"/></g>',
            },
            more: {
              body: '<g fill="currentColor"><path d="M8 16C7.45 16 6.97917 15.8042 6.5875 15.4125C6.19583 15.0208 6 14.55 6 14C6 13.45 6.19583 12.9792 6.5875 12.5875C6.97917 12.1958 7.45 12 8 12C8.55 12 9.02083 12.1958 9.4125 12.5875C9.80417 12.9792 10 13.45 10 14C10 14.55 9.80417 15.0208 9.4125 15.4125C9.02083 15.8042 8.55 16 8 16ZM8 10C7.45 10 6.97917 9.80417 6.5875 9.4125C6.19583 9.02083 6 8.55 6 8C6 7.45 6.19583 6.97917 6.5875 6.5875C6.97917 6.19583 7.45 6 8 6C8.55 6 9.02083 6.19583 9.4125 6.5875C9.80417 6.97917 10 7.45 10 8C10 8.55 9.80417 9.02083 9.4125 9.4125C9.02083 9.80417 8.55 10 8 10ZM8 4C7.45 4 6.97917 3.80417 6.5875 3.4125C6.19583 3.02083 6 2.55 6 2C6 1.45 6.19583 0.979167 6.5875 0.5875C6.97917 0.195833 7.45 0 8 0C8.55 0 9.02083 0.195833 9.4125 0.5875C9.80417 0.979167 10 1.45 10 2C10 2.55 9.80417 3.02083 9.4125 3.4125C9.02083 3.80417 8.55 4 8 4Z"/></g>',
            },
            "drop-down": {
              body: '<g fill="currentColor"><path d="M8 11L3 6H13L8 11Z"/></g>',
            },
            filter: {
              body: '<g fill="currentColor"><path d="M8.00008 16C7.71675 16 7.47925 15.9042 7.28758 15.7125C7.09591 15.5208 7.00008 15.2833 7.00008 15V9L1.20008 1.6C0.95008 1.26667 0.91258 0.916667 1.08758 0.55C1.26258 0.183333 1.56675 0 2.00008 0H16.0001C16.4334 0 16.7376 0.183333 16.9126 0.55C17.0876 0.916667 17.0501 1.26667 16.8001 1.6L11.0001 9V15C11.0001 15.2833 10.9042 15.5208 10.7126 15.7125C10.5209 15.9042 10.2834 16 10.0001 16H8.00008ZM9.00008 8.3L13.9501 2H4.05008L9.00008 8.3Z"/></g>',
            },
            sort: {
              body: '<g fill="currentColor"><path d="M6 14V12H10V14H6ZM3 9V7H13V9H3ZM0 4V2H16V4H0Z"/></g>',
            },
            "filter-sort": {
              body: '<g fill="currentColor"><path d="M0 14V12H4V14H0ZM0 9V7H10V9H0ZM0 4V2H16V4H0Z"/></g>',
            },
            play: {
              body: '<g fill="currentColor"><path d="M2 15V1L13 8L2 15ZM4 11.35L9.25 8L4 4.65V11.35Z"/></g>',
            },
            pause: {
              body: '<g fill="currentColor"><path d="M9 15V1H15V15H9ZM1 15V1H7V15H1ZM11 13H13V3H11V13ZM3 13H5V3H3V13Z"/></g>',
            },
            stop: {
              body: '<g fill="currentColor"><path d="M2 14V2H14V14H2ZM4 12H12V4H4V12Z"/></g>',
            },
            cloud: {
              body: '<g fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.1214 8.71432L10.9911 7.30582C10.8874 6.1848 9.75378 5 8 5C6.47799 5 5.38684 5.91708 5.09053 6.8907L4.79604 7.85835L3.84211 8.19463C2.65039 8.61474 2 9.57354 2 10.5C2 11.6877 3.13972 13 5 13H12C13.1046 13 14 12.1046 14 11C14 10.0677 13.3602 9.27975 12.4928 9.06069L11.1214 8.71432ZM3.17718 6.3084C1.31719 6.96408 0 8.5936 0 10.5C0 12.9853 2.23858 15 5 15H12C14.2091 15 16 13.2091 16 11C16 9.12989 14.7166 7.55953 12.9826 7.12158C12.769 4.81338 10.6198 3 8 3C5.69693 3 3.75754 4.4014 3.17718 6.3084Z"/></g>',
            },
            search: {
              body: '<g fill="currentColor"><path d="M14.6 16L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L16 14.6L14.6 16ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z"/></g>',
            },
            drive: {
              body: '<g fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M14 13H2V8H14V13ZM11.175 4L13.175 6H2.825L4.825 4H11.175ZM3.425 2.575L0 6V13C0 13.55 0.195833 14.0208 0.5875 14.4125C0.979167 14.8042 1.45 15 2 15H14C14.55 15 15.0208 14.8042 15.4125 14.4125C15.8042 14.0208 16 13.55 16 13V6L12.575 2.575C12.3917 2.39167 12.1792 2.25 11.9375 2.15C11.6958 2.05 11.4417 2 11.175 2H4.825C4.55833 2 4.30417 2.05 4.0625 2.15C3.82083 2.25 3.60833 2.39167 3.425 2.575ZM12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z"/></g>',
            },
            folder: {
              body: '<g fill="currentColor"><path d="M2 15C1.45 15 0.979167 14.8042 0.5875 14.4125C0.195833 14.0208 0 13.55 0 13V3C0 2.45 0.195833 1.97917 0.5875 1.5875C0.979167 1.19583 1.45 1 2 1H7L9 3H14C14.55 3 15.0208 3.19583 15.4125 3.5875C15.8042 3.97917 16 4.45 16 5V13C16 13.55 15.8042 14.0208 15.4125 14.4125C15.0208 14.8042 14.55 15 14 15H2ZM2 13H14V5H8.175L6.175 3H2V13Z"/></g>',
            },
            document: {
              body: '<g fill="currentColor"><path d="M3 16C2.45 16 1.97917 15.8042 1.5875 15.4125C1.19583 15.0208 1 14.55 1 14V2C1 1.45 1.19583 0.979167 1.5875 0.5875C1.97917 0.195833 2.45 0 3 0H11L15 4V14C15 14.55 14.8042 15.0208 14.4125 15.4125C14.0208 15.8042 13.55 16 13 16H3ZM10 5V2H3V14H13V5H10Z"/></g>',
            },
            "folder-add": {
              body: '<g fill="currentColor"><path d="M2 15C1.45 15 0.979167 14.8042 0.5875 14.4125C0.195833 14.0208 0 13.55 0 13V3C0 2.45 0.195833 1.97917 0.5875 1.5875C0.979167 1.19583 1.45 1 2 1H7L9 3H14C14.55 3 15.0208 3.19583 15.4125 3.5875C15.8042 3.97917 16 4.45 16 5V13C16 13.55 15.8042 14.0208 15.4125 14.4125C15.0208 14.8042 14.55 15 14 15H2ZM2 13H14V5H8.175L6.175 3H2V13Z"/><path d="M9 12H7V10H5V8H7V6H9V8H11V10H9V12Z"/></g>',
            },
          },
        },
      },
    }),
  ],
};
