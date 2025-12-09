// utilitaires simples utilisateurs
function getCurrentUser(){
  return users.find(u=>u.isLogged) || null;
}

function setLoggedState(userId, state){
  const u = users.find(x=>x.id===userId);
  if(u) u.isLogged = !!state;
  updateLoginButton();
}

function updateLoginButton(){
  const btn = document.getElementById('btn-login');
  if(!btn) return;
  const u = getCurrentUser();
  if(u){
    btn.textContent = 'Logout';
    btn.dataset.view = 'logout';
    btn.setAttribute('data-logged','1');
  } else {
    btn.textContent = 'Login';
    btn.dataset.view = 'login';
    btn.removeAttribute('data-logged');
  }
}
