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

var arrowUp = false;

function buy(event) {

    document.getElementsByClassName('basket')[0].style.display = 'block';






    document.getElementsByClassName('arrow')[0].onclick = function(event){

        if (!arrowUp) {
            document.getElementsByClassName('basketgoods')[0].style.display = 'block';
            document.getElementsByClassName('arrow')[0].innerHTML = '<i class="fa fa-sort-asc" aria-hidden="true"></i>';
            document.getElementsByClassName('arrow')[0].style.paddingTop = '10px';
            arrowUp = true;
        } else {
            document.getElementsByClassName('basketgoods')[0].style.display = 'none';
            document.getElementsByClassName('arrow')[0].innerHTML = '<i class="fa fa-sort-desc" aria-hidden="true"></i>';
            document.getElementsByClassName('arrow')[0].style.paddingTop = '0';
            arrowUp = false;
        }



    };

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


    a = document.getElementsByClassName('basketgoods')[0];
    a.innerHTML = '';
    for (i = 0; i < basket.length; i++) {
        var sp = document.createElement('li');
        sp.innerHTML = basket[i][0] + '&nbsp; &nbsp;'+basket[i][2]+' шт. &nbsp; &nbsp;' + '<div class="bprice">'+(basket[i][1] * basket[i][2] + ' руб.</div>');
        a.appendChild(sp);
    }


}


function fsumm() {
    summ = 0;
    for (i = 0; i < basket.length; i++) {
        /*console.log(i,summ);
         console.log(parseInt(basket[i][1]), parseInt(basket[i][2]) );*/
        summ = parseInt(summ) + ((parseInt(basket[i][1]) * parseInt(basket[i][2])));

    }

    document.getElementsByClassName('summ')[0].innerHTML = summ + ' руб.';
    console.log(summ);
}



