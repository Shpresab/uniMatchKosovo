const showPopups = document.querySelectorAll('.show-popup');
const popupContainers = document.querySelectorAll('.popup-container');
const closeBtns = document.querySelectorAll('.close-btn');

showPopups.forEach((showPopup) => {
    showPopup.onclick = () => {
        const popupContainer = showPopup.nextElementSibling;
        if (popupContainer) {
            popupContainer.classList.add('active');
        }
    };
});

closeBtns.forEach((closeBtn) => {
    closeBtn.onclick = () => {
        const popupContainer = closeBtn.closest('.popup-container');
        if (popupContainer) {
            popupContainer.classList.remove('active');
        }
    };
});

document.getElementById('searchInput').addEventListener('input', searchFunction);

function searchFunction() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const collegeContainer = document.getElementById('collegeContainer');
    const faculties = collegeContainer.getElementsByClassName('fakulteti');

    if (filter === '') {
        collegeContainer.innerHTML = '';
        resetPage();
        return;
    }

    for (let i = 0; i < faculties.length; i++) {
        const header = faculties[i].getElementsByClassName('header')[0];
        const h3 = header.getElementsByTagName('h3')[0];
        const txtValue = h3.textContent || h3.innerText;

        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            faculties[i].style.display = "";
        } else {
            faculties[i].style.display = "none";
        }
    }


    searchExternalFiles(filter);
}

function searchExternalFiles(filter) {
    const files = ['indexPrishtine.html','indexGjakove.html',  'indexGjilan.html', 'indexIBCM.html','indexMitrovice.html', 'indexPeje.html', 'indexPrizren.html', 'indexShkencaTeAplikuara.html', 'indexSiguriPublike.html', 'indexStudimeIslame.html','AAB.html', 'KolegjiUBT.html', 'Universum.html', 'Heimerer.html', 'AUK.html', 'KolegjiEvolucioni.html', 'KolegjiRiinvest.html', 'Dardania.html', 'KolegjiESLG.html', 'KolegjiBiznesi.html', 'KolegjiRezonanca.html'];
    const resultsContainer = document.getElementById('collegeContainer');
    resultsContainer.innerHTML = ''; 

    files.forEach(file => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                const faculties = doc.getElementsByClassName('fakulteti');

                for (let i = 0; i < faculties.length; i++) {
                    const header = faculties[i].getElementsByClassName('header')[0];
                    const h3 = header.getElementsByTagName('h3')[0];
                    const txtValue = h3.textContent || h3.innerText;

                    if (txtValue.toLowerCase().indexOf(filter) > -1) {
                        resultsContainer.appendChild(faculties[i].cloneNode(true));
                    }

                    const programs = faculties[i].getElementsByClassName('butonat')[0];
                    const programButtons = programs ? programs.getElementsByClassName('show-popup') : null;

                    if (programButtons) {
                        for (let j = 0; j < programButtons.length; j++) {
                            const programButton = programButtons[j];
                            const programText = programButton.textContent || programButton.innerText;

                            if (programText.toLowerCase().indexOf(filter) > -1) {
                                resultsContainer.appendChild(faculties[i].cloneNode(true));
                                break;
                            }
                        }
                    }
                }

                applyPopupFunctionality();
            });
    });
}

function applyPopupFunctionality() {
    const showPopups = document.querySelectorAll('.show-popup');
    const closeBtns = document.querySelectorAll('.close-btn');

    showPopups.forEach((showPopup) => {
        showPopup.onclick = () => {
            const popupContainer = showPopup.nextElementSibling;
            if (popupContainer) {
                popupContainer.classList.add('active');
            }
        };
    });

    closeBtns.forEach((closeBtn) => {
        closeBtn.onclick = () => {
            const popupContainer = closeBtn.closest('.popup-container');
            if (popupContainer) {
                popupContainer.classList.remove('active');
            }
        };
    });
}

function resetPage() {

    fetch('indexPrivate.html')
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const originalContent = doc.getElementById('collegeContainer').innerHTML;
            document.getElementById('collegeContainer').innerHTML = originalContent;

            applyPopupFunctionality();
        });
}


document.querySelectorAll('.fakulteti').forEach((element) => {
    element.classList.remove('shake');
});