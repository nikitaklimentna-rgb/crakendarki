function addFriend() {
    const friendEmail = document.getElementById('friendEmail').value;
    const userEmail = document.getElementById('email').value; // Получаем email пользователя

    fetch('/add-friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, friendEmail })
    })
    .then(response => {
        if (response.ok) {
            alert('Пользователь добавлен в друзья.');
            getFriendsList(); // Обновляем список друзей
        } else {
            response.text().then(text => alert(text));
        }
    });
}

function getFriendsList() {
    const userEmail = document.getElementById('email').value;

    fetch(`/friends/${userEmail}`)
    .then(response => response.json())
    .then(friends => {
        const friendsListContainer = document.getElementById('friendsList');
        friendsListContainer.innerHTML = '';

        friends.forEach(friend => {
            const li = document.createElement('li');
            li.textContent = friend.email + (friend.online ? ' (Онлайн)' : ' (Оффлайн)');
            
            // Кнопка для удаления друга
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
            removeButton.onclick = () => removeFriend(friend.email);

            li.appendChild(removeButton);
            friendsListContainer.appendChild(li);
        });
    });
}

function removeFriend(friendEmail) {
    const userEmail = document.getElementById('email').value;

    fetch('/remove-friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, friendEmail })
    })
    .then(response => {
        if (response.ok) {
            alert('Пользователь удален из друзей.');
            getFriendsList(); // Обновляем список друзей
        } else {
            response.text().then(text => alert(text));  
        }
    });
}

function updateStatus(online) {
    const userEmail = document.getElementById('email').value;

    fetch('/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, online })
    })
    .then(response => {
        if (response.ok) {
            console.log('Статус обновлен.');
        } else {
            response.text().then(text => alert(text));
        }
    });
}

// Пример вызова для обновления статуса, например, когда пользователь заходит или уходит с сайта
window.onfocus = () => updateStatus(true);
window.onblur = () => updateStatus(false);