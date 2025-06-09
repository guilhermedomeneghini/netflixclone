async function get() {
    let response = await fetch('http://localhost:3000/profile');
    let json = await response.json();

    const container = document.querySelector('.profiles');  
    const perfiloriginal = document.getElementById('perfil1');

    json.forEach((item, index) => {
        let perfil;

        if (index === 0) {
            perfil = perfiloriginal; 
        } else {
            perfil = perfiloriginal.cloneNode(true);
            perfil.id = `perfil${index + 1}`;
            container.insertBefore(perfil, document.getElementById('createprofile'));
            
        }

        perfil.querySelector('img').src = item.urlimage;
        perfil.querySelector('span').textContent = item.name;
    });
}

get();


const openBtn = document.getElementById('createprofile');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');

openBtn.addEventListener('click', () => {
    overlay.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        overlay.style.display = 'none';
    }
});

const form = document.getElementById('createProfileForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const name = form.name.value.trim();
    const urlimage = form.image.value.trim();

    try {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, urlimage }),
        });

        if (!response.ok) {
            throw new Error('Erro ao criar perfil');
        }

        alert('Perfil criado com sucesso!');
        form.reset(); 

    } catch (error) {
        alert('Erro: ' + error.message);
    }

});