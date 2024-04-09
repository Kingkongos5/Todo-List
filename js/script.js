
const addList = document.querySelector('.plus');

const main = document.querySelector('.main__container');
const brush = document.querySelector('.del');
const listHero = document.querySelector('.list__hero');

let id = 0;
let idList = 0;
let z = 1;
let keyPressVariable;

addEventListener('load', function (e) {
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

   idList += Number(localStorage.getItem('idList'));
   id += Number(localStorage.getItem('id'))

   document.querySelectorAll('.list__addNewElement').forEach((btn) => addNewElement(btn));
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
         if (h1.classList.contains('new')) {
            h1.classList.remove('new')
            keyPressVariable = function (e) {
               keyPressForTitle(btn.dataset.idlist, e)
            };
            h1.addEventListener('input', keyPressVariable)
            console.log('complite');
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
      addEventListener('click', function (e) {
         document.querySelectorAll('.list__title-image').forEach((btn) => {
            buttonTitleEditHidden(btn, e)
         });
         document.querySelectorAll('.list__title-edit').forEach((btn) => {
            buttonTextEdit(btn, e)
         });
      })
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
   addEventListener('click', function (e) {
      document.querySelectorAll('.list__title-image').forEach((btn) => {
         buttonTitleEditHidden(btn, e)
      });
      document.querySelectorAll('.list__title-edit').forEach((btn) => {
         buttonTextEdit(btn, e)
      });

   })
})

addList.addEventListener('click', function () {
   main.insertAdjacentHTML(

      'beforeend',
      `<article id="${id}" class="list" style="top: 0px; left: 0px">` +
      '<div class="h1">' +
      `<textarea spellcheck="false" maxlength="100" type="text" data-label='' id="${id}text" class="list__title" placeholder="Name"></textarea>` +
      `<div data-id="${id}" class="list__title-image new">` +
      `<div data-id="${id}" class="list__title-image-bg">` +
      `</div>` +
      '</div>' +
      '</div>' +
      `<div id="${id}-hero" class="list__hero">` +
      `</div>` +
      `</div>` +
      `<div data-id="${id}" class="list__addNewElement new">` +
      `<span></span>` +
      `</div>` +
      '<div class="list__button-menu">' +
      `<button data-id="${id}" class="list__button list__button-del new"></button>` +
      `<button data-id="${id}" class="list__button list__button-complited new"></button>` +
      '</div>' +
      '</article>'

   );

   if (addList.classList.contains('new')) {
      addList.classList.remove('new')
      addEventListener('click', function (e) {

         document.querySelectorAll('.list__addNewElement').forEach((btn) => { createNewElement(btn, e) });
         document.querySelectorAll('.list__button-del').forEach((btn) => { buttonRemove(btn, e) });
         document.querySelectorAll('.list__button-complited').forEach((btn) => { buttonComplited(btn, e) });
         document.querySelectorAll('.list__title-image').forEach((btn) => { buttonTitleEdit(btn, e) });
         document.querySelectorAll('.list__title-image').forEach((btn) => { buttonTitleEditHidden(btn, e) });
         document.querySelectorAll('.list__title-edit').forEach((btn) => { buttonTextEdit(btn, e) });
      });
   }
   id += 1;
});
brush.addEventListener("dblclick", function del() {
   let listCount = document.querySelectorAll('.list').length;
   document.querySelectorAll('.list').forEach((list) => {
      if (Number(list.id) % 2 == 0) {
         list.classList.add('removeAll')
      } else {
         list.classList.add('removeTwoAll')
      }
      setTimeout(function () {
         list.remove();
      }, (800 + (100 * listCount)))
   })
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
   console.log(h2.dataset.label);
}

// при натискані на стікер прибирає все виділине
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

// Фунуціія для додавання нових пунктів меню
function addNewElement(btn, e) {
   btn.addEventListener("click", function () {
      console.log(btn);
      const hero = document.getElementById(`${btn.dataset.id}-hero`)
      if (hero) {
         hero.insertAdjacentHTML(
            'beforeend',
            `<div class="list__item">` +
            `<input spellcheck="false" class="list__check-keydown" type="checkbox">` +
            `<textarea data-label='' id="${idList}-list-title" spellcheck="false" type="text" id="0text" class="list__check new" placeholder="Name"></textarea>` +
            `<div data-idlist="${idList}-list" class="list__title-edit">` +
            `<div data-idlist="${idList}-list" class="list__title-edit-bg"></div>` +
            `</div>` +
            `</div>`
         )
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
               if (h1.classList.contains('new')) {
                  h1.classList.remove('new')
                  keyPressVariable = function (e) {
                     keyPressForTitle(btn.dataset.idlist, e)
                  };
                  h1.addEventListener('input', keyPressVariable)
                  console.log('complite');
               }
            }
            );
         });
      }
      idList += 1;
   });
}

// Фунуціія для створення нових пунктів меню в старих стікерах
function createNewElement(btn, e) {
   if (btn.classList.contains("new")) {
      btn.classList.remove('new');
      btn.addEventListener("click", function () {
         const hero = document.getElementById(`${btn.dataset.id}-hero`)
         if (hero) {
            hero.insertAdjacentHTML(
               'beforeend',
               `<div class="list__item">` +
               `<input spellcheck="false" class="list__check-keydown" type="checkbox">` +
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
         }
         idList += 1;
      });
   }
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

function buttonTextEdit(btn, e) {
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

function buttonTitleEditHidden(btn, e) {
   if (btn.dataset.id != e.target.dataset.id) {
      if (btn.classList.contains('edit')) {
         btn.classList.remove('edit')
         let h1 = document.getElementById(`${btn.dataset.id}text`);
         h1.classList.remove("focus");
         h1.blur();
      }
   } else if (e.target.classList.contains('list__button')) {
      if (btn.classList.contains('edit')) {
         btn.classList.remove('edit')
         let h1 = document.getElementById(`${btn.dataset.id}text`);
         h1.classList.remove("focus");
         h1.blur();
      }
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
   localStorage.setItem('articlesData', JSON.stringify(articlesData));
   localStorage.setItem('id', maxIdObj.toString());
   localStorage.setItem('idList', idList.toString());
});


