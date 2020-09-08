const todo = document.querySelector('.todo-list');

if (todo) {
    todo.addEventListener('click', (event) => {
        if (event.target.classList.contains('todo-list__delete')) {
            event.preventDefault();
            const todoItem = event.target.parentElement;
            const id = event.target.dataset.id;

            fetch(`/todo/${id}`, {

                method: 'DELETE',
            })
                .then(response => response.json())
                .then((data) => {
                    if (data._id) {
                        todoItem.remove()
                    }
                })
                .catch((err) => {
                    alert('Не удалось удалить чат');
                });

        }
    })
}