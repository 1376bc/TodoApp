class Auth {
    constructor() {
        this.form = document.querySelector('form');
        this.initializeForm();
    }

    initializeForm() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.form.id === 'loginForm') {
                this.handleLogin();
            } else {
                this.handleRegister();
            }
        });
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // 从 localStorage 获取用户数据
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            alert('邮箱或密码错误！');
        }
    }

    handleRegister() {
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('两次输入的密码不一致！');
            return;
        }

        // 获取现有用户
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // 检查邮箱是否已被注册
        if (users.some(u => u.email === email)) {
            alert('该邮箱已被注册！');
            return;
        }

        // 添加新用户
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        alert('注册成功！');
        window.location.href = 'login.html';
    }
}

// 初始化认证
new Auth(); 