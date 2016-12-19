function testForRobbie() {
  var ideaString = localStorage.getItem('storedIdeas');
  if (ideaString === null){
    localStorage.setItem('storedIdeas','[]')
  } else {
    var ideaArray = JSON.parse(ideaString);
  }
}

testForRobbie();

$('.save-button').on('click', function() {
  var ideaTitle = $('.title-input').val();
  var ideaBody = $('.body-input').val();
  var randoId = '_'+Math.random().toString(36).substr(2, 9);
  var newIdea = new IdeaObj(randoId, ideaTitle, ideaBody);
  submitToStorage(newIdea);
  prependNewIdea(newIdea);
  clearInput();
  console.log(ideaTitle);
  console.log(ideaBody);
  console.log(newIdea);
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
            <h2>${object.title}</h2>
            <p>${object.body}</p>
            <div class="quality">
              <img src="" alt="">
              <img src="" alt="">
              <h3 class="quality">quality: <span class="quality-name">${object.quality}</span></h3>
            </div>
        </div>`);
}

// function makeIdeaCardsFromStorage(idea) {
//   var ideaString = localStorage.getItem('storedIdeas');
//   var ideaArray = JSON.parse(ideaString);
//   ideaArray.forEach(function(v, i){
//   })
