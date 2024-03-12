function fact(n) {
    var result = 1;

    while (n > 0) {
        result *= n--;
    }

    return result;
}

console.log(fact(10));

function applique(f, tab) {
    // return tab.map(f);
    var res = [];
    tab.forEach(x => {
        res.push(f(x));
    });
    return res;
}

console.log(applique(fact,[1, 2, 3, 4, 5]));
console.log(applique(x => x + 1, [1, 2, 3, 4, 5]));

// const serverName = "localhost:3003";
const serverName = "https://archiapp-message-ms.onrender.com";
const serverURL = "http://"+serverName;

function update() {
    msgs = fetch(serverURL+'/msg/getAll')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        return data.allMsgs;
    }).then(function(msgs) {
        const ul = document.getElementById('messages');
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        applique(msg => {
            const li = document.createElement('li');
            li.textContent = msg;
            ul.appendChild(li);
        }, msgs);
    });
}

window.onload = update;

const websocketURL = "ws://"+serverName;
const webSocket = new WebSocket(websocketURL);
webSocket.onmessage = update

const updateButton = document.getElementById('update');
updateButton.onclick = update;

function send() {
    var ta = document.getElementById('messageInput');
    if (ta.value == "") return;

    fetch(serverURL+'/msg/post', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "content": ta.value
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data["code"] == "1") {
            ta.value = "";
            update();
        } else {
            alert("Le message n'a pas pu être envoyé!");
        }
    });
}

const sendButton = document.getElementById('send');
sendButton.onclick = send;
