import { definePreset } from "@primeuix/themes";
import Aura from '@primeuix/themes/aura';

export const themePreset = {
  theme: {
    preset: definePreset(Aura, {
      semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
        },
        colorScheme: {
          dark: {
            surface: {
              50: '{zinc.50}',
              100: '{zinc.100}',
              200: '{zinc.200}',
              300: '{zinc.300}',
              400: '{zinc.400}',
              500: '{zinc.500}',
              600: '{zinc.600}',
              700: '{zinc.700}',
              800: '{zinc.800}',
              900: '#2B2C37',
              950: '#20212C'
            }
          }
        }
      }
    }),
    options: {
      darkModeSelector: '.my-app-dark',
      
    } 
  }
}