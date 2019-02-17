document.addEventListener('DOMContentLoaded', appStart)

let notes = []

function appStart() {
    const NewNoteSubmit = document.querySelector("#NewNoteSubmit")
    NewNoteSubmit.addEventListener('click', addNewNote)

    notes = JSON.parse(localStorage.getItem('notes')) || []
    notes.forEach(note => {
        addNotesToNotesContainer(note)
    });
}
//if there is title or content note is added to notes array with parameters
function addNewNote() {
    const title = document.querySelector("#NewNoteName").value
    const content = document.querySelector("#NewNoteContent").value
    if (title || content) {

        const note = new Note(title, content)
        notes.push(note)

        updateLocalStorage()
        addNotesToNotesContainer(note)
    }

}


//creates dives every time note is added to array and fill it with content
function addNotesToNotesContainer(note) {
    const noteDateTime = new Date(note.id).toUTCString()

    let noteDiv = document.createElement('div')

    noteDiv.classList.add('note');
    document.getElementById('NotesContainer').appendChild(noteDiv);
    noteDiv.innerHTML = `\
    <div class="note-title">${note.title}</div>\
    <div class="note-content">${note.content}</div>\
    <div class="mini ui buttons note-buttons ">
        <button id="delete" class="ui button delete-button "><i class="trash alternate icon"></i></button>/
        <button class="ui button pinToTop-button"><i class="exchange icon"></i></button>/
        <button class="ui button changeColor-button"><i class="paint brush icon"></i></button>/
    </div>
    <div class="note-date">${noteDateTime}</div>\
    `
    note.div = noteDiv
    noteDiv.children[2].children[0].addEventListener('click', e => deleteNote(note, noteDiv))
    noteDiv.children[2].children[1].addEventListener('click', e => pinToTop(note))
    noteDiv.children[2].children[2].addEventListener('click', e => changeColor(noteDiv))



}

//deletes note from array and note div from container and reload local storage
function deleteNote(note, noteDiv) {
    notes.pop(this.note);
    updateLocalStorage();
    document.getElementById('NotesContainer').removeChild(noteDiv);


}

function pinToTop(note) {


}

//sets background of note div
function changeColor(noteDiv) {
    if (noteDiv.style.background == "yellow") {
        noteDiv.style.background = "red";
    }
    else 
        noteDiv.style.background = "yellow";
}

function updateLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//creates new note with date when its added
function Note(title = "", content = "") {
    this.title = title;
    this.content = content;
    this.id = Date.now();
}