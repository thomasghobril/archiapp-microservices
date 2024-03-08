function fact(n) {
    result = 1;

    while (n > 0) {
        result *= n--;
    }

    return result;
}

console.log(fact(10))