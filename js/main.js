document.addEventListener("DOMContentLoaded", () => {

   // main function
   (()=>{
      const photos = {

         // vars
         value:'food',
         inputSearch: document.querySelector('#search'),
         form: document.querySelector('.fetch-form'),
         imagesHolder: document.querySelectorAll('.photos__item img'),
         result:'',
         choiceBtn: document.querySelectorAll('[data-info]'),
         id: 'nUXWhoHMFs0c0jAEivKi0l7rEEgE3MM-35Z2tEeF4gQ',
         
         // =============functions
         // get images from api
         getImages: async function () {

            if(this.value){
               
               try{

               const call = await fetch (`https://api.unsplash.com/search/photos?client_id=${this.id}&query=${this.value}&per_page=12&orientation=portrait`);

               let answer = await call.json();

               this.result = answer.results;

               this.renderImages();
               }catch{

                  alert('Тебе не нужна эта картинка. Поищи что-нибудь другое...');
                  
               }
            }else{
               alert('ты серьёзно?');
            }
         },

         // render
         renderImages: function(){
            for(let i = 0; i < this.imagesHolder.length; i++){
               this.imagesHolder[i].src = this.result[i].urls.regular;
            }
         },

         // addForm
         addForm: function (){
            this.form.addEventListener('submit',(e) =>{
               e.preventDefault();
               this.value = this.inputSearch.value;
               this.getImages();
            });
         },
         
         // send enter
         sendEnter: function(){ 
            this.inputSearch.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                e.preventDefault();
                this.value = this.inputSearch.value;
                this.getImages();
               }
            })
         },

         // choice buttons
         choiceRequest: function(){
            this.choiceBtn.forEach((item)=>{
               item.addEventListener('click',(e)=>{
                  this.inputSearch.value = item.dataset.info;
               })
            })
         }

      }

      photos.choiceRequest();
      photos.getImages();
      photos.addForm();
      photos.sendEnter();

   })();

   // mobile version
   (()=>{
      document.querySelector('.burger').addEventListener('click',()=>{
         document.querySelector('.menu-choice').classList.toggle('active');
         document.querySelector('.burger').classList.toggle('active');
      })
   })();
});


