const userList = document.getElementById('userList');
const loadBtn = document.getElementById('loadBtn');

loadBtn.addEventListener('click', async () => {
  userList.innerHTML = 'Loading users...';
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const users = await response.json();
    userList.innerHTML = '';
    
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.className = 'user';
      userDiv.innerHTML = `<strong>${user.name}</strong><br>${user.email}`;
      userList.appendChild(userDiv);
    });
  } catch (error) {
    userList.innerHTML = `<p style="color: red;">⚠️ Failed to load users: ${error.message}</p>`;
  }
});
