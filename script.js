$(document).ready(function() {
    const products = [
        {
            id: 1,
            name: "Chocolate Chip Cookies",
            price: 200,
            originalPrice: 400,
            image: "CCcookie.png",
            description: "Classic homemade chocolate chip cookies"
        },
        {
            id: 2,
            name: "Triple Choco Cookies",
            price: 200,
            originalPrice: 400,
            image: "3CC.png",
            description: "Triple chocolate indulgence in cookie form"
        },
        {
            id: 3,
            name: "Red Velvet Cookies",
            price: 200,
            originalPrice: 400,
            image: "RVC.png",
            description: "Rich red velvet cookies with white chocolate chips"
        },
        {
            id: 4,
            name: "Blueberry Muffins",
            price: 250,
            originalPrice: 450,
            image: "BM.png",
            description: "Fluffy muffins packed with fresh blueberries"
        },
        {
            id: 5,
            name: "Raisin Bran Muffins",
            price: 250,
            originalPrice: 450,
            image: "RBM.png",
            description: "Healthy bran muffins with juicy raisins"
        },
        {
            id: 6,
            name: "Chocolate Muffins",
            price: 250,
            originalPrice: 450,
            image: "CM.png",
            description: "Rich chocolate muffins with chocolate chips"
        },
        {
            id: 7,
            name: "Apple Pie",
            price: 450,
            originalPrice: 600,
            image: "AP.png",
            description: "Traditional apple pie with cinnamon spice"
        },
        {
            id: 8,
            name: "Pumpkin Pie",
            price: 450,
            originalPrice: 600,
            image: "PP.png",
            description: "Seasonal pumpkin pie with warm spices"
        },
        {
            id: 9,
            name: "Brownies",
            price: 150,
            originalPrice: 250,
            image: "BR.png",
            description: "Fudgy chocolate brownies with a crisp top"
        },
        {
            id: 10,
            name: "Specialty Cupcakes",
            price: 150,
            originalPrice: 250,
            image: "SC.png",
            description: "Assorted gourmet cupcakes with premium toppings"
        },
        {
            id: 11,
            name: "Classic Cheesecake",
            price: 500,
            originalPrice: 650,
            image: "CC.png",
            description: "Creamy New York-style cheesecake with graham cracker crust"
        },
        {
            id: 12,
            name: "Cinnamon Rolls",
            price: 180,
            originalPrice: 300,
            image: "CR.png",
            description: "Soft and gooey cinnamon rolls with sweet frosting"
        }
    ];
            
    let cart = [];
            
    function displayProducts() {
        let productHTML = '';
                
        $.each(products, function(index, product) {
            productHTML += `
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="card product-card text-center h-100">
                        <img src="${product.image}" class="card-img-top product-img" alt="${product.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title text-white">${product.name}</h5>
                            <p class="card-text text-muted small">${product.description}</p>
                            <div class="price-tag my-2">
                                <span class="text-primary fs-4">₱${product.price}</span>
                                <span class="ms-2 original-price">₱${product.originalPrice}</span>
                            </div>
                            <div class="mt-auto">
                                <div class="input-group mb-3">
                                    <button class="btn btn-outline-secondary qty-btn" type="button" data-action="decrease">-</button>
                                    <input type="number" class="form-control text-center qty-input" value="1" min="1" max="10">
                                    <button class="btn btn-outline-secondary qty-btn" type="button" data-action="increase">+</button>
                                </div>
                                <button class="btn btn-primary w-100 add-to-cart-btn" data-id="${product.id}">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
                
        $('#product-container').html(productHTML);
                
        $('.qty-btn').on('click', function() {
            const input = $(this).closest('.input-group').find('.qty-input');
            const currentValue = parseInt(input.val());
                    
            if ($(this).data('action') === 'increase') {
                if (currentValue < 10) {
                    input.val(currentValue + 1);
                }
            } else {
                if (currentValue > 1) {
                    input.val(currentValue - 1);
                }
            }
        });
    }
            
    $(document).on('click', '.add-to-cart-btn', function() {
        const productId = $(this).data('id');
        const quantity = parseInt($(this).closest('.card-body').find('.qty-input').val());
                
        const product = products.find(p => p.id === productId);
                
        const existingItemIndex = cart.findIndex(item => item.id === productId);
                
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
                
        showAlert(`Added ${quantity} ${product.name} to cart!`, 'success');
                
        updateCart();
    });
            
    function updateCart() {
        if (cart.length === 0) {
            $('#cart-items').html('<p class="text-center text-muted">Your cart is empty</p>');
            $('.cart-total').text('₱0.00');
            $('.cart-count').text('0');
            $('#checkout-btn').prop('disabled', true);
            return;
        }
                
        let cartHTML = '';
        let total = 0;
        let itemCount = 0;
                
        $.each(cart, function(index, item) {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemCount += item.quantity;
                    
            cartHTML += `
                <div class="cart-item py-2">
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" class="me-2">
                        <div class="flex-grow-1">
                            <h6 class="mb-0">${item.name}</h6>
                            <div class="d-flex justify-content-between">
                                <small>${item.quantity} × ₱${item.price}</small>
                                <span>₱${itemTotal}</span>
                            </div>
                        </div>
                        <button class="btn btn-sm text-danger remove-item" data-index="${index}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `;
        });
                
        $('#cart-items').html(cartHTML);
        $('.cart-total').text(`₱${total.toFixed(2)}`);
        $('.cart-count').text(itemCount);
        $('#checkout-btn').prop('disabled', false);
                
        $('.remove-item').on('click', function() {
            const index = $(this).data('index');
            removeFromCart(index);
        });
    }
            
    function removeFromCart(index) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        showAlert(`Removed ${removedItem.name} from cart!`, 'danger');
        updateCart();
    }
            
    $(document).on('click', '#checkout-btn', function() {
        if (cart.length === 0) return;
                
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                
        let orderSummary = "Order Summary:\n\n";
                
        cart.forEach(item => {
            orderSummary += `${item.name} × ${item.quantity}: ₱${item.price * item.quantity}\n`;
        });
                
        orderSummary += `\nTotal: ₱${total.toFixed(2)}`;
                
        if (confirm(orderSummary + "\n\nProceed with checkout?")) {
            cart = [];
            updateCart();
            showAlert('Thank you for your purchase!', 'success');
        }
    });
            
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
                
        const email = $('#email').val();
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                
        if (!emailPattern.test(email)) {
            showAlert('Please enter a valid email address.', 'danger');
            return;
        }
                
        showAlert('Thank you for your message! We will get back to you soon.', 'success');
        this.reset();
    });
            
    function showAlert(message, type) {
        const alertHTML = `
            <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4 shadow" style="z-index: 1100;" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
                
        $('body').append(alertHTML);
                
        setTimeout(function() {
            $('.alert').alert('close');
        }, 3000);
    }
            
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
                
        const target = $(this.getAttribute('href'));
                
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 500);
        }
                
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-toggler').click();
        }
    });
            
    $(window).on('scroll', function() {
        const scrollPosition = $(window).scrollTop();
                
        $('section').each(function() {
            const target = $(this).offset().top - 100;
            const id = $(this).attr('id');
                    
            if (scrollPosition >= target) {
                $('.navbar-nav .nav-link').removeClass('active');
                $('.navbar-nav .nav-link[href="#' + id + '"]').addClass('active');
            }
        });
    });
            
    displayProducts();
});
