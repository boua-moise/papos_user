const contenu = document.querySelector(".text");
const titre = document.querySelector(".hero h1");
const image = document.querySelector(".hero img");
const categorie = localStorage.getItem("category")


document.addEventListener("DOMContentLoaded", async (e) => {
    const id = localStorage.getItem("viewId");
    const result = await fetch(`http://127.0.0.1:8000/articles/${id}/contenu`, {
        method: "GET",
        headers:{
            "content-type": "application/json"
        }
    });
    const data = await result.json();
    const article = data.response
    console.log(data, JSON.parse(article.contenu));

    titre.textContent = article.titre;
    image.src = article.image;

    renderEditorContent(JSON.parse(article.contenu));
    displayPage();
})




function renderEditorContent(data) {
  const container = document.querySelector(".text");
  container.innerHTML = ''; // Nettoyer le contenu précédent
  
  data.blocks.forEach(block => {
    let html = '';
    
    switch (block.type) {
      case 'paragraph':
        html = `<p>${block.data.text}</p>`;
        break;

      case 'header':
        html = `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        break;

      case 'list':
        const tag = block.data.style === 'ordered' ? 'ol' : 'ul';
        html = `<${tag}>${block.data.items.map(item => `<li>${item}</li>`).join('')}</${tag}>`;
        break;

      case 'image':
        
        html = `
          <div class="image-block">
            <img src="${block.data.file.url}" alt="${block.data.caption || ''}" />
            ${block.data.caption ? `<div class="caption">${block.data.caption}</div>` : ''}
          </div>
        `;
        break;

      case 'quote':
        html = `<blockquote>${block.data.text}<footer>${block.data.caption || ''}</footer></blockquote>`;
        break;

      // Tu peux ajouter d'autres types comme code, embed, etc.
      default:
        console.warn(`Type de bloc non géré : ${block.type}`);
    }

    container.innerHTML += html;
  });
}