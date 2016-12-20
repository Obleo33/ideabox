function testForStoredIdeas() {
  var ideaString = localStorage.getItem('storedIdeas');
  if (ideaString === null){
    localStorage.setItem('storedIdeas','[]')
  } else {
    var ideaArray = JSON.parse(ideaString);
    makeIdeaCardsFromStorage(ideaArray);
  }
}

testForStoredIdeas();

function makeIdeaCardsFromStorage(ideaArray) {
  ideaArray.forEach(function(v, i){
    prependNewIdea(v);
  })
}

$('.save-button').on('click', function() {
  var ideaTitle = $('.title-input').val();
  var ideaBody = $('.body-input').val();
  var randoId = '_'+Math.random().toString(36).substr(2, 9);
  var newIdea = new IdeaObj(randoId, ideaTitle, ideaBody);
  submitToStorage(newIdea);
  prependNewIdea(newIdea);
  clearInput();
})

function clearInput() {
  $('.title-input, .body-input').val(null);
}

function IdeaObj(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'swill';
}

function submitToStorage(newIdea) {
  var ideaString = localStorage.getItem('storedIdeas')
  var ideaArray = JSON.parse(ideaString);
  ideaArray.push(newIdea);
  var ideaString = JSON.stringify(ideaArray);
  localStorage.setItem('storedIdeas', ideaString);
}

function prependNewIdea(object){
  $('#idea-list').prepend(
      `<div class="idea-card">
          <section class="idea-head">
            <h2 contenteditable>${object.title}</h2>
            <div class="delete button"></div>
          </section>
            <p contenteditable>${object.body}</p>
          <div class="quality">
            <div class="up-vote button"></div>
            <div class="down-vote button"></div>
            <h3 class="quality">quality:&nbsp<span class="quality-name">${object.quality}</span></h3>
          </div>
        </div>`);
};
