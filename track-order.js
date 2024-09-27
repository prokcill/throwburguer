document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const deliveryImage = document.createElement('img');
    deliveryImage.src = 'img/delivery-man.png'; // Substitua pelo caminho correto da imagem do entregador
    deliveryImage.id = 'delivery-image';
    document.querySelector('.container').appendChild(deliveryImage);

    let stage = 0;
    let progressWidth = 0;

    const stages = [
        { duration: 1 * 60 * 1000, message: 'Preparando pedido...', width: 0 }, // 15 minutos
        { duration: 1 * 60 * 1000, message: 'Embalando pedido...', width: 50 }, // 5 minutos
        { duration: 1 * 60 * 1000, message: 'Pedido em rota de entrega...', width: 100 } // 35 minutos
    ];

    function updateStage() {
        if (stage < stages.length) {
            const currentStage = stages[stage];
            progressText.textContent = currentStage.message;
            progressBar.style.width = `${currentStage.width}%`;

            if (stage === stages.length - 1) {
                setTimeout(() => {
                    progressText.textContent = 'Sua entrega chegou!';
                    progressText.classList.add('finished');
                    progressBar.classList.add('finished');
                    deliveryImage.style.display = 'block';
                }, currentStage.duration);
            }

            setTimeout(() => {
                stage++;
                updateStage();
            }, currentStage.duration);
        }
    }

    updateStage();
});
