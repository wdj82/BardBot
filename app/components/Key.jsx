import useKeyPress from '~/hooks/useKeyPress';

function Key({ keyCode }) {
    const isKeyPressed = useKeyPress(keyCode);
    return <div className={isKeyPressed ? 'col played' : 'col'} />;
}

export default Key;
