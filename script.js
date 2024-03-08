function fact(n) {
    result = 1;

    while (n > 0) {
        result *= n--;
    }

    return result;
}

console.log(fact(10));

function applique(f, tab) {
    // return tab.map(f);
    res = [];
    tab.forEach(x => {
        res.push(f(x));
    });
    return res;
}

console.log(applique(fact,[1, 2, 3, 4, 5]));
console.log(applique(x => x + 1, [1, 2, 3, 4, 5]));

msgs = [
    { "msg" : "Hello World" },
    { "msg" : "Blah Blah" },
    { "msg" : "I love cats" }
];

function update(msgs) {
    const ul = document.getElementById('messages');
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    applique(msg => {
        const li = document.createElement('li');
        li.textContent = msg.msg;
        ul.appendChild(li);
    }, msgs);
}

const button = document.getElementById('send');
button.onclick = () => update(msgs);