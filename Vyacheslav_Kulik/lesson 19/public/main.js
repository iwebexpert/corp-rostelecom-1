const signInButton = document.querySelector('.signIn')
if(signInButton) {

    signInButton.addEventListener('click', async function (event) {
        event.preventDefault()
        const bodyData =  new URLSearchParams()
        bodyData.append('email_address',document.querySelector('input[type="email"]').value)
        bodyData.append('password',document.querySelector('input[type="password"]').value)
        const postData = await fetch('http://localhost:4000/auth',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // отправляемые данные
            },
            body: bodyData,
        })
        if(postData.ok) {
            const {token, ...user} = await postData.json()
            if(localStorage.getItem('token')) {
                localStorage.removeItem('token')
            }
            if(localStorage.getItem('user')) {
                localStorage.removeItem('user')
            }
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            window.location = '/todo'
            //document.querySelector('.toDoList').click()
        } else {
            let errorData = await postData.json()
            //(errorData)
            document.querySelector('.errorLogin').classList.remove('d-none')
            document.querySelector('input[type="password"]').value = ''
        }

    })
}


const createAccButton = document.querySelector('.createAcc')
if(createAccButton) {

    createAccButton.addEventListener('click', async function (event) {
        event.preventDefault()
        const bodyData =  new URLSearchParams()
        bodyData.append('first_name',document.querySelector('input[name="first_name"]').value)
        bodyData.append('last_name',document.querySelector('input[name="last_name"]').value)
        bodyData.append('email_address',document.querySelector('input[name="email_address"]').value)
        bodyData.append('password',document.querySelector('input[name="password"]').value)
        bodyData.append('repassword',document.querySelector('input[name="repassword"]').value)
        const postData = await fetch('http://localhost:4000/reg',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // отправляемые данные
            },
            body: bodyData,
        })
        if(postData.ok) {
            document.querySelector('.toIndex').click()

        } else {
            let errorData = await postData.json()
            if (errorData.errors) {
                const errorBlock = document.querySelector('.errorBlock')
                errorBlock.classList.remove('d-none')
                errorBlock.innerHTML = ''
                errorData.errors.forEach(el => {
                    let addedError = document.createElement('div')
                    addedError.innerHTML = "<div class=\"alert alert-danger\" role=\"alert\">\n" +
                        "        <b>" + el.msg + "</b>\n" +
                        "    </div>"
                    errorBlock.appendChild(addedError)
                    //document.querySelector(`input[name="${el.param}"]`).classList.add('bg-warning')
                })

            }

        }

    })
}

