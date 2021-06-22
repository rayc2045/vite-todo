'use strict';

const taskInputEl = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('#add-task');
const tasksEl = document.querySelector('#tasks');
const unfinishedTaskNumEl = document.querySelector('#unfinished-task-num');
const clearFinishedTasksBtn = document.querySelector('#clear-finished-tasks');
const tasks = [
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

updateTask();

/////////////////////////////////////////////////////////////////////////
/////////////////////////////// Functions ///////////////////////////////
/////////////////////////////////////////////////////////////////////////

function updateTask() {
  let tasksHTML = '';
  let unfinishedTaskNum = 0;

  tasks.forEach((task, idx) => {
    tasksHTML += getTaskHTML(idx);
    if (!task.completed) unfinishedTaskNum++;
  });

  tasksEl.innerHTML = tasksHTML;
  unfinishedTaskNumEl.textContent = unfinishedTaskNum;
}

function getTaskHTML(id) {
  return `
		<li id="${id}" class="flex items-center">
			<label>
				<input
					type="checkbox" ${tasks[id].completed ? 'checked' : ''}
					class="text-black bg:text-black cursor-pointer focus:outline-none"
				>
			</label>
			<span
				class="border-b-2 flex-grow cursor-text${
          tasks[id].completed ? ' text-gray-300 line-through' : ''
        } focus:outline-none"
				style="padding: 19px 0;"
				contentEditable>
				${tasks[id].task}
			</span>
			<button id="delete" class="text-gray-500 focus:outline-none">
				✕
			</button>
		</li>
	`;
}
