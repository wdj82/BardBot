import stylesURL from '~/styles/index.css';
import Key from '~/components/Key';

export function links() {
    return [{ rel: 'stylesheet', href: stylesURL }];
}

export default function IndexRoute() {
    const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'];

    return (
        <div className='wrapper'>
            {keys.map((key, index) => {
                return <Key key={index} keyCode={key} />;
            })}
        </div>
    );
}
