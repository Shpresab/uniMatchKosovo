const quizData = [
    { question: 'A preferoni Matematikën dhe Shkencën mbi lëndët krijuese dhe të Shkencave Humane?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q1', major: 'Inxhinieri' },
    { question: 'A është e rëndësishme për ju të keni një karrierë që ndihmon të tjerët?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q2', major: 'Mjekësi' },
    { question: 'A keni interes për të punuar në sektorin e shëndetësisë?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q3', major: 'Infermieri' },
    { question: 'A do të ishit të lumtur të keni një karrierë që ndihmon fëmijët?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q4', major: 'Edukim' },
    { question: 'A preferoni lëndët praktike mbi ato që janë më teorike?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q5', major: 'Studime Teknike' },
    { question: 'A ju pëlqen të ndërtoni sisteme që zgjidhin probleme teknike?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q6', major: 'Shkenca Kompjuterike' },
    { question: 'A do të donit të punonit në një fushë të re, më evoluese të studimit?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q7', major: 'Bioteknologji' },
    { question: 'A ju pëlqen të zgjidhni formula të gjata?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q8', major: 'Matematikë' },
    { question: 'A ju pëlqen të mësoni më shumë për të kaluarën sesa për të tashmen?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q9', major: 'Histori' },
    { question: 'A preferoni të studioni veprat letrare që shfaqin kontekst historik dhe kulturor të tyre?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q10', major: 'Letërsi' },
    { question: 'A keni një pasion për artet?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q11', major: 'Arte të Bukura' },
    { question: 'A preferoni të kuptoni praktikat dhe doktrinat e fesë islame në kontekst historik?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q12', major: 'Studime Islame' },
    { question: 'A jeni të interesuar të punoni në një fushë që kërkon të shkruani dhe të redaktoni shumë?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q13', major: 'Gazetari' },
    { question: 'A preferoni të punoni me kompjutera dhe pajisje teknologjike?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q14', major: 'Inxhinieri Kompjuterike' },
    { question: 'A keni interes për sigurinë kibernetike dhe hakerimin etik?', options: ['Po', 'Nuk jam i sigurt', 'Jo'], name: 'q15', major: 'Shkenca Kompjuterike' },
  ];
  
  let currentQuestionIndex = 0;
  let selectedMajors = [];
  
  const quizContainer = document.getElementById('quizForm');
  const questionElement = document.createElement('div');
  const resultContainer = document.getElementById('resultContainer');
  const nextButton = document.createElement('button');
  const prevButton = document.createElement('button');
  const submitButton = document.createElement('button');
  const questionNumberElement = document.createElement('p');
  
  questionElement.className = 'question';
  resultContainer.className = 'result';
  nextButton.className = 'btn';
  prevButton.className = 'btn';
  submitButton.className = 'btn';
  questionNumberElement.className = 'question-number';
  
  nextButton.innerText = 'Vazhdo';
  prevButton.innerText = 'Kthehu';
  submitButton.innerText = 'Përfundo';
  
  prevButton.style.display = 'none'; 
  submitButton.style.display = 'none'; 
  
  function displayQuestion() {
      const questionData = quizData[currentQuestionIndex];
      questionElement.innerHTML = `
          <p>${questionData.question}</p>
          ${questionData.options.map(option => `
              <label>
                  <input type="radio" name="${questionData.name}" value="${option}" required> ${option}
              </label>
          `).join('')}
      `;
  
      questionNumberElement.style.padding = '7px';
      questionNumberElement.style.borderRadius = '8px';
      questionNumberElement.style.backgroundColor = 'white';
      questionNumberElement.style.fontSize = '14px';
      questionNumberElement.style.position = 'absolute';
      questionNumberElement.style.top = '-10px';
      questionNumberElement.style.right = '10px'; 
      questionNumberElement.innerText = `${currentQuestionIndex + 1} / ${quizData.length}`;
  
      quizContainer.innerHTML = '';
      quizContainer.appendChild(questionNumberElement); 
      quizContainer.appendChild(questionElement);
      quizContainer.appendChild(prevButton);
      quizContainer.appendChild(nextButton);
      quizContainer.appendChild(submitButton);
  }
  
  function showResult() {
      const majorCounts = {};
      selectedMajors.forEach(major => {
          if (majorCounts[major]) {
              majorCounts[major]++;
          } else {
              majorCounts[major] = 1;
          }
      });
  
      const sortedMajors = Object.keys(majorCounts).sort((a, b) => majorCounts[b] - majorCounts[a]);
      const topMajors = sortedMajors.slice(0, 2); 
  
      quizContainer.style.display = 'none';
      resultContainer.style.display = 'block';
      resultContainer.innerHTML = `Përgjigjet tuaja sugjerojnë se ju mund të përshtateni mirë me këto degë: <strong>${topMajors.join(', ')}</strong>`;
  }
  
  function navigateQuestion(direction) {
      const radios = document.getElementsByName(quizData[currentQuestionIndex].name);
      const selectedValue = Array.from(radios).find(radio => radio.checked)?.value;
  
      if (!selectedValue) {
          alert('Ju lutemi zgjidhni një opsion!');
          return;
      }
  
      if (selectedValue === 'Po') {
          selectedMajors.push(quizData[currentQuestionIndex].major);
      }
  
      const nextIndex = currentQuestionIndex + direction;
      if (nextIndex >= 0 && nextIndex < quizData.length) {
          currentQuestionIndex = nextIndex;
          displayQuestion();
      }
  
      prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
      nextButton.style.display = currentQuestionIndex === quizData.length - 1 ? 'none' : 'inline-block';
      submitButton.style.display = currentQuestionIndex === quizData.length - 1 ? 'inline-block' : 'none';
  }
  
  nextButton.addEventListener('click', () => navigateQuestion(1));
  prevButton.addEventListener('click', () => navigateQuestion(-1));
  submitButton.addEventListener('click', showResult);
  
  displayQuestion();