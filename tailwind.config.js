/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        aliceblue: "#F0F8FF",
        // 다른 색상을 추가하려면 위와 같이 정의합니다.
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
