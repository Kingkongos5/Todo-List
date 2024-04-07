
const addList = document.querySelector('.plus');
const main = document.querySelector('.main__container');

let id = 0;
let z = 1;
let keyPressVariable;

addList.addEventListener('click', function () {
   main.insertAdjacentHTML(



      'beforeend',
      `<article id="${id}" class="list" style="top: 0px; left: 0px">` +
      '<div class="h1">' +
      `<input type="tel" id="${id}text" value="Name" class="list__title"></input>` +
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
                     btn.classList.toggle('edit')
                     let h1 = document.getElementById(`${btn.dataset.id}text`);
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
                  let h1 = this.document.getElementById(`${btn.dataset.id}text`);
                  h1.blur();
                  console.log(123);
               }
            } else if (e.target.classList.contains('list__button')) {
               if (btn.classList.contains('edit')) {
                  btn.classList.remove('edit')
                  console.log(123);
                  let h1 = this.document.getElementById(`${btn.dataset.id}text`);
                  h1.blur();
                  console.log(h1);
               }
            }
         })
      });
   }
   id += 1;
});



document.addEventListener('mousedown', function (e) {
   var el; // Оголошуємо змінну el
   z += 1;
   if (e.target.classList.contains('list__title-image')) {
      return
   } else if (e.target.parentNode.classList.contains('list__title-image')) {
      return
   }
   if (e.target.classList.contains('list')) {
      el = e.target;
      el.style.zIndex = `${z}`
      addEventListener("mousemove", moveHandler); // Додаємо обробник подій
      addEventListener("mouseup", function () {
         removeEventListener("mousemove", moveHandler); // Видаляємо обробник подій
      })
   } else {
      if (e.target.classList.contains('list__hero') || e.target.classList.contains('h1') || e.target.classList.contains('list__button-menu')) {
         el = e.target.parentNode;
         el.style.zIndex = `${z}`
         addEventListener("mousemove", moveHandler); // Додаємо обробник подій
         addEventListener("mouseup", function () {
            removeEventListener("mousemove", moveHandler); // Видаляємо обробник подій
         })
      } else {
         el = e.target.parentNode.parentNode;
         el.style.zIndex = `${z}`
         addEventListener("mousemove", moveHandler); // Додаємо обробник подій
         addEventListener("mouseup", function () {
            removeEventListener("mousemove", moveHandler); // Видаляємо обробник подій
         })
      }
   }

   function moveHandler(e) {
      el.style.left = (e.clientX - (el.offsetWidth / 2)) + 'px'; // Встановлюємо стиль left
      el.style.top = (e.clientY - el.offsetHeight) + 'px'; // Встановлюємо стиль left
   }
});

function keyPress(id, e) {
   const h1 = document.getElementById(`${id}text`);
   document.querySelectorAll('.list__title-image').forEach((btn) => {
      if ((btn.dataset.id == id) && btn.classList.contains("edit")) {
         h1.focus();
         if (e.key == "Enter") {
            btn.classList.remove("edit");
            h1.blur();
         }
      }
   })
}