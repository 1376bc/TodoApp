class TodoList {
    constructor() {
        // 检查是否已登录
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }
        
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.taskInput = document.getElementById('taskInput');
        this.addTaskBtn = document.getElementById('addTask');
        this.taskList = document.getElementById('taskList');

        // 添加背景设置相关元素
        this.settingsBtn = document.getElementById('settingsBtn');
        this.bgInput = document.getElementById('bgInput');
        
        // 从 localStorage 加载保存的背景
        this.loadBackground();
        
        // 初始化设置功能
        this.initSettings();

        this.init();
    }

    init() {
        // 绑定事件
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // 初始化显示任务
        this.renderTasks();
    }

    initSettings() {
        this.settingsBtn.addEventListener('click', () => this.bgInput.click());
        this.bgInput.addEventListener('change', (e) => this.changeBackground(e));
    }

    changeBackground(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const bgUrl = e.target.result;
                document.body.style.backgroundImage = `url(${bgUrl})`;
                // 保存背景图片到 localStorage
                localStorage.setItem('todoBg', bgUrl);
            };
            reader.readAsDataURL(file);
        }
    }

    loadBackground() {
        const savedBg = localStorage.getItem('todoBg');
        if (savedBg) {
            document.body.style.backgroundImage = `url(${savedBg})`;
        }
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        if (taskText) {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            this.tasks.push(task);
            this.saveTasks();
            this.renderTasks();
            this.taskInput.value = '';
        }
    }

    toggleTask(id) {
        this.tasks = this.tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    renderTasks() {
        this.taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `todo-item ${task.completed ? 'completed' : ''}`;
            
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="todo-text">${task.text}</span>
                <button class="delete-btn">删除</button>
            `;

            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => this.toggleTask(task.id));

            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

            this.taskList.appendChild(li);
        });
    }
}

// 初始化应用
new TodoList(); 