import './box-styles.css';

const notes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

function NoteButton({ note }) {
    return <button type='button'>{note}</button>;
}

function App() {
    return (
        <>
            <h1>BardBot</h1>
            <div id='notes'>
                {notes.map((note, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <NoteButton key={index} note={note} />
                ))}
            </div>
        </>
    );
}

export default App;
