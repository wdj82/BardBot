/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import './box-styles.css';

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function NoteButton({ note }) {
    const fileName = note.replace('#', 'sharp');
    const audio = new Audio(`/audio/${fileName}.wav`);
    const play = () => audio.play();

    return (
        <button type='button' onClick={() => audio.play()}>
            {note}
        </button>
    );
}

function App() {
    return (
        <>
            <h1>BardBot</h1>
            <div id='notes'>
                {notes.map((note) => (
                    <NoteButton key={note} note={note} />
                ))}
            </div>
        </>
    );
}

export default App;
