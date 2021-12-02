import { LiveReload, Outlet, Links, Scripts } from 'remix';

import globalStylesUrl from '~/styles/global.css';

export function links() {
    return [{ rel: 'stylesheet', href: globalStylesUrl }];
}

function Document({ children }) {
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <title>BardBot</title>
                <Links />
                <Scripts />
            </head>
            <body id='root'>
                {children}
                {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
            </body>
        </html>
    );
}

export default function App() {
    return (
        <Document>
            <Outlet />
        </Document>
    );
}

export function ErrorBoundary({ error }) {
    return (
        <Document>
            <div className='error-container'>
                <h1>Error</h1>
                <p>{error.message}</p>
            </div>
        </Document>
    );
}
