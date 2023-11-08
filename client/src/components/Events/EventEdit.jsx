<main class="container mt-5">
    <div class="row">
        <div class="col-md-6">
            <img src="{{product.image}}" class="img-fluid" alt="Product Image">
        </div>
        <div class="col-md-6">
            <h2>{{product.title}}</h2>
            <p class="text-muted">Sale Location: {{product.location}}</p>
            <p class="text-muted">Created Date: {{formatDate product.date}}</p>
            <h4>Price: ${{product.price}}</h4>
            <p>Category: {{product.subject_id}}</p>
            <p>Description: {{product.description}}</p>
            <p>Seller's Social Media: <a href="{{product.contact}}">Click to view Contact Information</a></p>
            <a href="{{product.similarItem}}" target="_blank" class="btn btn-primary">Compare Prices on Amazon</a>
        </div>
    </div>
</main>
