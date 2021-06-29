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

// init
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
    const idx = e.target.closest('li').dataset.id;
    toggleCompleteTask(idx);
    updateBoardIfNoTasksInFilter();
    setLocalStorage('vite-todo', tasks);
  }

  if (e.target.id === 'delete') {
    if (confirm('確定刪除？')) {
      const idx = e.target.closest('li').dataset.id;
      deleteTask(idx);
    }
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
}

function getTaskHTML(id) {
  return `
    <li class="flex items-center group" data-id="${id}">
      <label class="px-3 py-4 cursor-pointer">
        <input id="check" class="-mt-1" type="checkbox"
        ${tasks[id].completed ? ' checked' : ''}>
      </label>
      <div class="ml-1 flex-grow cursor-text
        border-b-2 border-gray-100 focus:outline-none
        ${tasks[id].completed ? ' line-through text-gray-300 filter grayscale' : ''}
        ${!tasks[id].task.includes(' ') ? ' break-all' : ''}
        overflow-x-hidden"
        style="padding: 18px 0;"
      >
        ${tasks[id].task}
      </div>
      <button id="delete" class="ml-2 px-3 py-4 text-2xl text-gray-400
        lg:text-transparent lg:group-hover:text-gray-400
        focus:outline-none transition duration-75"
      >
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
  return filterEls.find(el => el.classList.contains('filter-active')).textContent;
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

function toggleCompleteTask(idx) {
  tasks[idx].completed = !tasks[idx].completed;
}

function deleteTask(idx) {
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
