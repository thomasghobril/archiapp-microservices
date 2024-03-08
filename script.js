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
