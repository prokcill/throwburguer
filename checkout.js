document.addEventListener('DOMContentLoaded', () => {
    // Elementos e variáveis
    const paymentMethods = document.getElementsByName('payment-method');
    const creditCardInfo = document.getElementById('credit-card-info');
    const debitCardInfo = document.getElementById('debit-card-info');
    const pixInfo = document.getElementById('pix-info');
    const totalPriceElement = document.getElementById('total-price');
    const discountedPriceElement = document.getElementById('discounted-price');
    const couponCodeInput = document.getElementById('coupon-code');
    const applyCouponButton = document.getElementById('apply-coupon-button');
    const discountMessage = document.getElementById('discount-message');
    const checkoutForm = document.getElementById('checkout-form');
    const recipientNameInput = document.getElementById('recipient-name');
    const addressInput = document.getElementById('address');
    const numberInput = document.getElementById('number');
    const apartmentInput = document.getElementById('apartment');
    const cepInput = document.getElementById('cep');
    const shippingCostElement = document.getElementById('shipping-cost');
    const installmentsSelect = document.getElementById('installments');
    const installmentsMessage = document.getElementById('installments-message');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let discount = 0;
    const fixedShippingCost = 29.90;

    // Função para calcular o valor total com desconto e frete
    function updateTotal() {
        const totalWithShipping = total + fixedShippingCost;
        const discountedTotal = totalWithShipping - discount;
        totalPriceElement.textContent = totalWithShipping.toFixed(2);
        discountedPriceElement.textContent = discountedTotal.toFixed(2);
        shippingCostElement.textContent = `Frete: R$ ${fixedShippingCost.toFixed(2)}`;
    }

    // Exibir o total inicial
    updateTotal();

    // Aplicar o cupom de desconto
    applyCouponButton.addEventListener('click', () => {
        const couponCode = couponCodeInput.value.trim();
        if (couponCode === 'Throw5') {
            discount = total * 0.05;
            discountMessage.textContent = 'Cupom de 5% aplicado!';
        } else if (couponCode === 'Throw10') {
            discount = total * 0.10;
            discountMessage.textContent = 'Cupom de 10% aplicado!';
        } else if (couponCode === 'Throw20') {
            discount = total * 0.20;
            discountMessage.textContent = 'Cupom de 20% aplicado!';
        } else {
            discount = 0;
            discountMessage.textContent = 'Cupom inválido.';
        }
        updateTotal();
    });

    // Esconder campos de informações de pagamento
    creditCardInfo.style.display = 'none';
    debitCardInfo.style.display = 'none';
    pixInfo.style.display = 'none';

    // Exibir os campos de pagamento conforme a opção selecionada
    paymentMethods.forEach(method => {
        method.addEventListener('change', (event) => {
            if (event.target.value === 'credit-card') {
                creditCardInfo.style.display = 'block';
                debitCardInfo.style.display = 'none';
                pixInfo.style.display = 'none';
            } else if (event.target.value === 'debit-card') {
                creditCardInfo.style.display = 'none';
                debitCardInfo.style.display = 'block';
                pixInfo.style.display = 'none';
            } else if (event.target.value === 'pix') {
                creditCardInfo.style.display = 'none';
                debitCardInfo.style.display = 'none';
                pixInfo.style.display = 'block';
            }
        });
    });

    // Atualizar o valor total com base no parcelamento
    installmentsSelect.addEventListener('change', () => {
        const installments = parseInt(installmentsSelect.value);
        if (installments > 1 && total > 190.99) {
            const installmentValue = (total + fixedShippingCost - discount) / installments;
            installmentsMessage.textContent = `Cada parcela será de R$ ${installmentValue.toFixed(2)}`;
        } else {
            installmentsMessage.textContent = '';
        }
    });

    // Manipulação do formulário de finalização de compra
    checkoutForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Validar informações de entrega
        if (!recipientNameInput.value || !addressInput.value || !numberInput.value || !cepInput.value) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const pointsEarned = Math.floor(total / 100) * 10;
        let totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
        totalPoints += pointsEarned;
        localStorage.setItem('totalPoints', totalPoints);
        localStorage.setItem('pointsEarned', pointsEarned);

        // Remover o carrinho e redirecionar para a página de recompensas
        localStorage.removeItem('cart');
        window.location.href = 'rewards.html';
    });
});
