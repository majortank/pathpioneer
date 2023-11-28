module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}','node_modules/flowbite-react/lib/esm/**/*.js'],
  daisyui: {
    themes: [
      {
        pp: {
          
          "primary": "#6366f1",
                   
          "secondary": "#d926a9",
                   
          "accent": "#1fb2a6",
                   
          "neutral": "#2a323c",
                   
          "base-100": "#ffffff",
                   
          "info": "#3abff8",
                   
          "success": "#36d399",
                   
          "warning": "#fbbd23",
                   
          "error": "#f87272",
                   },
                  },
                ],
              },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin')
],
};
