
const addList = document.querySelector('.plus');

const main = document.querySelector('.main__container');
const brush = document.querySelector('.del');
const listHero = document.querySelector('.list__hero');

let id = 1;
let idList = 0;
let z = 1;
let keyPressVariable;
let btn;
let btnText;

addEventListener('DOMContentLoaded', function (e) {
   addEventListener('click', function (e) {
      if (btn) {
         if (`${btn.dataset.idlist}` != `${e.target.dataset.idlist}`) {
            if (btn.classList.contains('edit')) {
               btn.classList.remove('edit')
               let h1 = document.getElementById(`${btn.dataset.idlist}-title`);
               h1.classList.remove("focus");
               h1.blur();
            }
         } else if (e.target.classList.contains('list__button')) {
            if (btn.classList.contains('edit')) {
               btn.classList.remove('edit')
               let h1 = document.getElementById(`${btn.dataset.idlist}-title`);
               h1.classList.remove("focus");
               h1.blur();
            }
         }
      }
      if (btnText) {
         if (btnText.dataset.id != e.target.dataset.id) {
            if (btnText.parentNode.classList.contains('edit')) {
               btnText.parentNode.classList.remove('edit')
               let h1 = document.getElementById(`${btnText.dataset.id}text`);
               h1.classList.remove("focus");
               h1.blur();
            }
         } else if (e.target.classList.contains('list__button')) {
            if (btnText.parentNode.classList.contains('edit')) {
               btnText.parentNode.classList.remove('edit')
               let h1 = document.getElementById(`${btnText.dataset.id}text`);
               h1.classList.remove("focus");
               h1.blur();
            }
         }
      }
      if (((e.target.classList.contains('list__title-edit') || e.target.classList.contains('list__title-edit-bg')))) {
         if (e.target.classList.contains('list__title-edit-bg')) {
            btn = e.target.parentNode;
         } else {
            btn = e.target;
         }
      }
      if ((e.target.classList.contains('list__title-image-bg') && !e.target.classList.contains('edit'))) {
         btnText = e.target;
      }
   })
   if (localStorage.getItem('articlesData') != '') {
      const beforeItems = JSON.parse(localStorage.getItem('articlesData'));
      for (let i = 0; i < beforeItems.length; i++) {
         main.insertAdjacentHTML(
            'beforeend',
            `${beforeItems[i].htmlContent}`
         )
      }

      document.querySelectorAll('[data-label]').forEach((lab) => {
         if (lab.dataset.label) {
            lab.value = lab.dataset.label;
         }
      })

      document.querySelectorAll('.list__addNewElement').forEach((btn) => createNewElement(btn));
      document.querySelectorAll('.list__title-edit').forEach((btn) => {
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
            if (h1.classList.contains('new')) {
               h1.classList.remove('new')
               keyPressVariable = function (e) {
                  keyPressForTitle(btn.dataset.idlist, e)
               };
               h1.addEventListener('input', keyPressVariable)
            }
         }
         );
      });
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
         btn.addEventListener("click", function () {
            let list = document.getElementById(`${btn.dataset.id}`)
            if (list) {
               list.classList.toggle('complited')
               btn.classList.toggle('complited')
            }
         });
      });
      document.querySelectorAll('.list__button-lock').forEach((btn) => {
         btn.addEventListener('click', function () {
            console.log(456);
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

      idList += Number(localStorage.getItem('idList'));
      id += Number(localStorage.getItem('id'))
   }
})

addList.addEventListener('click', function () {
   main.insertAdjacentHTML(

      'beforeend',
      `<article id="${id}" class="list" style="top: 0px; left: 0px">
               <div class="h1">
                  <textarea spellcheck="false" maxlength="100" type="text" data-label='' id="${id}text"
                     class="list__title" placeholder="Name"></textarea>
                  <div data-id="${id}" class="list__title-image new">
                     <div data-id="${id}" class="list__title-image-bg"></div>
                  </div>
               </div>
               <div id="${id}-hero" class="list__hero"></div>
               <div data-id="${id}" class="list__addNewElement new">
                  <span></span>
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
         document.querySelectorAll('.list__button-complited').forEach((btn) => { buttonComplited(btn, e) });
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
brush.addEventListener("dblclick", function del() {
   let listCount = document.querySelectorAll('.list').length;
   console.log(listCount);
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
         }, (800 + (100 * listCount)))
      }
   })
   console.log(listCount);
})

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
         if (e.key == "Enter") {
            if (h1.classList.contains('focus')) {
               h1.classList.remove("focus");
               h1.blur();
            }
            btn.classList.remove("edit");
         }
      }
   })
}

// Функція для пунктів
function keyPressForTitle(id, e) {
   const h2 = document.getElementById(`${id}-title`);
   h2.style.height = 'auto';
   h2.style.height = h2.scrollHeight + 'px';
   h2.dataset.label = h2.value;
   document.querySelectorAll('.list__title-edit').forEach((btn) => {
      if ((btn.dataset.idlist == id) && btn.classList.contains("edit")) {
         h2.focus();
         if (e.key == "Enter") {
            if (h2.classList.contains('focus')) {
               h2.classList.remove("focus");
               h2.blur();
            }
            btn.classList.remove("edit");
         }
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
   btn.addEventListener("click", function () {
      const hero = document.getElementById(`${btn.dataset.id}-hero`)
      if (hero) {
         hero.insertAdjacentHTML(
            'beforeend',
            `<div class="list__item">` +
            `<label class='label new'><input spellcheck="false" class="list__check-keydown" type="checkbox"><span></span></label>` +
            `<textarea data-label='' id="${idList}-list-title" spellcheck="false" type="text" id="0text" class="list__check new" placeholder="Name"></textarea>` +
            `<div data-idlist="${idList}-list" class="list__title-edit new">` +
            `<div data-idlist="${idList}-list" class="list__title-edit-bg"></div>` +
            `</div>` +
            `</div>`
         )
         document.querySelectorAll('.list__title-edit').forEach((btn) => {
            if (btn.classList.contains('new')) {
               btn.classList.remove('new')
               btn.addEventListener("click", function () {
                  console.log(456);
                  let h1 = document.getElementById(`${btn.dataset.idlist}-title`);
                  h1.classList.toggle("focus");
                  if (h1.classList.contains('focus')) {
                     h1.focus();
                  } else {
                     h1.blur();
                  }
                  btn.classList.toggle('edit')
                  if (h1.classList.contains('new')) {
                     h1.classList.remove('new')
                     keyPressVariable = function (e) {
                        keyPressForTitle(btn.dataset.idlist, e)
                     };
                     h1.addEventListener('input', keyPressVariable)
                  }
               }
               );
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
         })

      }
      idList += 1;
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
            }, 900)
         }
      });
   }
}

// Функція на позначення повного виконання стікера
function buttonComplited(btn, e) {
   if (btn.classList.contains('new')) {
      btn.classList.remove('new')
      btn.addEventListener("click", function () {
         let list = document.getElementById(`${btn.dataset.id}`)
         if (list) {
            list.classList.toggle('complited')
            btn.classList.toggle('complited')
         }
      });
   }
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

document.addEventListener('mousedown', function (e) {
   var el;
   let posX = e.clientX;
   z += 1;
   clearSelection();
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
         el.classList.add('grab');
         el.style.zIndex = `${z}`;
         addEventListener("mousemove", moveHandler);
         addEventListener("mouseup", mouseUp);
         function mouseUp() {
            if (el.classList.contains('grab')) {
               el.classList.remove('grab');
            }
            el.style.borderRadius = "25px 25px 25px 25px";
            el.style.rotate = '0deg';
            removeEventListener("mousemove", moveHandler);
            removeEventListener('mouseup', mouseUp);
         }
      }
      if (e.target.classList && e.target.classList.contains('list')) {
         el = e.target;
         el.classList.add('grab');
         el.style.zIndex = `${z}`;
         addEventListener("mousemove", moveHandler);
         addEventListener("mouseup", mouseUp);
         function mouseUp() {
            if (el.classList.contains('grab')) {
               el.classList.remove('grab');
            }
            el.style.borderRadius = "25px 25px 25px 25px";
            el.style.rotate = '0deg';
            removeEventListener("mousemove", moveHandler);
            removeEventListener('mouseup', mouseUp);
         }
      } else {
         if (e.target.classList && e.target.classList.contains('list__hero') || e.target.classList.contains('h1') || e.target.classList.contains('list__button-menu')) {
            el = e.target.parentNode;
            el.style.zIndex = `${z}`;
            el.classList.add('grab');
            addEventListener("mousemove", moveHandler);
            addEventListener("mouseup", mouseUp);
            function mouseUp() {
               if (el.classList.contains('grab')) {
                  el.classList.remove('grab');
               }
               el.style.borderRadius = "25px 25px 25px 25px";
               el.style.rotate = '0deg';
               removeEventListener("mousemove", moveHandler);
               removeEventListener('mouseup', mouseUp);
            }
         }
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
         if (el.offsetHeight >= 250) {
            el.style.left = (e.clientX - (el.offsetWidth / 1.75)) + 'px';
            el.style.top = (e.clientY - (el.offsetHeight - (125 * (el.offsetHeight / 200)) + h1)) + 'px';
         } else {
            el.style.left = (e.clientX - (el.offsetWidth / 1.75)) + 'px';
            el.style.top = (e.clientY - (el.offsetHeight / 2 + h1)) + 'px';
         }
      }
   }
});




addEventListener('beforeunload', function () {
   document.querySelectorAll('article').forEach((art) => {
      if (art.classList.contains('remove') || art.classList.contains('removeTwo') || art.classList.contains('removeAll') || art.classList.contains('removeTwoAll')) {
         art.remove();
      }
   })
   document.querySelectorAll('.list__title-edit, .list__title-image, .list__title, .list__check').forEach((el) => {
      if (el.classList.contains('focus')) {
         el.classList.remove('focus')
      }
      if (el.classList.contains('edit')) {
         el.classList.remove('edit')
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
   const articles = document.querySelectorAll('.main__container');
   const articlesData = [];
   articles.forEach(function (article) {
      const articleData = {
         htmlContent: article.innerHTML,
      };
      articlesData.push(articleData);
   });
   if (document.querySelectorAll('article').length) {
      localStorage.setItem('articlesData', JSON.stringify(articlesData));
   } else {
      localStorage.setItem('articlesData', '');
   }
   localStorage.setItem('id', maxIdObj.toString());
   localStorage.setItem('idList', idList.toString());
});


