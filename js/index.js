document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('s');
    const animeItemsOriginal = document.querySelectorAll('.itemtvshows');
    const animeItemsPopulares = document.querySelectorAll('.dtw_conteiner article');
    const errorMessage = document.getElementById('errorMessage');

    const allAnimeItems = [...animeItemsOriginal, ...animeItemsPopulares];

    searchInput.addEventListener('input', function() {
        const searchText = this.value.trim().toLowerCase();
        let animeFound = false;

        allAnimeItems.forEach(anime => {
            const titleElement = anime.querySelector('.data h3');
            if (titleElement) {
                const title = titleElement.textContent.trim().toLowerCase();

                if (title.includes(searchText) || searchText === '') {
                    anime.classList.remove('faded');
                    anime.classList.add('fade');
                    animeFound = true;
                } else {
                    anime.classList.add('faded');
                    anime.classList.remove('fade'); 
                }
            }
        });

        if (!animeFound && searchText !== '') {
            errorMessage.style.display = 'inline';
            updateBreadcrumbs(false, searchText);
        } else {
            errorMessage.style.display = 'none';
            updateBreadcrumbs(true, searchText);
        }
    });

    function updateBreadcrumbs(animeFound, searchText = '') {
        const breadcrumbLast = document.querySelector('.bread_last');
        if (animeFound) {
            breadcrumbLast.innerHTML = `Animes ${searchText ? '&rarr;' : ''} ${searchText ? searchText.charAt(0).toUpperCase() + searchText.slice(1) : ''}`;
        } else if (searchText !== '') {
            breadcrumbLast.innerHTML = '<span style="color: red;">Animes &rarr; Anime não encontrado!</span>';
        } else {
            breadcrumbLast.textContent = 'Animes';
        }
    }
});


// Criar E-mail na caixa de 'link-duv-cont'
document.addEventListener('DOMContentLoaded', function() {
    const linkDuvCont = document.getElementById('link-duv-cont');

    linkDuvCont.addEventListener('click', function(event) {
        event.preventDefault(); 
        const emailAddress = 'contato@teleanimes.com';
        const mailtoLink = `mailto:${emailAddress}`;
        window.location.href = mailtoLink;
    });
});

// Responsável por procurar os animes com determinada sigla
document.addEventListener('DOMContentLoaded', function() {
    const letterLinks = document.querySelectorAll('.abc a');

    letterLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            const selectedLetter = this.textContent.trim(); 
            if (selectedLetter === 'TODOS') {
                displayAllAnimes();
                return;
            } else if (selectedLetter === 'RESET') {
                resetFilters();
                return;
            }

            const filteredAnimes = filterAnimesByLetter(selectedLetter);
            const totalFilteredAnimes = filteredAnimes.length;

            if (totalFilteredAnimes === 0) {
                document.querySelector('.bread_last').textContent = `Animes → Foi encontrado 0 anime com inicial '${selectedLetter}'`;
                document.querySelector('.bread_last').style.color = 'red';
            } else {
                document.querySelector('.bread_last').textContent = `Animes → Foi encontrado ${totalFilteredAnimes} anime(s) com inicial '${selectedLetter}'`;
                document.querySelector('.bread_last').style.color = ''; 
            }

            displayFilteredAnimes(filteredAnimes);
        });
    });

    function cleanString(str) {
        return str.replace(/\s+/g, ' ') 
                  .replace(/[\u200B-\u200D\uFEFF\u3164]/g, '') 
                  .trim(); 
    }

    function filterAnimesByLetter(letter) {
        const animeElements = document.querySelectorAll('.itemtvshows, .item_b, .dtw_conteiner .dt_views_coun .item_b'); 
        const filteredAnimes = [];
    
        if (letter === 'RESET') {
            return filteredAnimes;
        }
    
        animeElements.forEach(anime => {
            const animeNameElement = anime.querySelector('h3'); 
            if (animeNameElement) {
                let animeName = animeNameElement.textContent || ''; 
                animeName = cleanString(animeName); 
                if (animeName.toLowerCase().charAt(0) === letter.toLowerCase()) {
                    filteredAnimes.push(anime); 
                }
            }
        });
    
        return filteredAnimes;
    }

    function displayFilteredAnimes(animes) {
        const allAnimeElements = document.querySelectorAll('.itemtvshows, .item_b, .dtw_conteiner .dt_views_coun .item_b'); 

        allAnimeElements.forEach(anime => {
            anime.classList.remove('faded', 'fade');
            anime.classList.add('faded'); 
        });

        animes.forEach(anime => {
            anime.classList.remove('faded'); 
            anime.classList.add('fade');
        });
    }

    function displayAllAnimes() {
        const allAnimeElements = document.querySelectorAll('.itemtvshows, .item_b, .dtw_conteiner .dt_views_coun .item_b'); 

        allAnimeElements.forEach(anime => {
            anime.classList.remove('faded');
            anime.classList.add('fade');
        });

        document.querySelector('.bread_last').textContent = 'Animes → Todos os animes estão sendo exibidos';
        document.querySelector('.bread_last').style.color = ''; 
    }

    function resetFilters() {
        displayAllAnimes();
        document.querySelector('.bread_last').textContent = 'Animes → Todos os animes foram resetados!';
        document.querySelector('.bread_last').style.color = ''; 
        setTimeout(() => {
            document.querySelector('.bread_last').textContent = 'Animes';
        }, 3000);
    }
});


// Responsável por voltar para o topo do site
document.addEventListener('DOMContentLoaded', function() {
    const linkInicio = document.getElementById('link-inicio');
    function updateLink() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollPosition >= documentHeight - 10) {
            linkInicio.textContent = 'Voltar';
            linkInicio.dataset.atEnd = 'true';
        } else {
            linkInicio.textContent = 'Início';
            linkInicio.dataset.atEnd = 'false';
        }
    }
    window.addEventListener('scroll', updateLink);
    linkInicio.addEventListener('click', function(event) {
        if (linkInicio.dataset.atEnd === 'true') {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    updateLink();
});

// Adiciona evento de rolagem
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('footer');

    function checkFooterVisibility() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollPosition >= documentHeight - 10) {
            footer.classList.add('visible');
        } else {
            footer.classList.remove('visible');
        }
    }
    window.addEventListener('scroll', checkFooterVisibility);
    checkFooterVisibility();
});

// Adiciona áudios
document.addEventListener('DOMContentLoaded', () => {
    const audioOuvir = document.getElementById('ouvir-audio');
    const audioNovasFuncionalidades = document.getElementById('novas-funcionalidades-audio');
    const audioInicio = document.getElementById('inicio-audio');
    const audioDuvidaContato = document.getElementById('duvida-contato-audio');
    const audioNovidades = document.getElementById('novidades-audio');
    const audioGeneros = document.getElementById('generos-audio');
    const audioProcurarAnimes = document.getElementById('procurar-animes-audio');
    const hiddenButton = document.getElementById('hidden-button');
    const linkInicio = document.getElementById('link-inicio');
    const linkDuvidaContato = document.getElementById('link-duv-cont');
    const linkNovidades = document.getElementById('link-novidades');
    const linkGeneros = document.getElementById('link-generos');
    const procurarInput = document.getElementById('s');

    let podeReproduzirOutros = false; 
    let funcionalidadesDesbloqueadas = false; 

    function pauseAllAudios() {
        document.querySelectorAll('audio').forEach(audio => {
            audio.pause();
            audio.currentTime = 0; 
        });
    }

    function handleMouseOver(link, audio) {
        if (podeReproduzirOutros && funcionalidadesDesbloqueadas) {
            pauseAllAudios(); 
            audio.play(); 
        }
    }

    hiddenButton.addEventListener('mouseover', () => {
        if (audioOuvir.paused && !funcionalidadesDesbloqueadas) {
            pauseAllAudios();
            audioOuvir.play();
        }
    });

    linkInicio.addEventListener('mouseover', () => handleMouseOver(linkInicio, audioInicio));
    linkDuvidaContato.addEventListener('mouseover', () => handleMouseOver(linkDuvidaContato, audioDuvidaContato));
    linkNovidades.addEventListener('mouseover', () => handleMouseOver(linkNovidades, audioNovidades));
    linkGeneros.addEventListener('mouseover', () => handleMouseOver(linkGeneros, audioGeneros));
    procurarInput.addEventListener('mouseover', () => handleMouseOver(procurarInput, audioProcurarAnimes));

    hiddenButton.addEventListener('click', () => {
        if (audioNovasFuncionalidades.paused) {
            pauseAllAudios();
            audioNovasFuncionalidades.play();
            podeReproduzirOutros = true; 
            funcionalidadesDesbloqueadas = true; 

            audioNovasFuncionalidades.onended = () => {
                hiddenButton.style.pointerEvents = 'none'; 
            };
        }
    });
});

// Login, registro e logout
document.addEventListener('DOMContentLoaded', () => {
    const iconenovo = document.getElementById('iconenovo');
    const formulario = document.getElementById('formulario');
    const loginForm = document.getElementById('loginFormContent');
    const logoutButton = document.getElementById('logoutButton');
    const userGreeting = document.getElementById('userGreeting');
    const userNameSpan = document.getElementById('userName');
    const userInfo = document.getElementById('userInfo');
    const displayedName = document.getElementById('displayedName');
    const displayedEmail = document.getElementById('displayedEmail');
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
        mostrarInformacoesUsuario(savedUser.name, savedUser.email);
    } else {
        ocultarInformacoesUsuario();
    }

    function mostrarInformacoesUsuario(name, email) {
        userGreeting.style.display = 'block';
        logoutButton.style.display = 'block';
        userNameSpan.textContent = name;
        displayedName.textContent = name;
        displayedEmail.textContent = email;
        formulario.style.display = 'none';
        userInfo.style.display = 'none'; 
    }

    function ocultarInformacoesUsuario() {
        userGreeting.style.display = 'none';
        logoutButton.style.display = 'none';
        userInfo.style.display = 'none'; 
        formulario.style.display = 'none';
    }

    iconenovo.addEventListener('click', () => {
        if (localStorage.getItem('user')) {
            userInfo.style.display = userInfo.style.display === 'block' ? 'none' : 'block';
            formulario.style.display = 'none'; 
        } else {
            formulario.style.display = formulario.style.display === 'block' ? 'none' : 'block';
            userInfo.style.display = 'none'; 
        }
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const userData = { name: username, email: email };
        localStorage.setItem('user', JSON.stringify(userData));
        mostrarInformacoesUsuario(username, email);
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('user');
        ocultarInformacoesUsuario();
    });
});

// Adiciona a classe de animação
function showLoginForm() {
    const formLogin = document.querySelector('.form-login');
    formLogin.style.display = 'block'; 
    formLogin.classList.add('animate');  
}

