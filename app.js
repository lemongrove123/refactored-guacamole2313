const deadlineContainer=document.querySelector('#deadlines');
const daysContainer=document.querySelector('#days');
const scheduleContainer=document.querySelector('#schedule');
const todayTasks=document.querySelector('#todayTasks');
const today=[['Read and annotate two sources','45 minutes','COMM 210'],['Draft thesis statement','25 minutes','COMM 210'],['Review chapter 8 flashcards','30 minutes','PSYC 201']];

plannerData.deadlines.forEach(([course,title,due,accent])=>deadlineContainer.insertAdjacentHTML('beforeend',`<article class="deadline"><i class="dot ${accent}"></i><div class="course">${course}</div><h3>${title}</h3><div class="due">${due}</div></article>`));
plannerData.days.forEach(([name,date],index)=>daysContainer.insertAdjacentHTML('beforeend',`<div class="day ${index===0?'today':''}"><small>${name}</small><b>${date}</b></div>`));
plannerData.schedule.forEach(day=>scheduleContainer.insertAdjacentHTML('beforeend',`<div class="column">${day.map(([color,title,time])=>`<div class="task ${color}">${title}<small>${time}</small></div>`).join('')}</div>`));
function renderToday(){todayTasks.innerHTML=today.map(([name,time,course])=>`<label class="today-task"><input class="task-check" type="checkbox"><span class="task-copy">${name}<small>${time}</small></span><span class="task-tag">${course}</span></label>`).join('');todayTasks.querySelectorAll('.task-check').forEach(box=>box.onchange=updateCount)}
function updateCount(){document.querySelector('#completeCount').textContent=4+[...todayTasks.querySelectorAll(':checked')].length}
renderToday();
const catchupModal=document.querySelector('#modal'),taskModal=document.querySelector('#taskModal'),toast=document.querySelector('#toast');
document.querySelector('#catchupBtn').onclick=()=>catchupModal.classList.add('open');
document.querySelector('#close').onclick=()=>catchupModal.classList.remove('open');
document.querySelector('#apply').onclick=()=>{catchupModal.classList.remove('open');const button=document.querySelector('#catchupBtn');button.textContent='Catch-up plan applied';button.style.background='#16705b';showToast('Your week has been rebalanced.')};
document.querySelector('#addTask').onclick=()=>taskModal.classList.add('open');
document.querySelector('#taskCancel').onclick=()=>taskModal.classList.remove('open');
document.querySelector('#taskForm').onsubmit=event=>{event.preventDefault();today.push([document.querySelector('#taskName').value,document.querySelector('#taskDuration').value,'PERSONAL']);renderToday();taskModal.classList.remove('open');event.target.reset();showToast('Task added to your plan.')};
document.querySelector('#startFocus').onclick=()=>showToast('Focus session started. You have got this.');
document.querySelector('#importBtn').onclick=()=>showToast('Syllabus import is ready for your file.');
function showToast(message){toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2800)}
[catchupModal,taskModal].forEach(modal=>modal.onclick=event=>{if(event.target===modal)modal.classList.remove('open')});
