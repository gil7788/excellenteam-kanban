declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
    
    // Add explicit exports for our variables
    export const primaryColor: string;
    export const secondaryColor: string;
    export const backgroundColor: string;
    export const primaryLight: string;
    export const primaryDark: string;
    export const secondaryLight: string;
    export const secondaryDark: string;
    export const spacingUnit: string;
    export const navbarHeight: string;
    export const footerHeight: string;
    export const sidebarWidth: string;
    export const cardPadding: string;
  }