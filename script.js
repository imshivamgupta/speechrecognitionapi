document.addEventListener("DOMContentLoaded", function() {
    checkPermission();
    checkSupport();
    playersUi();
});
let teamAlpha = [],
    teamBravo = [];

const global = [{
        id: 1,
        name: "Anmol Srivastava",
        profile: "Graphic Designer",
        vocal: ["Anmol", "Anmol Srivastava", "Anmol Shrivastava", "Tramp", "Srivastava", "Shrivastava"]
    },
    {
        id: 2,
        name: "Aparajita Roy",
        profile: "Human Resource",
        vocal: ["Aparajita", "Aparajita Roy", "Aprajita Roy", "Aprajita Rai", "Sakura", "Roy", "Rai"]
    },
    {
        id: 3,
        name: "Pratik Gupta",
        profile: "Business Lead",
        vocal: ["Prateek Gupta", "Ed Hardy", "Prateek", "Gupta"]
    },
    {
        id: 4,
        name: "Sanjay Pandey",
        profile: "Front-end Team Lead",
        vocal: ["Sanjay Pandey", "Ghost", "Sanjay", "Pandey"]
    }, {
        id: 5,
        name: "Anoop Sharma",
        profile: "Back-end Team Lead",
        vocal: ["Anup", "Anup Sharma", "Anoop Sharma", "Sharma", "War"]
    },
    {
        id: 6,
        name: "Nitin Chotia",
        profile: "Front-end Developer",
        vocal: ["Nitin Chutiya", "Nitin", "Chutiya", "Ray Cloud", "Cloud"]
    },
    {
        id: 7,
        name: "Praful Mishra",
        profile: "Android Developer",
        vocal: ["Praful Mishra", "Praful", "Mishra", "Deadshot"]
    },
    {
        id: 8,
        name: "Ranjeet Gupta",
        profile: "Back-end Developer",
        vocal: ["Ranjit Gupta", "Ranjit", "Gupta", "Roger"]
    },
    {
        id: 9,
        name: "Vaishnavi Seth",
        profile: "Business Developer",
        vocal: ["Vaishnavi Sate", "Vaishnavi", "Sate", "Seth", "Vaishnavi Seth", "Claire", "Clear"]
    },
    {
        id: 10,
        name: "Shivam Gupta",
        profile: "Front-end Developer",
        vocal: ["Shivam Gupta", "Shivam", "Gupta", "Thor"]
    }
]

function checkSupport() {
    // Checking in Chrome and Firefox for SpeechRecognition API in Window Object
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if ('SpeechRecognition' in window) {
        console.log('SpeechRecognition API Supported');
        return true;
    } else {
        console.log('SpeechRecognition API not Supported');
        return false;
    }
}

function checkPermission() {
    navigator.permissions.query({
            name: 'microphone'
        })
        .then((permission) => {
            // console.log(permission.state);
            if (permission.state === 'denied') {
                console.log('Please, Allow microphone permission from Browser\'s Setting');
                return false;
            } else if (permission.state === 'prompt') {
                console.log('Wait for user response');
            } else if (permission.state === 'granted') {
                console.log('Allowed For Microphone \u{1F354}');
                // return true;
            }
        })
        .catch((error) => {
            console.log('Got error :', error);
        });
}

const startTeamingBtn = document.querySelector('.thar-one');
startTeamingBtn.addEventListener('click', event => voice(event));

function voice(event) {
    let recognition = new window.SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    let totalPlayer = global.length;
    // let totalPlayer = 10;
    recognition.onsoundstart = function() {
        console.log('Some sound is being received');
    };
    recognition.onspeechend = function() {
        console.log('Speech has stopped being detected');
    }
    recognition.onresult = function(e) {
        var transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
        const voice = transcript.toLocaleLowerCase();
        console.log(voice);
        var player = match(voice, playersUi);
        if (player.length && totalPlayer >= 0) {
            if (totalPlayer % 2 == 0) {
                teamAlphaUi(player);
                teamAlpha.push(player);
                console.log("Alpha", teamAlpha);
                totalPlayer = totalPlayer - 1;
            } else {
                teamBravoUi(player);
                teamBravo.push(player);
                console.log("Bravo", teamBravo);
                totalPlayer = totalPlayer - 1;
            }
        }
    };
    recognition.onend = recognition.start;
    recognition.start();
    // const checker = event.target.text.trim();
    // if (checker === 'Start Teaming') {
    //     event.target.text = 'Stop Teaming';
    // } else {
    //     event.target.innerHTML = `<i class="fa fa-microphone" aria-hidden="true"></i> Start Teaming`;
    //     recognition.stop();
    // }
}

function match(voice, cb) {
    let player = [];
    global.forEach(function(person) {
        person.vocal.map(function(variation) {
            const alias = variation.toLocaleLowerCase();
            if (alias === voice) {
                player.push(person);
                global.splice(global.indexOf(person), 1);
                cb();
            }
        });
    });
    return player;
}

function teamAlphaUi(player) {
    console.log(player);
    const name = player[0].name;
    let template = `
    <div class="person">
        <img class="profile-img-lg" src="./img/${player[0].id}.png" alt="">
        <p class="text-center">${name.split(' ')[0]}</p>
    </div>
    `;
    const alphaUi = document.querySelector('#alpha');
    const div = document.createElement('div');
    div.className = 'col-3';
    div.innerHTML = template;
    alphaUi.appendChild(div);
}

function teamBravoUi(player) {
    console.log(player);
    const name = player[0].name;
    let template = `
    <div class="person">
        <img class="profile-img-lg" src="./img/${player[0].id}.png" alt="">
        <p class="text-center">${name.split(' ')[0]}</p>
    </div>
    `;
    const alphaUi = document.querySelector('#bravo');
    const div = document.createElement('div');
    div.className = 'col-3';
    div.innerHTML = template;
    alphaUi.appendChild(div);
}

function playersUi() {
    let template = '';
    global.forEach(function(player) {
        const name = (player.name).split(' ')[0];
        template += `
        <div class="col-1 mx-auto">
            <div class="person">
                <img class="profile-img" src="./img/${player.id}.png" alt="">
                <p class="text-center">${name}</p>
            </div>
        </div>`;
    });
    const ui = document.querySelector('#players');
    ui.innerHTML = template;
}