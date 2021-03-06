
(function () {


  var Memory;
  Memory = {

    init: function (cards) {
      this.$game = $(".game");
      this.$modal = $(".modal");
      this.$overlay = $(".modal-overlay");
      this.$restartButton = $("button.restart");

      this.$startGame = $(".start-game");
      this.$buttonStart = $(".start");
      this.$gamewrap = $('.game-wrap');
      this.$gamewrap.hide();




      this.$buttonStart.on("click", function () {


        var inpt = $(".player-name");
        var player = $(".player");
        player.html(inpt.val());
        Memory.$startGame.fadeOut();
        Memory.$gamewrap.fadeIn();
        Memory.setup();
        init();

      });
    },

   /* shuffleCards: function () {

    },*/

    setup: function () {

      if($('input:radio[name=check]:checked').val() == '1'){
        this.cardsArray = $.merge(cards.slice(6), cards.slice(6));
        this.$cards = $(Memory.shuffle(this.cardsArray));

      } else if ($('input:radio[name=check]:checked').val() == '2'){
        this.cardsArray = $.merge(cards.slice(4), cards.slice(4));
        this.$cards = $(Memory.shuffle(this.cardsArray));

      } else if($('input:radio[name=check]:checked').val() == '3'){
        this.cardsArray = $.merge(cards, cards);
        this.$cards = $(Memory.shuffle(this.cardsArray));
      }else{
        alert('надо что то выбрать');
        Memory.$startGame.fadeIn();
        Memory.$gamewrap.fadeOut();
        this.$cards = $(Memory.shuffle(this.cardsArray));
        // Memory.shuffleCards(this.cardsArray);
        Memory.setup();
      }


      this.html = this.buildHTML();
      this.$game.html(this.html);

      this.$memoryCards = $(".card");
      this.paused = false;
      this.guess = null;
      this.binding();
    },

    binding: function () {
      this.$memoryCards.on("click", this.cardClicked);
      this.$restartButton.on("click", $.proxy(this.reset, this));
    },
    // kinda messy but hey
    cardClicked: function () {


      var mySound;
      mySound = soundManager.createSound({
        url: 'src/sound/Sound.mp3'
      });
      mySound.play();
      var _ = Memory;
      var $card = $(this);
      if (!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")) {
        $card.find(".inside").addClass("picked");
        if (!_.guess) {
          _.guess = $(this).attr("data-id");
        }
        else if (_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")) {
          var mySound;
          mySound = soundManager.createSound({
            url: 'src/sound/zvuk-puli.mp3'
          });
          mySound.play();
          $(".picked").addClass("matched");
          _.guess = null;
        }
        else {
          _.guess = null;
          _.paused = true;
          setTimeout(function () {
            $(".picked").removeClass("picked");
            Memory.paused = false;
          }, 600);
        }
        if ($(".matched").length == $(".card").length) {
          _.win();
        }
      }
    },

    win: function () {
      var mySound;
      mySound = soundManager.createSound({
        url: 'src/sound/Sound.mp3'
      });
      mySound.play();
      this.paused = true;
      setTimeout(function () {
        Memory.showModal();
        Memory.$game.fadeOut();
      }, 1000);
    },

    showModal: function () {
      this.$overlay.show();
      this.$modal.fadeIn("slow");
    },

    hideModal: function () {
      this.$overlay.hide();
      this.$modal.hide();
    },

    reset: function () {
     init();
      this.hideModal();
      this.$cards = $(Memory.shuffle(this.cardsArray));
      //this.shuffleCards(this.cardsArray);
      this.setup();
      this.$game.show("slow");
    },

    // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
    shuffle: function (array) {
      var counter, temp, index;
      counter = array.length;
      // While there are elements in the array
      while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);
        // Decrease counter by 1
        counter--;
        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
      }
      return array;
    },

    buildHTML: function () {
      this.$restart = $("button.restart-game");
      this.$restart.on("click", function () {
        Memory.$startGame.fadeIn();
        Memory.$gamewrap.fadeOut();
        this.$cards = $(Memory.shuffle(this.cardsArray));
       // Memory.shuffleCards(this.cardsArray);
        Memory.setup();
        clearInterval(tick);
      });
      var frag = '';
      this.$cards.each(function (k, v) {
        // language=HTML
        frag += '<div class="card" data-id="' + v.id + '"><div class="inside">\
       <div class="front"><img src="' + v.img + '"\
				alt="' + v.name + '" /></div>\
	   <div class="back"><img src="src/image/shirt.jpg"\
				alt="shirt" /></div></div>\
	   </div>';
      });
      return frag;
    }
  };


  var cards = [
    {
      name: "php",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/php-logo_1.png",
        img2: "src/image/shirt.jpg",
      id: 1,
    },
    {
      name: "css3",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/css3-logo.png",
      id: 2
    },
    {
      name: "html5",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/html5-logo.png",
      id: 3
    },
    {
      name: "jquery",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/jquery-logo.png",
      id: 4
    },
    {
      name: "javascript",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/js-logo.png",
      id: 5
    },
    {
      name: "node",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/nodejs-logo.png",
      id: 6
    },
    {
      name: "photoshop",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/photoshop-logo.png",
      id: 7
    },
    {
      name: "python",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/python-logo.png",
      id: 8
    },
    {
      name: "rails",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/rails-logo.png",
      id: 9
    },
    {
      name: "sass",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sass-logo.png",
      id: 10
    },
    {
      name: "sublime",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/sublime-logo.png",
      id: 11
    },
    {
      name: "wordpress",
      img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/74196/wordpress-logo.png",
      id: 12
    },
      
  ];

  Memory.init(cards);


})();

var timer;

function init()
{

  if(timer){
    clearInterval(timer);
  }
  sec = 0;
  timer = setInterval(tick, 1000);
}

function tick()
{
  sec++;
  document.getElementById("timer").
      childNodes[0].nodeValue = sec;
}




















