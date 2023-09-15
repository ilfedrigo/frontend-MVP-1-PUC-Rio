function adicionar() {
  const tituloInput = document.getElementById('titulo');
  const autorInput = document.getElementById('autor');
  const comentarioInput = document.getElementById('comentario');

  const titulo = tituloInput.value;
  const autor = autorInput.value;
  const comentario = comentarioInput.value;

  tituloInput.value = '';
  autorInput.value = '';
  comentarioInput.value = '';

  postLivro(titulo, autor, comentario);
}

const getLista = async () => {
  let url = "http://127.0.0.1:5000/buscar-livros";
  let lista = document.getElementById('lista');
  lista.innerHTML = '';

  try {
      const response = await fetch(url, { method: 'get' });
      const data = await response.json();

      data.livros.forEach((livro) => {
          let novoItem = document.createElement('li');
          novoItem.innerHTML = `${livro.titulo}, <strong>${livro.autor}</strong>. <br> ${livro.comentario}`;
          const botaoExcluir = document.createElement("button");
          botaoExcluir.textContent = "X";

          botaoExcluir.addEventListener("click", () => {
              deletarLivro(livro.id)
                  .then(() => getLista())
                  .catch((error) => {
                      console.error('Erro ao excluir o livro:', error);
                  });
          });

          novoItem.appendChild(botaoExcluir);
          lista.appendChild(novoItem);
      });
  } catch (error) {
      console.error('Error:', error);
  }
};

getLista();

const postLivro = async (titulo, autor, comentario) => {
  const data = {
      "titulo": titulo,
      "autor": autor,
      "comentario": comentario
  };

  let url = 'http://127.0.0.1:5000/adicionar-livros';
  try {
      await fetch(url, {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      getLista(); // Atualize a lista após a adição
  } catch (error) {
      console.error('Error:', error);
  }
};

const deletarLivro = async (livro_id) => {
  let url = 'http://127.0.0.1:5000/excluir-livro/' + livro_id;
  try {
      const response = await fetch(url, {
          method: 'delete',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      if (!response.ok) {
          throw new Error(`Erro de rede: ${response.status}`);
      }
      return response.json();
  } catch (error) {
      throw error;
  }
};