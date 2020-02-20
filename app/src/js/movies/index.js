document.addEventListener('DOMContentLoaded',function () {
    var deleteBtn = document.querySelector('#deleteBtn');

    if(deleteBtn !== null) {
        deleteBtn.addEventListener('click',function (e) {
            e.preventDefault();
            const id = e.target.getAttribute('data-id');
            axios.delete('/' + id + '/delete').then((response) => {
                if (response.status == 200) {
                    window.location = '/';
                }
            });
        });
    }
});