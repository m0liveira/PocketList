/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: 'hsl(219, 30%, 9%)',
    text_l: 'hsl(0, 0%, 96%)',
    bg200: 'hsl(0, 0%, 98%)',
    bg400: 'hsl(0, 0%, 100%)',
    // primary
    p50: 'hsl(209, 100%, 94%)',
    p100: 'hsl(209, 100%, 79%)',
    p200: 'hsl(209, 100%, 64%)',
    p300: 'hsl(209, 100%, 49%)',
    p400: 'hsl(209, 100%, 34%)',
    p500: 'hsl(209, 100%, 29%)',
    p600: 'hsl(209, 100%, 24%)',
    p700: 'hsl(209, 100%, 19%)',
    p800: 'hsl(209, 100%, 14%)',
    // secondary
    s50: 'hsl(219, 83%, 91%)',
    s100: 'hsl(218, 81%, 86%)',
    s200: 'hsl(219, 83%, 81%)',
    s300: 'hsl(219, 80%, 76%)',
    s400: 'hsl(219, 81%, 71%)',
    s500: 'hsl(219, 81%, 61%)',
    s600: 'hsl(219, 81%, 51%)',
    s700: 'hsl(219, 81%, 41%)',
    s800: 'hsl(219, 81%, 31%)',
    // neutral
    n50: 'hsl(210, 10%, 96%)',
    n100: 'hsl(210, 11%, 93%)',
    n200: 'hsl(210, 13%, 91%)',
    n300: 'hsl(204, 14%, 86%)',
    n400: 'hsl(208, 13%, 81%)',
    n500: 'hsl(209, 13%, 66%)',
    n600: 'hsl(208, 14%, 51%)',
    n700: 'hsl(206, 14%, 36%)',
    n800: 'hsl(208, 14%, 21%)',
    // others
    accent: 'hsl(206, 71%, 60%)',
    warning: 'hsl(35, 100%, 50%)',
    success: 'hsl(140, 60%, 45%)',
    danger: 'hsl(0, 85%, 60%)',
    shadow: '0 4px 8px 0 rgba(0, 0, 0, 0.15)',
    navShadow: '0 0 8px 0 rgba(0, 0, 0, 0.15)',

    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: 'hsl(0, 0%, 96%)',
    text_l: 'hsl(219, 30%, 9%)',
    bg200: 'hsl(215, 25%, 12%)',
    bg400: 'hsl(215, 25%, 8%)',
    // primary
    p50: 'hsl(209, 100%, 14%)',
    p100: 'hsl(209, 100%, 19%)',
    p200: 'hsl(209, 100%, 24%)',
    p300: 'hsl(209, 100%, 29%)',
    p400: 'hsl(209, 100%, 34%)',
    p500: 'hsl(209, 100%, 49%)',
    p600: 'hsl(209, 100%, 64%)',
    p700: 'hsl(209, 100%, 79%)',
    p800: 'hsl(209, 100%, 94%)',
    // secondary
    s50: 'hsl(219, 81%, 31%)',
    s100: 'hsl(219, 81%, 41%)',
    s200: 'hsl(219, 81%, 51%)',
    s300: 'hsl(219, 81%, 61%)',
    s400: 'hsl(219, 81%, 71%)',
    s500: 'hsl(219, 81%, 76%)',
    s600: 'hsl(219, 83%, 81%)',
    s700: 'hsl(218, 81%, 86%)',
    s800: 'hsl(219, 83%, 91%)',
    // neutral
    n50: 'hsl(215, 15%, 20%)',
    n100: 'hsl(215, 14%, 26%)',
    n200: 'hsl(215, 13%, 31%)',
    n300: 'hsl(215, 12%, 36%)',
    n400: 'hsl(215, 11%, 46%)',
    n500: 'hsl(215, 10%, 61%)',
    n600: 'hsl(215, 9%, 76%)',
    n700: 'hsl(210, 11%, 86%)',
    n800: 'hsl(210, 10%, 96%)',
    // others
    accent: 'hsl(206, 71%, 70%)',
    warning: 'hsl(40, 100%, 60%)',
    success: 'hsl(140, 60%, 55%)',
    danger: 'hsl(0, 85%, 60%)',
    shadow: '0 0 0 0 rgba(0, 0, 0, 0)',
    navShadow: '0 0 0 0 rgba(0, 0, 0, 0)',

    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
