// Cadastro Script
if (document.getElementById('cadastroForm')) {
  document.getElementById('cadastroForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const nome = document.getElementById('nome').value;
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;
      const foto = document.getElementById('foto').files[0];

      const reader = new FileReader();
      reader.onloadend = function () {
          const fotoData = reader.result;
          const usuario = { nome, email, senha, foto: fotoData };
          localStorage.setItem('usuario', JSON.stringify(usuario));
          alert('Cadastro realizado com sucesso!');
          window.location.href = 'Entrar.html';
      };
      if (foto) {
          reader.readAsDataURL(foto);
      } else {
          const usuario = { nome, email, senha, foto: null };
          localStorage.setItem('usuario', JSON.stringify(usuario));
          alert('Cadastro realizado com sucesso!');
          window.location.href = 'Entrar.html';
      }
  });
}

// Login Script
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const senha = document.getElementById('senha').value;

      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (usuario && usuario.email === email && usuario.senha === senha) {
          localStorage.setItem('loggedUser', JSON.stringify(usuario));
          alert('Login realizado com sucesso!');
          window.location.href = 'index.html';
      } else {
          alert('Email ou senha incorretos!');
      }
  });
}

// Navbar Script
if (document.getElementById('user-info')) {
  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  if (loggedUser) {
      const userInfo = document.getElementById('user-info');
      const userPhoto = document.getElementById('user-photo');
      const userName = document.getElementById('user-name');

      userPhoto.src = loggedUser.foto ? loggedUser.foto : 'img/default-avatar.png';
      userName.textContent = loggedUser.nome;
      userInfo.classList.remove('d-none');
  }
}

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.reservar-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Evita o comportamento padrão do link

            const statusBadge = this.parentElement.querySelector('.status');
            const status = statusBadge.textContent.trim();

            if (status === 'Disponível') {
                statusBadge.textContent = 'Reservado';
                statusBadge.classList.remove('bg-success');
                statusBadge.classList.add('bg-danger', 'status-reservado');
                this.textContent = 'Reservado';
                this.classList.remove('btn-primary');
                this.classList.add('btn-secondary');
                this.removeEventListener('click', arguments.callee); // Remove o evento do botão
            }
        });
    });
});
