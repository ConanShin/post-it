const confirmAction = (prompt, action) => {
    if (confirm(prompt)) action()
}

export default confirmAction
