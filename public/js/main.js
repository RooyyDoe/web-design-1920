// tutorial that let me understand drag and drop: https://www.youtube.com/watch?v=jfYWwQrtzzY

// Get the different elements we are able to drag.
const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
    // Dragstart runs when a user is dragging a element.
    draggable.addEventListener('dragstart', () => {
        // adds a styling class for when a element is dragged.
        draggable.classList.add('dragging')

    })
    // Dragend runs when a user let go of the dragging element.
    draggable.addEventListener('dragend', () => {
        // removes the styling class for when the element stopped dragging.
        draggable.classList.remove('dragging')

    })
})

containers.forEach(container => {
    container.addEventListener('dragover', event => {
        // enables dropping
        event.preventDefault()

        const afterElement = getDragAfterElement(container, event.clientY)
        const draggable = document.querySelector('.dragging')

        if (afterElement == null) {
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement)
        }

    })
})

// This function will determine our mouse position when we are dragging
// or element and it's going to return which ever element our mouse position
// is directly after.
function getDragAfterElement(container, y) {
    // will receive every draggable that we are nog dragging.
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        // console.log(box)
        const offset = y - box.top - box.height / 2
        // console.log(offset)
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}