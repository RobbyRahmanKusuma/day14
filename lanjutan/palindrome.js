function palindrome(kata) {
    var word = /[^A-Za-z0-9]/g;
    var smallKata = kata.toLowerCase().replace(word, '');
    var reverseKata = smallKata.split('').reverse().join(''); 
    return reverseKata === smallKata;
}

// TEST CASES
console.log(palindrome('katak')); // true
console.log(palindrome('blanket')); // false
console.log(palindrome('civic')); // true
console.log(palindrome('kasur rusak')); // true
console.log(palindrome('mister')); // false
