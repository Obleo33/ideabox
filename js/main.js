var ideaArray = [];

$('.save-button').on('click', function() {
  var ideaTitle = $('.title-input').val;
  var ideaBody = $('.body-input').val;
  var randoId = '_'+Math.random().toString(36).substr(2, 9);
  clearInput();
  var newIdea = new ideaObj(randoId, ideaTitle, ideaBody);
  submitToStorage(newIdea);
  makeIdeaCards();
})

function clearInput() {
  $('.title-input, .body-input').val(null);
}

function ideaObj(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function submitToStorage(newIdea) {
  ideaArray.push(newIdea);
  var ideaString = JSON.stringify(ideaArray);
  localStorage.setItem('storedIdeas', ideaString);
  console.log(localStorage);
}

function makeIdeaCards() {
  var ideaString = localStorage.getItem('storedIdeas');
  var ideaArray = JSON.parse(ideaString);
  ideaArray.forEach(function(v, i){
    $('idea-list').prepend(
      `<div class="idea-card">
          <h2>${this.title}</h2>
          <p>${this.body}</p>
          <div class="quality">
            <img src="" alt="">
            <img src="" alt="">
            <h3 class="quality">quality: <span class="quality-name">${this.quality}</span></h3>
          </div>
      </div>`
    );
  })

}
