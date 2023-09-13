function adicionar() {

    let titulo = document.getElementById('titulo').value; 
    let autor = document.getElementById('autor').value; 
    let comentario = document.getElementById('comentario').value; 


    let list = document.getElementById('lista');

    let novoItem = document.createElement('li');
    novoItem.innerHTML = `${titulo}, <strong>${autor}</strong>. <br> ${comentario}`;
    lista.appendChild(novoItem);

    document.getElementById('titulo').value = ''
    document.getElementById('autor').value = ''
    document.getElementById('comentario').value = ''
}