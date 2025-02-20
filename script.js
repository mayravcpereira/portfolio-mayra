// Navegação suave para todas as âncoras do site
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Obtém a altura do header fixo
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            // Calcula a posição considerando o header fixo
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Destacar link ativo no menu
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY + 100; // Ajuste para melhor detecção
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const correspondingLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Adicionar estilo para link ativo
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .nav-links a.active {
            color: var(--primary-color) !important;
            font-weight: 600;
        }
    </style>
`);

// Atualizar link ativo durante o scroll
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Função específica para navegação ao contato
function scrollToContact() {
    const contactSection = document.querySelector('#contato');
    const headerHeight = document.querySelector('.header').offsetHeight;

    if (contactSection) {
        const targetPosition = contactSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Adicionar evento para todos os botões de contato
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        scrollToContact();
    });
});

// Função específica para navegação ao início
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Adicionar evento para o link de início
document.querySelector('a[href="#inicio"]').addEventListener('click', function(e) {
    e.preventDefault();
    scrollToTop();
});

// Mostrar/ocultar botão "Voltar ao topo" após certo scroll
const scrollThreshold = 300; // Pixels de scroll para mostrar o botão

// Criar botão "Voltar ao topo"
const backToTopButton = document.createElement('button');
backToTopButton.classList.add('back-to-top');
backToTopButton.innerHTML = '↑';
document.body.appendChild(backToTopButton);

// Controlar visibilidade do botão
window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Adicionar evento ao botão
backToTopButton.addEventListener('click', scrollToTop);
