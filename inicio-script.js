// Script para rotação automática dos banners

// Para o banner existente
let bannerIndex = 0;
const banners = document.querySelectorAll('.banner-images img');
const totalBanners = banners.length;
const bannerInterval = 3000; // Intervalo de 3 segundos para o banner existente

function showNextBanner() {
    bannerIndex = (bannerIndex + 1) % totalBanners;
    updateBanner('.banner-images', bannerIndex);
}

function showPrevBanner() {
    bannerIndex = (bannerIndex - 1 + totalBanners) % totalBanners;
    updateBanner('.banner-images', bannerIndex);
}

// Atualiza o banner específico com base no seletor e índice fornecido
function updateBanner(selector, index) {
    const bannerWidth = document.querySelector(selector).clientWidth;
    document.querySelector(selector).style.transform = `translateX(-${index * bannerWidth}px)`;
}

// Iniciar rotação automática para o banner existente
setInterval(showNextBanner, bannerInterval);

// Ajustar tamanho ao redimensionar a janela para o banner existente
window.addEventListener('resize', () => {
    updateBanner('.banner-images', bannerIndex);
});

// Para o novo bloco de banners rotativos
let additionalBannerIndex = 0;
const additionalBanners = document.querySelectorAll('.additional-banner-images img');
const totalAdditionalBanners = additionalBanners.length;
const additionalBannerInterval = 25000; // Intervalo de 10 segundos para o novo bloco de banners

function showNextAdditionalBanner() {
    additionalBannerIndex = (additionalBannerIndex + 1) % totalAdditionalBanners;
    updateBanner('.additional-banner-images', additionalBannerIndex);
}

function showPrevAdditionalBanner() {
    additionalBannerIndex = (additionalBannerIndex - 1 + totalAdditionalBanners) % totalAdditionalBanners;
    updateBanner('.additional-banner-images', additionalBannerIndex);
}

// Iniciar rotação automática para o novo bloco de banners
setInterval(showNextAdditionalBanner, additionalBannerInterval);

// Ajustar tamanho ao redimensionar a janela para o novo bloco de banners
window.addEventListener('resize', () => {
    updateBanner('.additional-banner-images', additionalBannerIndex);
});


// Adicionar eventos de clique para os botões de navegação do novo bloco de banners
document.querySelector('.additional-banner-nav .next').addEventListener('click', showNextAdditionalBanner);
document.querySelector('.additional-banner-nav .prev').addEventListener('click', showPrevAdditionalBanner);
