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
    shadow: '0 4px 8px 0 rgba(0, 0, 0, 0.15)',

    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: 'hsl(0, 0%, 96%)',
    text_l: 'hsl(0, 0%, 34%)',
    bg200: 'hsl(240, 40%, 20%)',
    bg400: 'hsl(240, 40%, 16%)',
    // primary
    p50: 'hsl(209, 100%, 96%)',
    p100: 'hsl(209, 100%, 91%)',
    p200: 'hsl(209, 100%, 86%)',
    p300: 'hsl(209, 100%, 76%)',
    p400: 'hsl(209, 100%, 66%)',
    p500: 'hsl(209, 100%, 56%)',
    p600: 'hsl(209, 100%, 46%)',
    p700: 'hsl(209, 100%, 36%)',
    p800: 'hsl(209, 100%, 26%)',
    // secondary
    s50: 'hsl(219, 81%, 89%)',
    s100: 'hsl(219, 81%, 74%)',
    s200: 'hsl(219, 81%, 59%)',
    s300: 'hsl(219, 81%, 44%)',
    s400: 'hsl(219, 81%, 29%)',
    s500: 'hsl(219, 81%, 24%)',
    s600: 'hsl(219, 81%, 19%)',
    s700: 'hsl(219, 81%, 14%)',
    s800: 'hsl(219, 81%, 9%)',
    // neutral
    n50: 'hsl(210, 17%, 96%)',
    n100: 'hsl(210, 17%, 93%)',
    n200: 'hsl(210, 17%, 90%)',
    n300: 'hsl(210, 17%, 87%)',
    n400: 'hsl(210, 17%, 84%)',
    n500: 'hsl(210, 17%, 69%)',
    n600: 'hsl(210, 17%, 54%)',
    n700: 'hsl(210, 17%, 39%)',
    n800: 'hsl(210, 17%, 24%)',
    // others
    accent: 'hsl(219, 96%, 78%)',
    shadow: '0 0 0 0 rgba(0, 0, 0, 0)',

    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
