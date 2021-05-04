const realBtn = document.querySelector('#file');
const browseBtn = document.querySelector('#browseBtn');
const customTxt = document.querySelector('#customTxt');
let  teamName = document.querySelector('#team');
let  problemStatement = document.querySelector('#problem');
// let  file = document.querySelector('#file');
let  repoLink = document.querySelector('#link');
let submitBtn = document.querySelector('#submitBtn');
let form = document.querySelector('form');

// browseBtn.addEventListener('click', function () {
//     realBtn.click();
// });

// customTxt.addEventListener('click', function () {
//     realBtn.click();
// });

// realBtn.addEventListener('change', function () {
//     if (realBtn.value) {
//         customTxt.textContent = realBtn.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
//     }
//     else {
//         customTxt.textContent = "Select File..."
//     }
// });


// #####################
// jQuery
// #####################


let addParticipants = $('.add-participants');
let wrapper = $('.embed');
const max = 5;
const min = 2;
let i = 3;

addParticipants.on('click', function(e){
    e.preventDefault();
    console.log('clicked');
    if(i<=max)
    {
        console.log(i);
        wrapper.append("<div class='formOptions'> <label for='participant-"+i+"'> Participant "+i+" </label> <input type='text' id='participant-"+i+"'> <span class='remove'>-</span> </div>");
        if(i <= max)
        {
            i++;
        }

        let removeStatements = $('.remove');

        removeStatements.on('click', function(e){
            e.preventDefault();
            console.log('clicked');
            $(this).parents('.formOptions').remove();
            if(i>min+1)
            {
                i--;
            }
        });
    }

});

submitBtn.addEventListener('click', function(e){
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", sessionStorage.getItem('token'));

    let data = {
        email: '',
        abstract: problemStatement.value,
        name: teamName.value,
        link: repoLink.value
    };

    var raw = JSON.stringify(data);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        // mode: 'no-cors'
    };

    fetch("https://hackjudge.herokuapp.com/details", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
})


