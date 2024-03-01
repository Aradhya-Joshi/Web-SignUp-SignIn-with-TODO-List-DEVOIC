// localStorage.clear();

var toggleSignUp = true;

const form = document.getElementById('signup-form');


let auth = JSON.parse(localStorage.getItem("auth")) || [] ;
console.log(auth);

form.addEventListener('click',function(event){
  
  if (event.target.getAttribute('title') === 'toggle') {
    event.preventDefault();
  
    toggleSignUp = !toggleSignUp;
  
    const formHead = document.querySelector('#signup-form h2');
    formHead.textContent = toggleSignUp ? 'Sign Up' : 'Log In';
  
    const togglebtn = document.querySelector('#signup-form button');
    togglebtn.textContent = toggleSignUp ? 'Already have an account, Log In' : 'Don\'t have an account, Sign Up';
  
  
    console.log(toggleSignUp);
  }
})


form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  const user = auth.find(user => user.username === username);
  
  if (toggleSignUp) {
    // If signing up
    if (user) {
      alert('Username already exists. Please choose a different username.');
      return;
    }
  
    auth.push({ username: username, password: password });
    localStorage.setItem('auth', JSON.stringify(auth));
    alert('Sign up successful!');
  } else {
    // If logging in
    if (!user) {
      alert('Username does not exist. Please sign up first.');
      return;
    }
  
    if (user.password !== password) {
      alert('Incorrect password. Please try again.');
      return;
    }
  
    alert('Log in successful!');
  }
  
  window.location.href = 'index_todo.html';
}

);



