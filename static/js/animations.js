/* Animácia postupné zobrazenie textu */
window.onload = function() {
    animateSequence();
};



function animateSequence() {
    var a = document.getElementsByClassName('sequence');
    for (var i = 0; i < a.length; i++) {
        var $this = a[i];
        var letter = $this.innerHTML;
        letter = letter.trim();
        var str = '';
        var delay = 100;
        for (l = 0; l < letter.length; l++) {
            if (letter[l] != ' ') {
                str += '<span style="animation-delay:' + delay + 'ms; -moz-animation-delay:' + delay + 'ms; -webkit-animation-delay:' + delay + 'ms; ">' + letter[l] + '</span>';
                delay += 150;
            } else
                str += letter[l];
        }
        $this.innerHTML = str;

    }
}

/*ss k animácii postupný text
.cssanimation, .cssanimation span {
    animation-duration: 1s;
    animation-fill-mode: both;
  }

  .cssanimation span { display: inline-block }
  
  .leRotateSkateInLeft span { animation-name: leRotateSkateInLeft }
  @keyframes leRotateSkateInLeft {
      from {
          transform: scaleX(0.2) translateX(-100px);
          opacity: 0;
      }
  }
  */

