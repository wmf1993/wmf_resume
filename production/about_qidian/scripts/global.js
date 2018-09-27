// onload handler to bind multiple directives
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

// Adapt to browser width
// change_1: 统一共同部分的CSS，浏览器宽度应用相应的CSS(-big/-small)
function browserChange() {
  var width = window.innerWidth;
  var links = document.getElementsByTagName('link');
  if (width < 1200) {
    for (var i=0; i<links.length; i++) {
      var cssHref = links[i].href;
      if (/(.*)(main-big.css)/ig.test(cssHref) == true) {
        links[i].href = cssHref.replace(/(.*)(main-big.css)/ig, '$1'+'main-small.css');
      }
    }
  } else {
    for (var i=0; i<links.length; i++) {
      var cssHref = links[i].href;
      if (/(.*)(main-small.css)/ig.test(cssHref) == true) {
        links[i].href = cssHref.replace(/(.*)(main-small.css)/ig, '$1'+'main-big.css');
      }
    }
  }
}
window.onresize = browserChange;

// advertisement
// close element & change element's color
function closeClick() {
  var eles = document.getElementsByClassName('close');
  for (var i=0;i<eles.length;i++) {
    eles[i].onclick = function(){
      var ads = document.getElementsByClassName('ad');
      for (var i=0; i<ads.length; i++) {
        ads[i].style.display = 'none';
      }
    }
    eles[i].onmouseover = function(){
      var that = this;
      var childs = that.childNodes;
      for (var i=0; i<childs.length; i++) {
        if (childs[i].nodeType == 1) {
          childs[i].style.color = '#e7081a';
        }
      }        
    }
    eles[i].onmouseout = function(){
      var that = this;
      var childs = that.childNodes;
      for (var i=0; i<childs.length; i++) {
        if (childs[i].nodeType == 1) {
          childs[i].style.color = '';
        }
      }        
    }
  }
}
addLoadEvent(closeClick);

// button of 'search', add an action to change color if mouse over it
function changeColor () {
  var searchEle = document.getElementById('search-button');
  searchEle.onmouseover = function() {
    searchEle.style.backgroundColor = '#ed4259';
  }
  searchEle.onmouseout = function() {
    searchEle.style.backgroundColor = '';
  }
}
addLoadEvent(changeColor);

//  onmouse Event change color, game
function changeGameColor() {
  var eles = document.getElementsByClassName('game-hover');
  for (var i=0; i<eles.length; i++) {
    eles[i].onmouseover = function() {
      var that = this;
      var icons = that.childNodes;
      for (var j=0; j<icons.length; j++) {
        if (icons[j].nodeType == 1) {
          that.style.color = '#ffeea8';
          icons[j].style.color = '#ffeea8';
          that.nextElementSibling.style.display='block';
          that.nextElementSibling.style.backgroundColor='#aaff88';
          that.nextElementSibling.style.color='#6060ff';
        }
      }
      that.nextElementSibling.onmouseover = function() {
          this.style.display='block';
      }
    }
    eles[i].onmouseout = function() {
      var that = this;
      var icons = that.childNodes;
      for (var j=0; j<icons.length; j++) {
        if (icons[j].nodeType == 1) {
          that.style.color = '';
          icons[j].style.color = '';
          that.nextElementSibling.style.display='none';
        }
      }
      that.nextElementSibling.onmouseout = function() {
        this.style.display='none';
      }
    }
  }
}
addLoadEvent(changeGameColor);


/*  === carousel === */
function moveElement(elemID, move_x, interval) { /*元素ID以及X移动距离 */
  var elem = document.getElementById(elemID);
  
  elem.style.transitionProperty = 'transform';
  elem.style.transitionDuration = '300ms';
  elem.style.transitionTimingFunction = 'linear';
  var moveX = 'translateX(' + move_x + '%)';
  elem.style.transform = moveX;
  
 // var repeat = "moveElement('" + elemID +"'," + move_x +", " + interval + ")";
 // elem.movement = setTimeout(repeat, interval);
}

function clickImg() {
  var clickChilds = document.getElementsByClassName('click')[0].childNodes;
  /* -- 对于两边的button，循环调用函数,直至左边或右边兄弟img都挪开 --*/
  function movePrevious(elem){
    if (!elem.previousElementSibling) return;
    fontElemID = elem.previousElementSibling.href.replace(/.*#(.*)/g,'$1');
    moveElement(fontElemID, -100, 1000);
    movePrevious(elem.previousElementSibling);
  }
  function moveNext(elem) {
    if (!elem.nextElementSibling) return;
      nextElemID = elem.nextElementSibling.href.replace(/.*#(.*)/g,'$1');
      moveElement(nextElemID, 100, 1000);
      moveNext(elem.nextElementSibling);
  }
  
  for (var i=0; i<clickChilds.length; i++) {
    if (clickChilds[i].nodeType == 1) {
      /* -- question: can't set time ==*/
      console.log(clickChilds[i].clicked);
      if (clickChilds[i].style.stranform != 'translateX(0%)') clearTimeout(clickChilds[i].clicked);
      
      clickChilds[i].onclick = function() {
        that = this;
        var elemID = that.href.replace(/.*#(.*)/g,'$1');
        var fontElemID;
        var nextElemID;
        moveElement(elemID, 0, 1000);
        
        if (!that.nextElementSibling) {
          fontElemID = that.previousElementSibling.href.replace(/.*#(.*)/g,'$1');
          moveElement(fontElemID, -100, 1000);
          movePrevious(that);
        }
        if (!that.previousElementSibling) {
          nextElemID = that.nextElementSibling.href.replace(/.*#(.*)/g,'$1');
          moveElement(nextElemID, 100, 1000);
          moveNext(that);
        }
        if (that.nextElementSibling && that.previousElementSibling) {
          fontElemID = that.previousElementSibling.href.replace(/.*#(.*)/g,'$1');
          nextElemID = that.nextElementSibling.href.replace(/.*#(.*)/g,'$1');
          moveElement(fontElemID, -100, 1000);
          moveElement(nextElemID, 100, 1000);
        }
        /*
        that.clicked = setTimeout(function(){
          if(!that.nextElementSibling) clickChilds[1].click();
          that.nextElementSibling.click();
          }, 1000);
          */
      }
      clickChilds[i].addEventListener('click', function(){});
      
    }
  }
  clickChilds[1].click();
}
addLoadEvent(clickImg);
//carousel('item1', '-100%', 300ms)