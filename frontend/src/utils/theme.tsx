import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
 fonts: {
    body: 'Monopol, sans-serif',
    heading: 'Monopol, sans-serif',


 },
 styles: {
   global: {
     body: {
         bg: "black",
         color: "white",
     },
   },
 },
});

export default theme;