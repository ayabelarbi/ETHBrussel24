import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Monopol';
        src: url('../assets/fonts/Monopol-Regular-Trial.otf') format('otf');
      }

      @font-face {
        font-family: 'Monopol-Thin';
        src: url('../assets/fonts/Monopol-Thin-Trial.otf') format('otf');
      }

      @font-face {
        font-family: 'Monopol-Light';
        src: url('../assets/fonts/Monopol-Light-Trial.otf') format('otf');
      }
      
      @font-face {
        font-family: 'Monopol-SemiBold';
        src: url('../assets/fonts/Monopol-SemiBold-Trial.otf') format('otf');
      }
   
      `}
  />
);

export default Fonts;