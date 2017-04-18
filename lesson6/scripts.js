/**
 * Created by donner on 16.04.2017.
 */

/*function go() {*/

document.addEventListener('DOMContentLoaded', function () {


    var arr = document.body.getElementsByTagName('main');
    var b = arr[0].getElementsByTagName('img');
    /*  for (var i = 0; i < b.length; i++) {
     if (b[i].naturalHeight === 0) {
     b[i].src = 'img/null.png';
     }
     }
     */
    for (var i = 0; i < b.length; i++) {

        b[i].onerror = function (e) {
            this.src = 'img/null.png';
        }

    }


    var a;
    a = document.getElementsByClassName('goods')[0];
    b = a.getElementsByTagName('li');
    for (i = 0; i < b.length; i++) {

        if (b[i].getElementsByTagName('img')[0].naturalHeight == 0 || b[i].src === 'img/null.png') {

            continue;
        }

        if ((i + 1) % 2 == 0) {
            b[i].innerHTML = b[i].innerHTML + '<img class="buythisodd bt" src="img/buy.png" alt="" onclick="buy()">';
        } else b[i].innerHTML = b[i].innerHTML + '<img class="buythis bt" src="img/buy.png" alt="" onclick="buy()">';

        if (b[i].getElementsByTagName('img')[0].naturalHeight == 0 || b[i].src === 'img/null.png') {
            continue;
        }
        else {
            var c = document.getElementsByClassName('bt');
            b[i].onmouseout = function (e) {
                this.getElementsByClassName('bt')[0].style.display = 'none';
            };
            b[i].onmouseover = function (e) {
                this.getElementsByClassName('bt')[0].style.display = 'block';
            }
        }

    }

});

var basket = [];
var good = [];
var summ = 0;

function priceClear(price) {

    price = price.split(' ')[1];
    price = price.split('<')[0];
    return (price);

}


function buy(event) {

    var a = this.event.srcElement.parentNode.getElementsByClassName('good')[0].innerHTML,
        b = priceClear(this.event.srcElement.parentNode.getElementsByClassName('price')[0].innerHTML);

    var same = false;
    var i;
    console.log(a, b, same, i, basket);
    basket.push([a, b, 1]);

    for (i = 0; i < (basket.length - 1); i++) {

        if (basket[i][0] == a && basket[i][1] == b) {
            same = i;
            console.log('trigger');
        }

    }

    if (same !== false) {
        basket[same][2] = basket[same][2] + 1;
        same = false;
        basket.splice((basket.length - 1), 1);
    }


    console.log(basket);

    fsumm();
   }


function fsumm() {
    summ=0;
    for (i=0; i<basket.length; i++) {
        /*console.log(i,summ);
        console.log(parseInt(basket[i][1]), parseInt(basket[i][2]) );*/
        summ = parseInt(summ) + ((parseInt(basket[i][1]) * parseInt(basket[i][2])));

    }

    document.getElementsByClassName('summ')[0].innerHTML = summ + ' руб.';
    console.log(summ);
}



