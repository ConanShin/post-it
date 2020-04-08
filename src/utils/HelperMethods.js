const confirmAction = (prompt, action) => {
    if (confirm(prompt)) action()
}

const deepcopy = object => {
    return JSON.parse(JSON.stringify(object))
}

export default {confirmAction, deepcopy}
