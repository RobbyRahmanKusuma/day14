let eldestParent = document.getElementById('eldest-parent');
eldestParent.children[0].innerHTML = 'Diakses Melalui Eldest Parent';

let aChild = document.getElementById('a-child');
aChild.previousElementSibling.innerHTML = 'Diakses Melalui a Child'
aChild.nextElementSibling.innerHTML = 'Diakses Melalui a Child';
aChild.parentNode.parentNode.nextElementSibling.innerHTML = 'Diakses Melalui a Child'