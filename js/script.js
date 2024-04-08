
const addList = document.querySelector('.plus');
const main = document.querySelector('.main__container');
const brush = document.querySelector('.del');

let id = 0;
let z = 1;
let keyPressVariable;

brush.addEventListener("dblclick", function del() {
   document.querySelectorAll('.list').forEach((list) => {
      if (Number(list.id) % 2 == 0) {
         list.classList.add('remove')
      } else {
         list.classList.add('removeTwo')
      }
      setTimeout(function () {
         list.remove();
      }, 6900)
   })
})


addList.addEventListener('click', function () {
   main.insertAdjacentHTML(



      'beforeend',
      `<article id="${id}" class="list" style="top: 0px; left: 0px">` +
      '<div class="h1">' +
      `<input type="text" id="${id}text" value="Name" class="list__title"></input>` +
      `<div data-id="${id}" class="list__title-image new">` +
      `<div data-id="${id}" class="list__title-image-bg">` +
      `</div>` +
      '</div>' +
      '</div>' +
      '<div class="list__hero"></div>' +
      '<div class="list__button-menu">' +
      `<button data-id="${id}" class="list__button list__button-del new"></button>` +
      `<button data-id="${id}" class="list__button list__button-complited new"></button>` +
      '</div>' +
      '</article>'
   );

   if (addList.classList.contains('new')) {
      addList.classList.remove('new')
      addEventListener('click', function (e) {
         document.querySelectorAll('.list__button-del').forEach((btn) => {
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
         });

         document.querySelectorAll('.list__button-complited').forEach((btn) => {
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
         });

         document.querySelectorAll('.list__title-image').forEach((btn) => {
            if (btn.classList.contains('new')) {
               btn.classList.remove('new')
               btn.addEventListener("click", function () {
                  let list = document.getElementById(`${btn.dataset.id}`)
                  if (list) {
                     let h1 = document.getElementById(`${btn.dataset.id}text`);
                     h1.classList.toggle("focus");
                     if (h1.classList.contains('focus')){
                        h1.focus();
                     } else {
                        h1.blur();
                     }
                     btn.classList.toggle('edit')
                     keyPressVariable = function (e) {
                        keyPress(btn.dataset.id, e)
                     };
                     addEventListener('keypress', keyPressVariable)
                  }
               });
            }
         });

         document.querySelectorAll('.list__title-image').forEach((btn) => {
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
         })
      });
   }
   id += 1;
});



document.addEventListener('mousedown', function (e) {
   var el; // Оголошуємо змінну el
   let posX = e.clientX;
   let posY = e.clientY;
   z += 1;
   if (e.target.classList.contains('list__title-image')) {
      return
   } else if (e.target.parentNode.classList.contains('list__title-image')) {
      return
   }
   if (e.target.classList.contains('list')) {
      el = e.target;
      el.classList.add('grab');
      el.style.zIndex = `${z}`
      addEventListener("mousemove", moveHandler); // Додаємо обробник подій
      addEventListener("mouseup", function () {
         if (el.classList.contains('grab')) {
            el.classList.remove('grab')
         }
         el.style.borderRadius = "25px 25px 25px 25px";
         el.style.rotate = '0deg'
         removeEventListener("mousemove", moveHandler); // Видаляємо обробник подій
      })
   } else {
      if (e.target.classList.contains('list__hero') || e.target.classList.contains('h1') || e.target.classList.contains('list__button-menu')) {
         el = e.target.parentNode;
         el.style.zIndex = `${z}`
         el.classList.add('grab');
         addEventListener("mousemove", moveHandler); // Додаємо обробник подій
         addEventListener("mouseup", function () {
            if (el.classList.contains('grab')) {
               el.classList.remove('grab')
            }
            el.style.borderRadius = "25px 25px 25px 25px";
            el.style.rotate = '0deg'
            removeEventListener("mousemove", moveHandler); // Видаляємо обробник подій
         })
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
      el.style.left = (e.clientX - (el.offsetWidth / 1.75)) + 'px'; // Встановлюємо стиль left
      el.style.top = (e.clientY - (el.offsetHeight / 1.5)) + 'px'; // Встановлюємо стиль left
   }
});

function keyPress(id, e) {
   const h1 = document.getElementById(`${id}text`);
   document.querySelectorAll('.list__title-image').forEach((btn) => {
      if ((btn.dataset.id == id) && btn.classList.contains("edit")) {
         h1.focus();
         if (e.key == "Enter") {
            if (h1.classList.contains('focus')) {
               h1.classList.remove("focus");
            }
            btn.classList.remove("edit");
            h1.blur();
         }
      }
   })
}