var opinionsButton = document.getElementById('opinions');
opinionsButton.addEventListener('click', function() {
    window.location.href = 'Opinions/opinions.html';
});

var funStuffButton = document.getElementById('funStuff');
funStuffButton.addEventListener('click', function() {
    window.location.href = 'Fun Stuff/tetris.html';
});

var knight = document.getElementById('KnightGif');
knight.addEventListener('click', function() {
    knight.src='knight-attack.gif';
    setTimeout(function(){
        knight.src='knight-idle.gif';},
        750);
});