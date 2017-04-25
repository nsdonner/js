/**
 * Created by Donner on 26.04.2017.
 */


var abc = ['img/egg4.jpeg', 'img/egg3.jpeg', 'img/egg2.jpeg', 'img/egg1.jpeg'];
function shiftArray(arr, cnt) {
    return arr.slice(cnt).concat(arr.slice(0, cnt));
}

document.addEventListener('DOMContentLoaded', function () {


    document.getElementsByClassName('pleft')[0].onclick = function (event) {
        var sfotoList = document.getElementsByClassName('sfotolist')[0];
        for (i = 0; i < sfotoList.getElementsByTagName('img').length; i++) {
            sfotoList.getElementsByTagName('img')[i].src = abc[i];
            document.getElementsByClassName('photo')[0].style.backgroundImage = 'url(' + abc[i + 1] + ')';
        }
        abc = shiftArray(abc, -1);

    };

    document.getElementsByClassName('pright')[0].onclick = function (event) {
        var sfotoList = document.getElementsByClassName('sfotolist')[0];
        for (i = 0; i < sfotoList.getElementsByTagName('img').length; i++) {
            sfotoList.getElementsByTagName('img')[i].src = abc[i];
            document.getElementsByClassName('photo')[0].style.backgroundImage = 'url(' + abc[i + 1] + ')';
        }
        abc = shiftArray(abc, 1);

    };


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




});