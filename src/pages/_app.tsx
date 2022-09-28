import '../../styles/globals.css'
import type {AppProps} from 'next/app'
import {NextPage} from "next";
import type {EmotionCache} from "@emotion/cache";
import {FC} from "react";
import {createEmotionCache} from '../utils/create-emotion-cache';
import {CacheProvider, ThemeProvider} from "@emotion/react";
import {createTheme} from "../theme";
import {SettingsProvider} from "../contexts/settings-context";
import {SettingsConsumer} from "../contexts/settings-context";
import {AuthProvider} from "../contexts/jwt-context";
import {AuthConsumer} from "../contexts/jwt-context";
import { CookiesProvider } from 'react-cookie';
import { Toaster } from 'react-hot-toast';
import {Provider} from "react-redux";
import {store} from '../store/index';

type EnhancedAppProps = AppProps & {
    Component: NextPage;
    emotionCache: EmotionCache;
}
const clientSideEmotionCache = createEmotionCache();

const App: FC<EnhancedAppProps> = (props: any) => {
    const {Component, emotionCache = clientSideEmotionCache, pageProps} = props;
    const getLayout = Component.getLayout ?? ((page: any) => page);

    return (
        <Provider store={store}>
            <AuthProvider>
                <SettingsProvider>
                    <SettingsConsumer>
                        {({settings}) => (
                            <ThemeProvider theme={createTheme({
                                direction: settings.direction,
                                responsiveFontSizes: settings.responsiveFontSizes,
                                mode: settings.theme
                            })}
                            >
                                <CookiesProvider>
                                    <Toaster position={"top-center"} />
                                    <AuthConsumer>
                                        {
                                            (auth) =>
                                                getLayout(<Component {...pageProps} />)
                                        }
                                    </AuthConsumer>
                                </CookiesProvider>
                            </ThemeProvider>
                        )}
                    </SettingsConsumer>
                </SettingsProvider>
            </AuthProvider>
        </Provider>
    )
}

export default App
