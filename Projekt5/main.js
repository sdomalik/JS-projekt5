document.addEventListener('DOMContentLoaded', appStart)

let notes = []

function appStart(){
    const NewNoteSubmit = document.querySelector("#NewNoteSubmit")
    NewNoteSubmit.addEventListener('click', addNewNote)

    notes = JSON.parse(localStorage.getItem('notes')) || []
    notes.forEach(note => {
        addNotesToNotesContainer(note)
    }); 
}

function addNewNote() {
    const title   = document.querySelector("#NewNoteName").value
    const content = document.querySelector("#NewNoteContent").value
    if(title || content){

        const note = new Note(title, content)
        notes.push(note)

        updateLocalStorage()
        addNotesToNotesContainer(note)
    }
    
}

function addNotesToNotesContainer(note){
    const noteDateTime = new Date(note.id)

    let noteDiv = document.createElement('div')
    noteDiv.classList.add('note')
    noteDiv.innerHTML ='\
    <div class="note-title">$(title)</div>\
    <div class="note-content">$(content)</div>\
    <div class="note-date">$(content.id)</div>\
    '
}
function updateLocalStorage(){
    localStorage.setItem('notes', JSON.stringify(notes))
}

function Note(title = "", content = ""){
    this.title = title;
    this.content = content;
    this.id = Date.now()
}