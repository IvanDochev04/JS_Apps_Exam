import { html } from "../../node_modules/lit-html/lit-html.js";
import { getDetails,deleteItem } from "../api/data.js";



const detailsTemplate = (details,isOwner,onDelete) => html`
<section id="details-page" class="content details">
    <h1>${details.title}</h1>

    <div class="details-content">
        <strong>Published in category ${details.category}</strong>
        <p>${details.content}</p>

        <div class="buttons">
            ${isOwner? html`
            <a @click=${onDelete} class="btn delete">Delete</a>
            <a href="/edit/${details._id}" class="btn edit">Edit</a>`:''}
           
            <a href="/" class="btn edit">Back</a>
        </div>
    </div>
</section>`; 
export async function detailsPage(ctx){
    console.log(ctx)
    const details =await getDetails(ctx.params.id)
  const isOwner=  details._ownerId==sessionStorage.userId;
    ctx.render(detailsTemplate(details,isOwner,onDelete))
    console.log(details)
 
    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this item?');
        if (confirmed){
           await deleteItem(details._id);
            ctx.page.redirect('/');
        }
    }
}