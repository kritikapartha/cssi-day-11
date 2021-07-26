let googleUser = null
new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString()
window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // this code runs if the user is logged in
            console.log("logged in as", user.displayName)
            googleUser = user
        } else {
            // this code runs if the user is not logged in
            console.log("not logged in")
        }
    })

    const createNoteButton = document.querySelector("#createNoteButton")
    createNoteButton.addEventListener("click", () => {
        // get values from the form.
        const noteTitle = document.querySelector("#noteTitle").value
        const noteText = document.querySelector("#noteText").value
        const timeStamp = noteText.toDate()
        console.log(noteTitle, noteText)

        // Write these values to the database
        firebase.database().ref(`/users/${googleUser.uid}`).push({
            title: noteTitle,
            text: noteText,
            time: timeStamp
        }).then(() => {
            console.log("database write successful")
            document.querySelector("#noteTitle").value = ""
            document.querySelector("#noteText").value = ""
        })
        .catch(error => {
            console.log("error writing new note: ", error)
        })
    })
}
