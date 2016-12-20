$(function loadStoredIdeas() {
  var ideaString = localStorage.getItem('storedIdeas');
  if (ideaString === null){
    localStorage.setItem('storedIdeas','[]')
  } else {
    var ideaArray = JSON.parse(ideaString);
    makeIdeaCardsFromStorage(ideaArray);
  }
});

function retrieveIdeas() {
  var ideaString = localStorage.getItem('storedIdeas');
  return JSON.parse(ideaString);
}


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

$('.search-input').on('keyup',function (){
  var searchString = $(this).val().toLowerCase();
  $('.idea-card').each(function(index,element){
    var text = $(element).text().toLowerCase();
    var isAMatch = !!text.match(searchString);
    $(this).closest('.idea-card').toggle(isAMatch);
  });
});

function prependNewIdea(object){
  $('#idea-list').prepend(
      `<div class="idea-card">
          <section class="idea-head">
            <h2 class="idea-title search" contenteditable>${object.title}</h2>
            <div class="delete button" id="${object.id}"></div>
          </section>
            <p class="idea-body search" contenteditable>${object.body}</p>
          <div class="quality">
            <div class="up-vote button"></div>
            <div class="down-vote button"></div>
            <h3 class="quality">quality:&nbsp<span class="quality-name">${object.quality}</span></h3>
          </div>
        </div>`);
};

$('#idea-list').on('click', '.up-vote',function(){
  var quality = $(this).sibling('.quality-name  a')
  console.log(quality);
  if (quality === "swill"){
    $('.quality-name',this).text('plausible');
  } else if (quality === 'plausible'){
    $('.quality-name',this).text('genius');
  }
})

$('#idea-list').on('click', '.delete',removeCard);
function removeCard(){
  $(this).parents('.idea-card').fadeOut(200,function() { $(this).remove(); });
  removeIdeaFromStorage(this.id);
};

function removeIdeaFromStorage(id) {
  var ideaCardID = id;
  var ideasFromStorage = retrieveIdeas();
  var newIdeaArray = ideasFromStorage.filter(function(ideas){
    return ideas.id !== ideaCardID;
  });
  var ideaString = JSON.stringify(newIdeaArray);
  localStorage.setItem('storedIdeas', ideaString)
}
