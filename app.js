class StoneHead {
  constructor(src, num, title) {
    this.src = src;
    this.num = num;
    this.title = title;
    this.initNum = 0;
  }
  generate() {
    let img = $('<img />').attr('src',this.src);
    let title = $('<p>').addClass('stone-title').text(this.title);
    let num = $('<p>').addClass('stone-num').text(this.initNum);
    this.node =  $('<div></div>').addClass('each-stone flex align-center slide-up').append(img).append($('<div></div>').append(title).append(num).addClass('stone-info'))[0];
  }
  append(node) {
    this.generate();
    node.appendChild(this.node)
    let total = 1500;
    let interval = total / this.num;
    var id = setInterval(()=> {
      var num = this.initNum++;
      // // adjust the speed
      // if(num === this.num / 2) {
      //   interval = 800;
      // }else if (num === this.num / 1.5) {
      //   interval = 1000;
      // }

      // update the num
      $(this.node).find('.stone-num').text(num);

      // end the change
      if(num === this.num) {
        clearInterval(id);
      }
    }, interval)
  }
}
class CardBody {
  constructor(cardInfo){
    this.cardInfo = cardInfo;
    this.progress = cardInfo.progress ? cardInfo.progress : 0;
  }

  assignColor(){
    var colors = ['#E3EFD1', "#FBF6C9", "#F1DBDC", "#E5EFF5"];
    this.color = colors[Math.floor(Math.random()*colors.length)];
  }
  generate(){
    var progressNum = $('<p></p>').addClass('progress-num').text(`${this.progress}%`);
    var cardAction = $('<div></div>').addClass('card-action').append($('<i></i>').addClass('fas fa-edit')).append($('<i></i>').addClass('fas fa-trash-alt'));
    var cardProgress = $('<div></div>').addClass('card-progress').append(progressNum).append(cardAction)
    var cardInfo = $('<div></div>').addClass('card-info flex align-center flex-auto');
    var cardInfoArray = ['milestone', 'start date', 'target date', 'complete date'];
    // add the progress background
    cardInfo.append($('<div></div>').addClass('card-progress-background'));
    // add each info into the left info panel
    cardInfoArray.forEach((i)=> {
      if(this.cardInfo[i]) {
        var el = $("<div></div>").addClass('each-info').append($('<p></p>').addClass('info-title').text(i)).append($('<p></p>').addClass('info-content').text(this.cardInfo[i]));
        cardInfo.append(el);
      }
    })
    this.node = $('<div></div>').addClass('each-card flex slide-up').append(cardInfo).append(cardProgress)[0];
  }
  append(node){
    this.generate();
    this.assignColor();
    node.appendChild(this.node);
    $(this.node).find('.card-progress-background').css({'background': this.color, 'width': `${this.progress}%`})
  }
}
let stoneData = [
  {
    url: './assets/good progress.png',
    num: 12,
    title: 'completed'
  },
  {
    url: './assets/solved support.png',
    num: 20,
    title: 'Good Progress'
  },
  {
    url: './assets/at risk.png',
    num: 15,
    title: 'At Risk'
  },
  {
    url: './assets/unsolved support.png',
    num: 122,
    title: 'Unsolved Support'
  },
];
let cardData = [
  {
    // name: 'xxxxx',
    "milestone": "Project Scope Definition",
    "start date": "12/03/2018",
    "target date": "12/03/2018",
    "complete date": "12/03/2018",
    progress: 100
  },
  {
    name: 'xxxxx',
    "milestone": "Project Scope Definition",
    "start date": "12/03/2018",
    "target date": "12/03/2018",
    progress: 45
  },
  {
    name: 'xxxxx',
    "milestone": "Project Scope Definition",
    "start date": "12/03/2018",
    "target date": "12/03/2018",
    progress: 65
  },
  {
    name: 'xxxxx',
    "milestone": "Project Scope Definition",
    "start date": "12/03/2018",
    "target date": "12/03/2018",
    progress: 75
  },
]

let stoneHead = $('.mile-stone-head')[0];
stoneData.forEach((i)=> {
  let stone = new StoneHead(i.url, i.num, i.title);
  stone.append(stoneHead);
})

let cardBody = $('.card-view-body')[0];
cardData.forEach((i, index)=> {
  let card = new CardBody(i);
  var interval = 200;
  console.log(index * interval)
  setTimeout(()=> {
    card.append(cardBody);
  }, index * interval)
})