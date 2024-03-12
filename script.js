// function fact(n) {
//     var result = 1;

//     while (n > 0) {
//         result *= n--;
//     }

//     return result;
// }

// console.log(fact(10));

// function applique(f, tab) {
//     // return tab.map(f);
//     var res = [];
//     tab.forEach(x => {
//         res.push(f(x));
//     });
//     return res;
// }

// console.log(applique(fact,[1, 2, 3, 4, 5]));
// console.log(applique(x => x + 1, [1, 2, 3, 4, 5]));

// const serverName = "localhost:3003";
// const serverURL = "http://"+serverName;
// const websocketURL = "ws://"+serverName;

const serverName = "archiapp-message-ms.onrender.com";
const serverURL = "https://"+serverName;
const websocketURL = "wss://"+serverName;

function main() {
    function makeid() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 64; i++) result += characters.charAt(Math.floor(Math.random() * characters.length));
        return result;
    }

    cookie_name = "archiapp_user";
    function setCookie(name) {
        var d = new Date();
        d.setTime(d.getTime() + (100*24*60*60*1000)); // 100 days
        var expires = "expires="+ d.toUTCString();
        document.cookie = cookie_name + "id=" + makeid() + ";" + expires + ";path=/";
        document.cookie = cookie_name + "name=" + name + ";" + expires + ";path=/";
    }
    
    function getCookie(field) {
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(cookie_name+field+"=") == 0) return c.substring(cookie_name.length+1, c.length);
        }
        return "";
    }

    var userid = getCookie("id");
    var username = "";
    if (userid != "") {
        alert("Welcome again " + getCookie("name"));
    } else {
        username = prompt("Welcome! First time ? Please enter your username:", "");
        if (username == "" || username == null) {
            alert("Welcome, anonymous user!");
        } else {
            setCookie(username);
            userid = getCookie("id");
            console.log(userid);
        }
    }


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
            msgs.map(msg => {
                const li = document.createElement('li');
                li.innerHTML = "<div><h5>"+msg.uid+"</h5><h6>"+msg.date+"</h6>"+msg.message+"</div>";
                ul.appendChild(li);
            });
        });
    }
    
    const webSocket = new WebSocket(websocketURL);
    webSocket.onmessage = update

    function send() {
        var ta = document.getElementById('messageInput');
        if (ta.value == "") return;

        fetch(serverURL+'/msg/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "uid": userid,
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

    update();
}

window.onload = main;
