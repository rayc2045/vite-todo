'use strict';

const taskContentEl = document.querySelector('#task-content');
const taskNumEl = document.querySelector('#task-num');
const tasks = [
  {
    content: '把冰箱發霉的檸檬拿去丟',
    completed: false,
  },
  {
    content: '打電話叫媽媽匯款給我',
    completed: true,
  },
  {
    content: '整理電腦資料夾',
    completed: false,
  },
  {
    content: '繳電費水費瓦斯費',
    completed: true,
  },
  {
    content: '刪訊息',
    completed: false,
  },
  {
    content: '約 Vicky 禮拜三泡溫泉',
    completed: false,
  },
  {
    content: '約 Ada 禮拜四吃晚餐',
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

  taskContentEl.innerHTML = tasksHTML;
  taskNumEl.textContent = unfinishedTaskNum;
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
				${tasks[id].content}
			</span>
			<button id="delete" class="text-gray-500 focus:outline-none">
				✕
			</button>
		</li>
	`;
}
