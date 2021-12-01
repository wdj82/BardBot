import { LiveReload, Outlet, Links, Scripts } from 'remix';

import globalStylesUrl from '~/styles/global.css';

export function links() {
    return [{ rel: 'stylesheet', href: globalStylesUrl }];
}

export default function App() {
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <title>BardBot</title>
                <Links />
                <Scripts />
            </head>
            <body id='root'>
                <Outlet />
                {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
            </body>
        </html>
    );
}
