
const addList = document.querySelector('.plus');

const main = document.querySelector('.main__container');
const brush = document.querySelector('.del');
const listHero = document.querySelector('.list__hero');
const searchElement = document.querySelector(`.header__search-input`);
const findElement = document.querySelector(`.header__search-btn`);
const header = document.querySelector(`.header`);
const footer = document.querySelector(`.footer__container`);
const saveComplitedList = document.querySelector(`.footer__save`);
const footerCheckSave = document.querySelector(`.footer__save-new`);

let id = 0;
let idList = 0;
let z = 1;
let idItems = 0;
let keyPressVariable;
let btnText;
let editVar;
let statusBtn;

addEventListener('DOMContentLoaded', function (e) {
   addEventListener('click', function (e) {
      if (e.target.closest('.list__title-edit-bg')) {
         if (e.target.closest('.list__title-edit.edit')) {
            document.querySelectorAll(`.edit, .focus`).forEach((editElement) => {
               if (editElement.classList.contains('edit')) { editElement.classList.remove('edit') };
               if (editElement.classList.contains('focus')) { editElement.classList.remove('focus') };
            })
            e.target.parentNode.classList.add('edit');
            let h2 = e.target.parentNode.dataset.idlist;
            document.getElementById(`${h2}-title`).classList.add('focus')
         } else {
            e.target.parentNode.classList.remove('edit')
         }
      } else {
         if (e.target.closest('.list__title-image-bg')) {
            document.querySelectorAll(`.edit, .focus`).forEach((titleBeforeEditElement) => {
               if (titleBeforeEditElement.classList.contains('list__title-edit') || titleBeforeEditElement.classList.contains('list__title-image')) {
                  titleBeforeEditElement.classList.remove('edit')
               }
               if ((titleBeforeEditElement.classList.contains('list__check') || titleBeforeEditElement.classList.contains('list__title')) && !titleBeforeEditElement.classList.contains('header__search')) {
                  titleBeforeEditElement.classList.remove('focus')
               }
            })
            e.target.parentNode.classList.add('edit')
            document.getElementById(`${e.target.dataset.id}text`).classList.add('focus')
         } else {
            document.querySelectorAll(`.edit, .focus`).forEach((editElement) => {
               if (e.target.closest('.list__addNewElement')) {
                  if (editElement.classList.contains('edit') && !editElement.classList.contains('no-edit')) {
                     editElement.classList.remove('edit')
                  }
               } else {
                  if (editElement.classList.contains('edit')) {
                     editElement.classList.remove('edit')
                  }
                  if (editElement.classList.contains('focus') && !editElement.classList.contains('header__search')) {
                     editElement.classList.remove('focus')
                  }
               }
            })
         }
      }

      if (e.target.classList.contains('header__search') || e.target.classList.contains('header__search-img') || e.target.classList.contains('header__search-input-content')) {
         if (searchElement.parentNode.parentNode.classList.contains('focus')) {
            blurSearch()
         }
         searchElement.parentNode.parentNode.classList.toggle('focus');
         if (searchElement.parentNode.parentNode.classList.contains('focus')) {
            searchElement.focus();
         }
      }
      if (!e.target.closest('.header__search') && !e.target.closest('.header__search-input-content')) {
         if (window.innerWidth <= 1023.98) {
            blurSearch();
            searchElement.parentNode.parentNode.classList.remove('focus')
         }
      }
      if (e.target.closest('.footer__save') || e.target.classList.contains('footer__save-img')) {
         if (e.target.closest('.footer__save-new') || e.target.closest('.footer__save-img')) {
            if (e.target == document.querySelector(`.footer__save-path`)) {
               document.querySelector(`.footer__save`).classList.toggle('open')
            } else {
               e.target.parentNode.classList.toggle('open')
            }
            if (document.querySelector(`.footer__save`).classList.contains('open')) {
               header.classList.add('zIndex')
               main.classList.add('zIndex')
               document.querySelector(`.footer`).classList.add('open')
               document.querySelector(`.footer__save__cont`).classList.add('open')
            } else {
               header.classList.remove('zIndex')
               main.classList.remove('zIndex')
               document.querySelector(`.footer`).classList.remove('open')
               document.querySelector(`.footer__save__cont`).classList.remove('open')
            }

         } else {
            e.target.classList.toggle('open')
            if (e.target.classList.contains('open')) {
               header.classList.add('zIndex')
               main.classList.add('zIndex')
            } else {
               header.classList.remove('zIndex')
               main.classList.remove('zIndex')

            }
         }
      }

      // Закриття статусу пунку стікера
      if (statusBtn) {
         if (statusBtn.dataset.id != e.target.dataset.id) {
            if (!statusBtn.classList.contains('close')) {
               statusBtn.classList.add('close')
            }
         }
      }
      if (e.target.classList.contains('select-list__current-value')) {
         statusBtn = e.target.parentNode.parentNode
      }

      if (e.target == findElement) {
         let searchElement = document.querySelectorAll(`.search`);
         if (searchElement[0]) {
            searchElement[0].scrollIntoView({ behavior: 'smooth', block: 'center' })
         }
      }

   })
   if ((localStorage.getItem('articlesData') != '') || localStorage.getItem('articlesDataSave') != '') {
      const beforeItems = JSON.parse(localStorage.getItem('articlesData'));
      if (beforeItems) {
         for (let i = 0; i < beforeItems.length; i++) {
            main.insertAdjacentHTML(
               'beforeend',
               `${beforeItems[i].htmlContent}`
            )
         }
      }
      const beforeItemsSave = JSON.parse(localStorage.getItem('articlesDataSave'));
      if (beforeItemsSave) {
         for (let i = 0; i < beforeItemsSave.length; i++) {
            footer.insertAdjacentHTML(
               'beforeend',
               `${beforeItemsSave[i].htmlContent}`
            )
         }
      }

      footerCheckSave.textContent = footer.children.length
      footerCheckSave.style.background = `rgb(${footerCheckSave.textContent + 129}, ${109 - footerCheckSave.textContent * 2}, ${211 - footerCheckSave.textContent * 2}, 0.6)`

      document.querySelectorAll('[data-label]').forEach((lab) => {
         if (lab.dataset.label) {
            lab.value = lab.dataset.label;
         }
      })
      document.querySelectorAll('.list__addNewElement').forEach((btn) => createNewElement(btn));
      document.querySelectorAll('.list__title-edit').forEach((btn) => input(btn));
      document.querySelectorAll('.list__title-image').forEach((btn) => {
         btn.addEventListener("click", function () {
            let list = document.getElementById(`${btn.dataset.id}`)
            if (list) {
               let h1 = document.getElementById(`${btn.dataset.id}text`);
               h1.classList.toggle("focus");
               if (h1.classList.contains('focus')) {
                  h1.focus();
               } else {
                  h1.blur();
               }
               btn.classList.toggle('edit')
               keyPressVariable = function (e) {
                  keyPress(btn.dataset.id, e)
               };
               h1.addEventListener('input', keyPressVariable)
            }
         }
         );
      });
      document.querySelectorAll('.list__button-del').forEach((btn) => {
         btn.addEventListener("click", function () {
            let list = document.getElementById(`${btn.dataset.id}`)
            if (list) {
               if (list.classList.contains('complited')) {
                  list.classList.remove('complited')
               }
               if (Number(btn.dataset.id % 2) == 0) {
                  list.classList.add('remove')
               } else {
                  list.classList.add('removeTwo')
               }
               setTimeout(function () {
                  list.remove();
               }, 900)
            }
         });
      });
      document.querySelectorAll('.list__button-complited').forEach((btn) => {
         buttonComplited(btn, e)
      });
      document.querySelectorAll('.list__button-lock').forEach((btn) => {
         btn.addEventListener('click', function () {
            let list = document.getElementById(`${btn.dataset.id}`);
            list.classList.toggle('lock')
         })
      })
      document.querySelectorAll('.label').forEach((lab) => {
         lab.addEventListener('click', function (e) {
            if (e.target.classList.contains('list__check-keydown')) {
               lab.classList.toggle('checked');
            }
         })
      })
      document.querySelectorAll('.list__delete').forEach((list) => {
         removeItemLine(list);
      })
      document.querySelectorAll('.select-list').forEach((stat) => {
         editStatusLine(stat)
      })

      idList += Number(localStorage.getItem('idList'));
      idItems += Number(localStorage.getItem('idItems'));
      id += Number(localStorage.getItem('id'));
   }
})

addList.addEventListener('click', function () {
   main.insertAdjacentHTML(

      'beforeend',
      `<article id="${id}" class="list" style="top: 0px; left: 0px; z-index: ${z + 1}">
               <div class="h1">
                  <textarea spellcheck="false" maxlength="100" type="text" data-label='' id="${id}text"
                     class="list__title" placeholder="Name"></textarea>
                  <div data-id="${id}" class="list__title-image new">
                     <div data-id="${id}" class="list__title-image-bg"></div>
                  </div>
               </div>
               <div id="${id}-hero" class="list__hero"></div>
               <div data-id="${id}" class="list__addNewElement new">
                  <span class='span'></span>
               </div>
               <div class="list__button-menu">
                  <button data-id="${id}" class="list__button list__button-del new"></button>
                  <button data-id="${id}" class="list__button list__button-complited new"></button>
                  <button data-id="${id}" class="list__button list__button-lock new"><svg fill="#000" height="240px"
                        width="240px" version="1.1" id="Layer_1" viewBox="0 0 330 330">
                        <g id="XMLID_509_">
                           <path id="XMLID_510_"
                              d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85
                        S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15
                        s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25
                        C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z" />
                        </g>
                     </svg>
                  </button>
               </div>
            </article>`

   );

   if (addList.classList.contains('new')) {
      addList.classList.remove('new')
      addEventListener('click', function (e) {
         document.querySelectorAll('.list__addNewElement').forEach((btn) => {
            if (btn.classList.contains("new")) {
               btn.classList.remove('new');
               createNewElement(btn, e)
            }
         });
         document.querySelectorAll('.list__button-del').forEach((btn) => { buttonRemove(btn, e) });
         document.querySelectorAll('.list__button-complited').forEach((btn) => {
            if (btn.classList.contains('new')) {
               btn.classList.remove('new')
               buttonComplited(btn, e)
            }
         });
         document.querySelectorAll('.list__title-image').forEach((btn) => { buttonTitleEdit(btn, e) });
         document.querySelectorAll('.list__button-lock').forEach((btn) => {
            if (btn.classList.contains('new')) {
               btn.classList.remove('new')
               btn.addEventListener('click', function () {
                  let list = document.getElementById(`${btn.dataset.id}`);
                  list.classList.toggle('lock')
               })
            }
         })
      });
   }
   id += 1;
});
brush.addEventListener("dblclick", del)

function start() {

}

function del() {
   let listCount = document.querySelectorAll('.list').length;
   document.querySelectorAll('.lock').forEach(() => {
      listCount -= 1;
   })
   document.querySelectorAll('.list').forEach((list) => {
      if (!list.classList.contains('lock')) {
         if (Number(list.id) % 2 == 0) {
            list.classList.add('removeAll')
         } else {
            list.classList.add('removeTwoAll')
         }
         setTimeout(function () {
            list.remove();
            footerCheckSave.textContent = footer.children.length
            footerCheckSave.style.background = `rgb(${footerCheckSave.textContent + 129}, ${109 - footerCheckSave.textContent * 2}, ${211 - footerCheckSave.textContent * 2}, 0.6)`
         }, (800 + (100 * listCount)))
      }
   })
}

function blurSearch() {
   document.querySelectorAll(`.list`).forEach((list) => {
      if (list && list.classList.contains('search')) {
         list.classList.remove('search')
         list.style.zIndex = `${z}`;
      }
   })
   setTimeout(function () {
      searchElement.value = '';
   }, 200)
   searchElement.blur();
}

function editHidden(btn, e, editVar) {
   if (!e.target.classList.contains('list__addNewElement') && !e.target.classList.contains('span')) {
      if (`${btn.dataset.idlist}` != `${e.target.dataset.idlist}`) {
         if (btn.classList.contains('edit')) {
            btn.classList.remove('edit')
            let h1 = document.getElementById(`${btn.dataset.idlist}-title`);
            h1.classList.remove("focus");
            h1.blur();
            removeEventListener('click', editVar)
         }
      } else if (e.target.classList.contains('list__button')) {
         if (btn.classList.contains('edit')) {
            btn.classList.remove('edit')
            let h1 = document.getElementById(`${btn.dataset.idlist}-title`);
            h1.classList.remove("focus");
            h1.blur();
            removeEventListener('click', editVar)
         }
      }
   } if (e.target.classList.contains(e.target.classList.contains('list__addNewElement')) || e.target.classList.contains('span')) {
      setTimeout(function () { removeEventListener('click', editVar) }, 200000);
   }
}


function removeItemLine(list) {
   if (list) {
      list.addEventListener('click', function () {
         let item = document.getElementById(`${list.dataset.id}`);
         item.classList.add('remove')
         setTimeout(function () {
            item.remove();
         }, 650)
      });
   }
}

// Функція для заголовка
function keyPress(id, e) {
   e.preventDefault();
   const h1 = document.getElementById(`${id}text`);
   h1.style.height = 'auto';
   h1.style.height = h1.scrollHeight + 'px';
   h1.dataset.label = h1.value;
   document.querySelectorAll('.list__title-image').forEach((btn) => {
      if ((btn.dataset.id == id) && btn.classList.contains("edit")) {
         h1.focus();
      }
   })
}

// Додає класи для фокусу на інпуті
function input(btn) {
   btn.addEventListener("click", function () {
      let h1 = document.getElementById(`${btn.dataset.idlist}-title`);
      h1.classList.toggle("focus");
      if (h1.classList.contains('focus')) {
         h1.focus();
      } else {
         h1.blur();
      }
      btn.classList.toggle('edit')
      btn.children[0].classList.toggle('edit')
      saveDatasetLabel(btn.dataset.idlist, h1)
   }
   );
}


// Зберігає дані списка для подальшого відновлення при перезавантажені сторінки
function saveDatasetLabel(data, h1, btn) {
   keyPressVariable = function (e) {
      keyPressForTitle(data, e, btn)
   };
   h1.addEventListener('input', keyPressVariable)
}

// Функція для пунктів
function keyPressForTitle(id, e, btn) {
   if (btn && btn.classList.contains('no-edit')) {
      btn.classList.remove('no-edit')
   }
   const h2 = document.getElementById(`${id}-title`);
   h2.style.height = 'auto';
   h2.style.height = h2.scrollHeight + 'px';
   h2.dataset.label = h2.value;
   document.querySelectorAll('.list__title-edit').forEach((btn) => {
      if ((btn.dataset.idlist == id) && btn.classList.contains("edit")) {
         h2.focus();
      }
   })
}

// При натискані на стікер прибирає все виділине
function clearSelection() {
   if (window.getSelection) {
      if (window.getSelection().empty) {
         window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
         window.getSelection().removeAllRanges();
      }
   } else if (document.selection) {
      document.selection.empty();
   }
}

// Фунуціія для створення нових пунктів меню
function createNewElement(btn) {
   btn.addEventListener("click", function (e) {
      const hero = document.getElementById(`${btn.dataset.id}-hero`)
      if (hero) {
         hero.insertAdjacentHTML(
            'beforeend',
            `<div id="${idItems}-item" class="list__item">
            <div data-id='${idItems}-item-select' class="list__select select-list close new">
            <div class="select-list__header">
               <div id="${idItems}-item-status" data-id="${idItems}-item-select" class="select-list__current-value dont-start"><span></span></div>
               <div class="select-list__content">
               <div class="select-list__value complited-status" data-id="${idItems}-item-status" data-class='complited-status' title="Done"><span></span></div>
               <div class="select-list__value in-progress" data-id="${idItems}-item-status" data-class='in-progress' title="In Progress"><span></span></div>
               <div class="select-list__value dont-start" data-id="${idItems}-item-status" data-class='dont-start' title="Didn't start"><span></span></div>
            </div>
            </div>
         </div>
            <textarea data-label='' id="${idList}-list-title" spellcheck="false" type="text" id="0text"
               class="list__check new" placeholder="Name"></textarea>
            <div class="list__button-content">
               <div data-idlist="${idList}-list" class="list__title-edit new event no-edit">
                  <div data-idlist="${idList}-list" class="list__title-edit-bg"></div>
               </div>
               <div data-id="${idItems}-item" class="list__delete new">
                  <span></span>
               </div>
            </div>
         </div>`
         )
         document.querySelectorAll('.list__title-edit').forEach((btn) => {
            if (btn.classList.contains('new')) {
               btn.classList.remove('new')
               focusElement(btn)
            }
         });
         document.querySelectorAll('.label').forEach((lab) => {
            if (lab.classList.contains('new')) {
               lab.classList.remove('new')
               lab.addEventListener('click', function (e) {
                  if (e.target.classList.contains('list__check-keydown')) {
                     lab.classList.toggle('checked');
                  }
               })
            }
         });
         document.querySelectorAll('.list__delete').forEach((list) => {
            if (list && list.classList.contains('new')) {
               list.classList.remove('new');
               removeItemLine(list)
            }
         });
         document.querySelectorAll('.select-list').forEach((stat) => {
            if (stat && stat.classList.contains('new')) {
               stat.classList.remove('new')
               editStatusLine(stat)
            }
         })
      }
      idList += 1;
      idItems += 1;
   });
}

// Функція видалення стікера
function buttonRemove(btn, e) {
   if (btn.classList.contains("new")) {
      btn.classList.remove('new');
      btn.addEventListener("click", function () {
         let list = document.getElementById(`${btn.dataset.id}`)
         if (list) {
            if (list.classList.contains('complited')) {
               list.classList.remove('complited')
            }
            if (Number(btn.dataset.id % 2) == 0) {
               list.classList.add('remove')
            } else {
               list.classList.add('removeTwo')
            }
            setTimeout(function () {
               list.remove();
               footerCheckSave.textContent = footer.children.length
               footerCheckSave.style.background = `rgb(${129 + footerCheckSave.textContent}, ${109 - footerCheckSave.textContent * 2}, ${211 - footerCheckSave.textContent * 2}, 0.6)`
            }, 900)
         }
      });
   }
}

// Функція на позначення повного виконання стікера
function buttonComplited(btn, e) {
   btn.addEventListener("click", function () {
      let done = 0;
      let list = document.getElementById(`${btn.dataset.id}`)
      let hero = Array.from(document.getElementById(`${btn.dataset.id}-hero`).children);
      hero.forEach((item) => {
         let status = document.getElementById(`${item.id}-status`);
         if (status.classList.contains('complited-status')) {
            done += 1;
            if (item.classList.contains('no-complited')) {
               item.classList.remove('no-complited')
            }
         } else {
            if (!item.classList.contains('no-complited')) {
               item.classList.add('no-complited')
               setTimeout(function () {
                  item.classList.remove('no-complited')
               }, 1200)
            }
         }
      })
      if (list && (done == hero.length) && !list.classList.contains('list__complited')) {
         list.classList.toggle('complited');
         list.classList.toggle('list__complited');
         btn.classList.toggle('complited');
         let complitedList = list;
         setTimeout(function () {
            footer.appendChild(complitedList)
            footerCheckSave.textContent = footer.children.length
         }, 1800)
         list.classList.add('translate')
         setTimeout(function () {
            saveComplitedList.parentNode.classList.add('complited')
            setTimeout(function () {
               saveComplitedList.parentNode.classList.remove('complited')
               list.classList.remove('translate')
               footerCheckSave.style.background = `rgb(${129 + footerCheckSave.textContent}, ${109 - footerCheckSave.textContent * 2}, ${211 - footerCheckSave.textContent * 2}, 0.6)`
            }, 900)
         }, 1800)
      } else {
         if (list.classList.contains('complited') && btn.classList.contains('complited')) {
            list.classList.remove('complited');
            list.classList.add('translate')
            list.classList.add('uncomplited');
            btn.classList.remove('complited');
            let unComplitedList = list;
            setTimeout(function () {
               main.appendChild(unComplitedList)
               footerCheckSave.textContent = footer.children.length
            }, 1800)
            setTimeout(function () {
               setTimeout(function () {
                  list.classList.remove('list__complited');
                  list.classList.remove('uncomplited');
                  list.classList.remove('translate')
                  footerCheckSave.style.background = `rgb(${129 + footerCheckSave.textContent}, ${109 - footerCheckSave.textContent * 2}, ${211 - footerCheckSave.textContent * 2}, 0.6)`
               }, 900)
            }, 1800)
            footerCheckSave.textContent = footer.children.length
         }
      }
   });
}

// Функція на редагування тексту
function buttonTitleEdit(btn, e) {
   if (btn.classList.contains('new')) {
      btn.classList.remove('new')
      btn.addEventListener("click", function () {
         let list = document.getElementById(`${btn.dataset.id}`)
         if (list) {
            let h1 = document.getElementById(`${btn.dataset.id}text`);
            h1.classList.toggle("focus");
            if (h1.classList.contains('focus')) {
               h1.focus();
            } else {
               h1.blur();
            }
            btn.classList.toggle('edit')
            keyPressVariable = function (e) {
               keyPress(btn.dataset.id, e)
            };
            h1.addEventListener('input', keyPressVariable)
         }
      });
   }
}

function focusElement(btn) {
   let h1 = document.getElementById(`${btn.dataset.idlist}-title`);
   if (h1.classList.contains('new')) {
      h1.classList.remove('new')
      input(btn, h1)
   }
   document.querySelectorAll('.list__title-edit, .list__check').forEach((el) => {
      if (el.classList.contains('edit')) {
         el.classList.remove('edit')
      }
      if (el.classList.contains('focus')) {
         el.classList.remove('focus')
      }
   })
   saveDatasetLabel(btn.dataset.idlist, h1, btn)
   btn.classList.toggle('edit')
   h1.classList.toggle("focus");
   h1.focus();
}

function editStatusLine(el) {
   el.addEventListener('click', function (e) {
      el.classList.toggle('close')
      if (e.target.classList.contains('select-list__value')) {
         let stat = document.getElementById(`${e.target.dataset.id}`)
         stat.classList.forEach((classlist) => {
            if (classlist != 'select-list__current-value') {
               stat.classList.remove(`${classlist}`);
            }
         })
         stat.classList.add(`${e.target.dataset.class}`)
      }
   })
}

function handleDragAndDrop(el, posX) {
   if (!el.classList.contains('list__complited')) {
      if (window.innerWidth >= 529) {
         el.classList.add('grab');
         if (!el.classList.contains('search')) {
            el.style.zIndex = `${z}`;
         } else {
            el.style.zIndex = '1001';
         }
         addEventListener("mousemove", moveHandler);
         addEventListener("mouseup", mouseUp);
         function mouseUp() {
            if (el.classList.contains('grab')) {
               el.classList.remove('grab');
               if (el.classList.contains('search')) {
                  el.style.zIndex = '1000';
               }
            }
            el.style.borderRadius = "25px 25px 25px 25px";
            el.style.rotate = '0deg';
            removeEventListener("mousemove", moveHandler);
            removeEventListener('mouseup', mouseUp);
         }

         function moveHandler(e) {
            if (posX < e.clientX) {
               el.style.borderRadius = `25px 25px ${((e.clientX - posX) / 15) + 25}px 25px`;
               el.style.rotate = `${(e.clientX - posX) / 35}deg`;
            } else {
               el.style.borderRadius = `25px 25px 25px ${((posX - e.clientX) / 10) + 25}px`;
               el.style.rotate = `${(e.clientX - posX) / 35}deg`;
            }
            let h1 = document.getElementById(`${el.id}text`).offsetHeight;
            let kof;
            if (window.innerWidth >= 1750){
               kof = 0.75;
            }
            if (window.innerWidth >= 1440 && window.innerWidth <= 1750){
               kof = 1.25
            }
            if (window.innerWidth <= 1440){
               kof = 1.75
            }
            if (el.offsetHeight >= 250) {
               el.style.left = (e.clientX - (el.offsetWidth / `${kof}`)) + 'px';
               el.style.top = (e.clientY - (el.offsetHeight - (125 * (el.offsetHeight / 200)) + h1)) + 'px';
            } else {
               el.style.left = (e.clientX - (el.offsetWidth / `${kof}`)) + 'px';
               el.style.top = (e.clientY - (el.offsetHeight / 2 + h1)) + 'px';
            }
         }
      }
   }
}

function touchMove(el, posX) {
   if (!el.classList.contains('list__complited')) {
      if (window.innerWidth >= 529) {
         el.classList.add('grab');
         if (!el.classList.contains('search')) {
            el.style.zIndex = `${z}`;
         } else {
            el.style.zIndex = '1001';
         }
         addEventListener("touchmove", moveHandler);
         addEventListener("touchend", touchUp);
         function touchUp() {
            if (el.classList.contains('grab')) {
               el.classList.remove('grab');
               if (el.classList.contains('search')) {
                  el.style.zIndex = '1000';
               }
            }
            el.style.borderRadius = "25px 25px 25px 25px";
            el.style.rotate = '0deg';
            removeEventListener("touchmove", moveHandler);
            removeEventListener('touchend', touchUp);
         }
         function moveHandler(e) {
            let clientX = e.targetTouches[0].clientX
            let clientY = e.targetTouches[0].clientY
            let h1 = document.getElementById(`${el.id}text`).offsetHeight;
            if (el.offsetHeight >= 250) {
               el.style.left = (clientX - (el.offsetWidth / 1.75)) + 'px';
               el.style.top = (clientY - (el.offsetHeight - (125 * (el.offsetHeight / 200)) + h1)) + 'px';
            } else {
               el.style.left = (clientX - (el.offsetWidth / 1.75)) + 'px';
               el.style.top = (clientY - (el.offsetHeight / 2 + h1)) + 'px';
            }
         }
      }
   }
}

function currentElementSearch(e) {
   var el;
   z += 1;
   if (e.type != 'touchstart') {
      let posX = e.clientX;
      if (!e.target || e.target == document) {
         return;
      } else {
         if (e.target.classList && e.target.classList.contains('list__title-image')) {
            return;
         }
         if (e.target.parentNode && e.target.parentNode.classList && e.target.parentNode.classList.contains('list__title-image')) {
            return;
         }
         if (e.target.classList && e.target.classList.contains('list__item')) {
            el = e.target.parentNode.parentNode;
            handleDragAndDrop(el, posX)
         }
         if (e.target.classList && e.target.classList.contains('list')) {
            el = e.target;
            handleDragAndDrop(el, posX)
         } else {
            if (e.target.classList && e.target.classList.contains('list__hero') || e.target.classList.contains('h1') || e.target.classList.contains('list__button-menu')) {
               el = e.target.parentNode;
               handleDragAndDrop(el, posX)
            }
         }
      }
   } else {
      let posX = e.targetTouches[0].clientX;
      if (!e.target || e.target == document) {
         return;
      } else {
         if (e.target.classList && e.target.classList.contains('list__title-image')) {
            return;
         }
         if (e.target.parentNode && e.target.parentNode.classList && e.target.parentNode.classList.contains('list__title-image')) {
            return;
         }
         if (e.target.classList && e.target.classList.contains('list__item')) {
            el = e.targetTouches[0].target.parentNode.parentNode;
            touchMove(el, posX)
         }
         if (e.target.classList && e.target.classList.contains('list')) {
            el = e.targetTouches[0].target;
            touchMove(el, posX)
         } else {
            if (e.target.classList && e.target.classList.contains('list__hero') || e.target.classList.contains('h1') || e.target.classList.contains('list__button-menu')) {
               el = e.targetTouches[0].target.parentNode;
               touchMove(el, posX)
            }
         }
      }
   }
}

addEventListener('beforeunload', function () {
   document.querySelectorAll('.list').forEach((art) => {
      if (art.classList.contains('remove') || art.classList.contains('removeTwo') || art.classList.contains('removeAll') || art.classList.contains('removeTwoAll')) {
         art.remove();
      }
   })
   document.querySelectorAll('.list__title-edit, .list__title-image, .list__title, .list__check, .list').forEach((el) => {
      if (el.classList.contains('focus')) {
         el.classList.remove('focus')
      }
      if (el.classList.contains('edit')) {
         el.classList.remove('edit')
      }
      if (el.classList.contains('search')) {
         el.classList.remove('search')
      }
   })
   document.querySelectorAll(`.list__complited.translate, .uncomplited.translate`).forEach((translateElements) => {
      if (translateElements.classList.contains('list__complited') && !translateElements.classList.contains('uncomplited')) {
         translateElements.classList.remove('translate')
         let toFooter = translateElements;
         footer.appendChild(toFooter)
      } else {
         translateElements.classList.remove('translate')
         translateElements.classList.remove('uncomplited')
         translateElements.classList.remove('list__complited')
         let toMain = translateElements;
         main.appendChild(toMain)
      }
   })
   const art = document.querySelectorAll('article');
   let maxIdObj = 0;
   if (art.length - 1 != 0) {
      for (let j = 0; j < (art.length - 1); j++) {
         if (art[j].id > art[j + 1].id) {
            maxIdObj = (Number(art[j].id) + 1);
         } else {
            maxIdObj = (Number(art[j + 1].id) + 1);
         }
      }
   } else {
      maxIdObj = (Number(art[0].id) + 1);
   }

   // Збереження ще не виконаних стикерів

   const articles = document.querySelectorAll(`.main__container`);
   const articlesData = [];
   articles.forEach(function (article) {
      const articleData = {
         htmlContent: article.innerHTML,
      };
      articlesData.push(articleData);
   });

   // Збереження виконаних стикерів

   const articlesSave = document.querySelectorAll(`.footer__container`);
   const articlesDataSave = [];
   articlesSave.forEach(function (article) {
      const articleDataSave = {
         htmlContent: article.innerHTML,
      };
      articlesDataSave.push(articleDataSave);
   });

   if (document.querySelectorAll('article').length) {
      localStorage.setItem('articlesData', JSON.stringify(articlesData));
      localStorage.setItem('articlesDataSave', JSON.stringify(articlesDataSave));
   } else {
      localStorage.setItem('articlesData', '');
      localStorage.setItem('articlesDataSave', '');
   }
   localStorage.setItem('id', maxIdObj.toString());
   localStorage.setItem('idList', idList.toString());
   localStorage.setItem('idItems', idItems.toString());
});

searchElement.addEventListener('input', function (e) {
   let text = document.querySelectorAll(`.list__title`);
   let searchTerm = searchElement.value.toLowerCase();
   for (let i = 0; i < text.length; i++) {
      let textString = text[i].value.toLowerCase();
      if ((textString.indexOf(searchTerm) !== -1) && (searchTerm != '')) {
         if (!text[i].parentNode.parentNode.classList.contains('search')) {
            text[i].parentNode.parentNode.classList.add('search')
            text[i].parentNode.parentNode.style.zIndex = '10000'
         }
      } else {
         if (text[i].parentNode.parentNode.classList.contains('search')) {
            text[i].parentNode.parentNode.style.zIndex = `${z}`
            text[i].parentNode.parentNode.classList.remove('search')
         }
      }
   }
})

document.addEventListener('mousedown', function (e) {
   clearSelection();
   currentElementSearch(e)
});

document.addEventListener('touchstart', function (e) {
   clearSelection();
   currentElementSearch(e)
   if (e.targetTouches[0].target.parentNode.classList.contains('del')) {
      del();
   }
})