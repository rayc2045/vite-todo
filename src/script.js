'use strict';

const taskInputEl = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('#add-task');
const filtersEl = document.querySelector('#filters');
const filterEls = [...filtersEl.childNodes].filter(el => el.nodeName === 'LI');
const tasksEl = document.querySelector('#tasks');
const unfinishedTaskNumEl = document.querySelector('#unfinished-task-num');
const clearFinishedTasksBtn = document.querySelector('#clear-finished-tasks');
let tasks = [
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
    addTask();
    updateTasks();
    updateUnfinishedTaskNum();
  }
};

addTaskBtn.onclick = () => {
  addTask();
  updateTasks();
  updateUnfinishedTaskNum();
};

// Update filter state/tasks
filtersEl.onclick = e => {
  if (e.target.classList.contains('filter-inactive')) {
    const filter = e.target.textContent;
    updateFilterState(filter);
    updateTasks(filter);
  }
};

/////////////////////////////////////////////////////////////////////////
/////////////////////////////// Functions ///////////////////////////////
/////////////////////////////////////////////////////////////////////////

function updateTasks(filter = '全部') {
  let tasksHTML = '';

  if (filter === '全部') {
    for (const i in tasks) tasksHTML += getTaskHTML(i);
  }

  if (filter === '待完成') {
    for (const i in tasks) {
      if (!tasks[i].completed) tasksHTML += getTaskHTML(i);
    }
  }

  if (filter === '已完成') {
    for (const i in tasks) {
      if (tasks[i].completed) tasksHTML += getTaskHTML(i);
    }
  }

  tasksEl.innerHTML = tasksHTML;
}

function getTaskHTML(id) {
  return `
		<li id="${id}" class="flex items-center">
			<label class="ml-3">
				<input id="check" class="mt-1 w-6 h-6 cursor-pointer focus:outline-none" type="checkbox" ${
          tasks[id].completed ? 'checked' : ''
        }>
			</label>
			<span id="content" class="ml-4 border-b-2 flex-grow cursor-text border-gray-100 focus:outline-none ${
        tasks[id].completed ? ' text-gray-300 line-through' : ''
      }" style="padding: 18px 0;">
				${tasks[id].task}
			</span>
			<button id="delete" class="ml-2 p-3 text-2xl text-gray-400 focus:outline-none ">
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

function updateUnfinishedTaskNum() {
  unfinishedTaskNumEl.textContent = tasks.filter(
    task => !task.completed
  ).length;
}

function addTask() {
  const inputText = taskInputEl.value.trim();
  if (!inputText) return;
  tasks = [...tasks, { task: inputText, completed: false }];
  taskInputEl.value = '';
  taskInputEl.focus();
}
