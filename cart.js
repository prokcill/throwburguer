document.addEventListener('DOMContentLoaded', () => {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Função para renderizar os itens do carrinho
    function renderCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
            cartTotalDiv.innerHTML = '';
        } else {
            cart.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('cart-item');
                itemDiv.innerHTML = `
                    <div><strong>${item.name}</strong></div>
                    <div>R$ ${item.price.toFixed(2)}</div>
                    <button class="remove-button" data-index="${index}">Remover</button>
                `;
                cartItemsDiv.appendChild(itemDiv);
                total += item.price;
            });
            cartTotalDiv.innerHTML = `<p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>`;

            // Adiciona o evento de clique para todos os botões de remover
            const removeButtons = document.querySelectorAll('.remove-button');
            removeButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const index = event.target.dataset.index;
                    removeFromCart(index);
                });
            });
        }
    }

    // Função para remover um item do carrinho
    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Renderiza o carrinho ao carregar a página
    renderCart();

    // Limpa o carrinho e redireciona para a página de finalização de compra
    checkoutButton.addEventListener('click', () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'checkout.html';
    });
});
