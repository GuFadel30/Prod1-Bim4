// Abrir Modal
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fechar Modal
function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Limpar formulário
    document.getElementById('loginForm').reset();
    document.getElementById('loginMessage').className = '';
    document.getElementById('loginMessage').textContent = '';
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLoginModal();
    }
}

// Fechar modal com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLoginModal();
    }
});

// Validar e processar login
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('loginMessage');

    // Validação simples
    if (username === '' || password === '') {
        showMessage('Por favor, preencha todos os campos', 'error');
        return;
    }

    if (username.length < 3) {
        showMessage('Nome de usuário deve ter pelo menos 3 caracteres', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Senha deve ter pelo menos 6 caracteres', 'error');
        return;
    }

    // Credenciais de exemplo (em produção, isso seria validado no servidor)
    const validUsername = 'admin';
    const validPassword = '123456';

    // Simular delay de processamento
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Entrando...';

    setTimeout(() => {
        if (username === validUsername && password === validPassword) {
            showMessage('✓ Login realizado com sucesso!', 'success');
            
            // Fechar modal após 1.5s
            setTimeout(() => {
                closeLoginModal();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        } else {
            showMessage('✗ Nome de usuário ou senha incorretos', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }, 800);
}

// Exibir mensagem de sucesso/erro
function showMessage(message, type) {
    const messageDiv = document.getElementById('loginMessage');
    messageDiv.textContent = message;
    messageDiv.className = 'login-message ' + type;
}

// Permitir login ao pressionar Enter
document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                handleLogin(event);
            }
        });
    }
});
