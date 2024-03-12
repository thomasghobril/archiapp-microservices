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

function update() {
    msgs = fetch('http://localhost:3003/msg/getAll')
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

const updateButton = document.getElementById('update');
updateButton.onclick = update;

function send() {
    var ta = document.getElementById('messageInput')
    fetch('http://localhost:3003/msg/post/'+ta.value)
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
