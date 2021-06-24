'use strict';

const taskInputEl = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('#add-task');
const filtersEl = document.querySelector('#filters');
const filterEls = [...filtersEl.childNodes].filter(
  el => !el.nodeName.includes('#')
);
const tasksEl = document.querySelector('#tasks');
const unfinishedTaskNumEl = document.querySelector('#unfinished-task-num');
const clearFinishedTasksBtn = document.querySelector('#clear-finished-tasks');

let tasks = getLocalStorage('vite-todo') || [
  {
    task: '把冰箱發霉的檸檬拿去丟',
    completed: false,
  },
  {
    task: '打電話叫媽媽匯款給我',
    completed: true,
  },
  {
    task: '整理電腦資料夾',
    completed: false,
  },
  {
    task: '繳電費水費瓦斯費',
    completed: true,
  },
  {
    task: '刪訊息',
    completed: false,
  },
  {
    task: '約 Vicky 禮拜三泡溫泉',
    completed: false,
  },
  {
    task: '約 Ada 禮拜四吃晚餐',
    completed: false,
  },
];

updateTasks();
updateUnfinishedTaskNum();

// Add task
taskInputEl.onkeydown = e => {
  if (e.key === 'Enter') {
    let filter = getCurrentFilter();
    if (filter === '已完成') filter = '全部';
    addTask();
    updateBoard(filter);
    setLocalStorage('vite-todo', tasks);
  }
};

addTaskBtn.onclick = () => {
  let filter = getCurrentFilter();
  if (filter === '已完成') filter = '全部';
  addTask();
  updateBoard(filter);
  setLocalStorage('vite-todo', tasks);
};

// Update filter state/tasks
filtersEl.onclick = e => {
  if (e.target.classList.contains('filter-inactive')) {
    const filter = e.target.textContent;
    updateBoard(filter);
  }
};

// Toggle done and delete
tasksEl.onclick = e => {
  if (e.target.id === 'check') {
    toggleCompleteTask(e);
    updateBoardIfNoTasksInFilter();
    setLocalStorage('vite-todo', tasks);
  }

  if (e.target.id === 'delete') {
    if (confirm('確定刪除？')) deleteTask(e);
    updateBoardIfNoTasksInFilter();
    if (tasks.length) return setLocalStorage('vite-todo', tasks);
    removeFromLocalStorage('vite-todo');
  }
};

// Clear finished
clearFinishedTasksBtn.onclick = () => {
  if (confirm('確定移除完成的任務？')) {
    clearFinishedTasks();
    if (getCurrentFilter() === '已完成') updateFilterState();
    updateTasks();
    if (tasks.length) return setLocalStorage('vite-todo', tasks);
    removeFromLocalStorage('vite-todo');
  }
};

/////////////////////////////////////////////////////////////////////////
/////////////////////////////// Functions ///////////////////////////////
/////////////////////////////////////////////////////////////////////////

function updateBoardIfNoTasksInFilter() {
  let filter = getCurrentFilter();

  if (
    (filter === '待完成' && !getUnfinishedTaskNum()) ||
    (filter === '已完成' && getUnfinishedTaskNum() === tasks.length)
  )
    filter = '全部';

  updateBoard(filter);
}

function updateBoard(filter = '全部') {
  updateFilterState(filter);
  updateTasks(filter);
  updateUnfinishedTaskNum();
}

function updateTasks(filter = '全部') {
  let tasksHTML = '';

  for (const i in tasks) {
    if (filter === '全部') tasksHTML += getTaskHTML(i);
    if (filter === '待完成') {
      if (!tasks[i].completed) tasksHTML += getTaskHTML(i);
    }
    if (filter === '已完成') {
      if (tasks[i].completed) tasksHTML += getTaskHTML(i);
    }
  }

  tasksEl.innerHTML = tasksHTML;
  taskInputEl.focus();
}

function getTaskHTML(id) {
  return `
    <li id="${id}" class="flex items-center group">
      <input id="check" class="ml-3" type="checkbox"${
        tasks[id].completed ? ' checked' : ''
      }>
      <label for="check" class="ml-4 flex-grow cursor-text
        border-b-2 border-gray-100 focus:outline-none
        ${tasks[id].completed ? ' text-gray-300 line-through' : ''}
        ${!tasks[id].task.includes(' ') ? ' break-all' : ''}"
        style="padding: 18px 0;"
      >
        ${tasks[id].task}
      </label>
      <button id="delete" class="ml-2 p-3 text-2xl text-gray-400 lg:text-transparent lg:group-hover:text-gray-400 focus:outline-none transition duration-75">
        ✕
      </button>
    </li>
  `;
}

function updateFilterState(filter = '全部') {
  filterEls.forEach(el => {
    if (el.textContent === filter) {
      el.classList.remove('filter-inactive');
      el.classList.add('filter-active');
    } else {
      el.classList.remove('filter-active');
      el.classList.add('filter-inactive');
    }
  });
}

function getCurrentFilter() {
  return filterEls.filter(el => el.classList.contains('filter-active'))[0]
    .textContent;
}

function updateUnfinishedTaskNum() {
  unfinishedTaskNumEl.textContent = getUnfinishedTaskNum();
}

function getUnfinishedTaskNum() {
  return tasks.filter(task => !task.completed).length;
}

function addTask() {
  const inputText = taskInputEl.value.trim();
  if (!inputText) return (taskInputEl.value = '');
  tasks = [...tasks, { task: inputText, completed: false }];
  taskInputEl.value = '';
}

function toggleCompleteTask(e) {
  const idx = e.target.closest('li').id;
  tasks[idx].completed = !tasks[idx].completed;
}

function deleteTask(e) {
  const idx = e.target.closest('li').id;
  tasks.splice(idx, 1);
}

function clearFinishedTasks() {
  tasks = tasks.filter(task => !task.completed);
}

function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}
