import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../api/data.js";

const articleTemplate = (article) =>html`
<a class="article-preview" href="/details/${article._id}">
<article>
    <h3>Topic: <span>${article.title}</span></h3>
    <p>Category: <span>${article.category}</span></p>
</article>
</a>`;


const allTemplate = (all) => html`
<section id="catalog-page" class="content catalogue">
    <h1>All Articles</h1>
${all.length==0 ? html`<h3 class="no-articles">No articles yet</h3>`:
all.map(articleTemplate)}
</section>

`; 
export async function allPage(ctx){   
    const all = await getAll()
    console.log(all)
    ctx.render(allTemplate(all))
 
}