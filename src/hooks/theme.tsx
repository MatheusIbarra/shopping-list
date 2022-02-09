import React, { createContext, useCallback, useContext } from 'react';
import { ThemeProvider as Provider, DefaultTheme } from 'styled-components/native';
import darkTheme from '../styles/themes/default';
import lightTheme from '../styles/themes/light';
import usePersistedState from '../utils/usePersistedState'

interface ThemeContextData {
    changeTheme(theme: string): void;
    resetTheme(): void;
    theme: any;
}

const themeContext = createContext<ThemeContextData>({} as ThemeContextData);

const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', lightTheme);

    //HOOK PARA SELECIONAR TEMAS
    const changeTheme = useCallback(async (newtheme: 'dark' | 'light') => {
        if (newtheme === 'dark') {
            setTheme(darkTheme);
        } else if (newtheme === 'light') {
            setTheme(lightTheme);
        }
    }, []);

    const resetTheme = useCallback(() => {
        setTheme(lightTheme);
    }, []);

    return (
        <themeContext.Provider value={{ changeTheme, resetTheme, theme }}>
            <Provider theme={theme}>
                {children}
            </Provider>
        </themeContext.Provider>
    )
};

function useTheme(): ThemeContextData {
    const context = useContext(themeContext);

    if (!context) {
        throw new Error('useTheme must be used within an ThemeProvider');
    }

    return context;
}

export { ThemeProvider, useTheme };
