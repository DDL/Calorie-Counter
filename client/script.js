'use strict';

var inputField = document.querySelector('.input-text');
var addButton = document.querySelector('.add-button');
var todoContainer = document.querySelector('.todo-container');
var local = 'http://localhost:3000';


function createOneNewTodo(meal) {
  var newLi = document.createElement('li');
  var newDiv = document.createElement('div');
  newDiv.setAttribute('id', 't' + meal.id);
  newDiv.classList.add('text');
  newDiv.textContent = meal.text;
  newLi.setAttribute('id', 'l' + meal.id);
  newLi.appendChild(newDiv);
  todoContainer.appendChild(newLi);
  var newDivForButtons = document.createElement('div');
  newLi.appendChild(newDivForButtons);

  createDelButton(newDivForButtons, meal);
  createcheckButton(newDivForButtons, meal);
}


function createAllTodos(input) {
  input.forEach(function(meal) {
    createOneNewTodo(meal);
  })
}

function getTodos() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', local);
  xhr.setRequestHeader('content-type', 'application/json; charset=utf-8');
  xhr.onload = function() {
    var response = JSON.parse(xhr.response);
    createAllTodos(response);
    };
  xhr.send();
}
getTodos();

function addTodo() {
  var xhr = new XMLHttpRequest();
  var endPoint = '/meal'
  xhr.open('POST', local);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  var textToSend = JSON.stringify({ text: inputField.value });
  xhr.onload = function() {
    var response = JSON.parse(xhr.response);
    createOneNewTodo(response);
  };
  xhr.send(textToSend);

  };


addButton.addEventListener('click', addTodo);


function createDelButton(parent, meal) {
  var del = document.createElement('button');
  del.classList.add('del-button');
  del.setAttribute('id', 'd' + meal.id);
  parent.appendChild(del);
  del.addEventListener('click', function(event){
    delTodo(event, del.id);
  console.log(event);
  console.log(del.id);
  });
}

function deleteLi(event){
  var ul = document.querySelector('ul');
  var itemToDel = document.querySelector('#l' + event.target.id.slice(1,10));
  ul.removeChild(itemToDel);
}

function delTodo(event, delId) {
  var xhr = new XMLHttpRequest();
  var serverId = delId.slice(1,10);
  var endPoint = '/todos/' + serverId;
  xhr.open('DELETE', local + '/' + serverId);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  xhr.onload = function() {
    deleteLi(event);
  };
  xhr.send();
}

function createcheckButton(parent, meal) {
  var check = document.createElement('button');
  if (todo.completed) {
    check.classList.add('checked-button');
  } else {
    check.classList.add('unchecked-button');
  }
  parent.appendChild(check);
  check.setAttribute('id', 'c' + meal.id);
  console.log(check);
  console.log(check.id);
  check.addEventListener('click', function(event){
    checkTodo(event, check.id);
  });
}

function changeUncheckToCheckImg(input) {
  input.classList.remove('unchecked-button');
  input.classList.add('checked-button');
}


function checkLi(event){
  var buttons = document.querySelectorAll('.unchecked-button');
  for (var i = 0; i <= buttons.length - 1; i++) {
    if ((buttons[i]).id === event.target.id) {
      changeUncheckToCheckImg(buttons[i]);
    }
  }
}

function getText(input, serverId){
  var divs = document.querySelectorAll('.text');
  for (var i = 0; i <= divs.length - 1; i++) {
    if ((divs[i]).id === input.id) {
      return (divs[i]).textContent;
    }
  }
}

function checkTodo(event, checkId) {
  var xhr = new XMLHttpRequest();
  var serverId = checkId.slice(1,10);
  var endPoint = '/meal/' + serverId;
  var item = document.querySelector('#t' + serverId);
  var textToSend = JSON.stringify({ text: getText(item, serverId), completed: true });
  xhr.open('PUT', local + '/' + serverId);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  xhr.onload = function() {
    checkLi(event);
  };
  xhr.send(textToSend);
}
