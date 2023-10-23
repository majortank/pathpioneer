module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: [
      {
        pp: {
            "primary": "#6366f1",
                    
            "secondary": "#d946ef",
                    
            "accent": "#1dcdbc",
                    
            "neutral": "#2b3440",
                    
            "base-100": "#ffffff",
                    
            "info": "#3abff8",
                    
            "success": "#36d399",
                    
            "warning": "#fbbd23",
                    
            "error": "#f87272",
                    },
                  },
                ],
              },
  plugins: [require('daisyui')],
};
