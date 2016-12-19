var ideaArray = [];

$('.save-button').on('click',function(){
  var ideaTitle = $('.title-input').val();
  var ideaBody = $('.body-input').val();
  var uniqueID = '_' + Math.random().toString(36).substr(2, 9);
  clearInputs();
  var someIdea = new ideaObj(uniqueID,ideaTitle,ideaBody);
  ideaArray.push(someIdea);
  console.log(ideaArray);
});


function clearInputs(){
    $('.title-input, .body-input').val(null);
};

function ideaObj (id,title,body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = 'plausible';
  console.log(this.ideaCard);
}

var ideaString = JSON.stringify(ideaArray);
localStorage.setItem('ideas', ideaString)

localStorage.getItem('ideas');
var ideaArray = JSON.parse(ideaString);
