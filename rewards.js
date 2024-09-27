document.addEventListener('DOMContentLoaded', () => {
    const pointsEarned = parseInt(localStorage.getItem('pointsEarned')) || 0;
    const totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;

    document.getElementById('points-earned').textContent = pointsEarned;
    document.getElementById('total-points').textContent = totalPoints;

    const redeemButton = document.getElementById('redeem-button');
    const couponSelection = document.getElementById('coupon-selection');

    redeemButton.addEventListener('click', () => {
        const selectedOption = couponSelection.value;
        let pointsToDeduct = 0;
        let couponCode = '';

        if (selectedOption === '5%') {
            pointsToDeduct = 50;
            couponCode = 'Throw5';
        } else if (selectedOption === '10%') {
            pointsToDeduct = 100;
            couponCode = 'Throw10';
        } else if (selectedOption === '20%') {
            pointsToDeduct = 200;
            couponCode = 'Throw20';
        }

        if (totalPoints >= pointsToDeduct) {
            localStorage.setItem('totalPoints', totalPoints - pointsToDeduct);
            localStorage.setItem('redeemedCoupon', couponCode);
            alert(`Cupom de ${selectedOption} resgatado com sucesso!`);
            window.location.href = 'index.html'; // Redirecionar para o cardápio ou outra página desejada
        } else {
            alert('Você não possui pontos suficientes para resgatar esse cupom.');
        }
    });
});


