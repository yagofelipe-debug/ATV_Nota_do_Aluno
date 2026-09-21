const fieldIds = [
  'prova1',
  'prova2',
  'trabalho',
  'participacao',
  'projeto',
  'presenca'
];

const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const studentNameInput = document.getElementById('studentName');
const subjectInput = document.getElementById('subject');

const finalScoreEl = document.getElementById('finalScore');
const averageValueEl = document.getElementById('averageValue');
const statusValueEl = document.getElementById('statusValue');
const attendanceValueEl = document.getElementById('attendanceValue');
const messageBoxEl = document.getElementById('messageBox');
const resultTitleEl = document.getElementById('resultTitle');

const weights = {
  prova1: 0.3,
  prova2: 0.3,
  trabalho: 0.15,
  participacao: 0.1,
  projeto: 0.15,
  presenca: 0.15
};

function getNumberValue(id) {
  const input = document.getElementById(id);
  const value = Number.parseFloat(input.value);
  if (Number.isNaN(value)) return 0;
  return Math.min(Math.max(value, 0), 10);
}

function getAttendance() {
  const input = document.getElementById('presenca');
  const value = Number.parseFloat(input.value);
  if (Number.isNaN(value)) return 0;
  return Math.min(Math.max(value, 0), 100);
}

function calculateGrade() {
  const prova1 = getNumberValue('prova1');
  const prova2 = getNumberValue('prova2');
  const trabalho = getNumberValue('trabalho');
  const participacao = getNumberValue('participacao');
  const projeto = getNumberValue('projeto');
  const presenca = getAttendance();

  const weightedAverage = (
    prova1 * weights.prova1 +
    prova2 * weights.prova2 +
    trabalho * weights.trabalho +
    participacao * weights.participacao +
    projeto * weights.projeto
  );

  const attendanceScore = presenca / 100;
  const finalScore = (weightedAverage * 0.85) + (attendanceScore * 10 * 0.15);

  const averageValue = finalScore;
  let status = 'Aguardando';
  let title = 'Seu desempenho';
  let message = 'Preencha as notas e veja o resultado da sua festa acadêmica.';

  if (averageValue >= 7.0 && presenca >= 75) {
    status = 'Aprovado';
    title = 'Parabéns!';
    message = 'Você brilhou na folia acadêmica e está aprovado(a) com ótimo desempenho.';
  } else if (averageValue >= 5.0 && presenca >= 75) {
    status = 'Recuperação';
    title = 'Ainda dá para brilhar';
    message = 'Sua média está em recuperação. Dedique mais atenção às provas e atividades.';
  } else {
    status = 'Reprovado';
    title = 'Foco na próxima rodada';
    message = 'A média e/ou a presença ficaram abaixo do mínimo. Revise os conteúdos e participe mais.';
  }

  finalScoreEl.textContent = averageValue.toFixed(1);
  averageValueEl.textContent = averageValue.toFixed(2);
  statusValueEl.textContent = status;
  attendanceValueEl.textContent = `${Math.round(presenca)}%`;
  messageBoxEl.textContent = message;
  resultTitleEl.textContent = title;

  const ringProgress = Math.min(Math.max((averageValue / 10) * 360, 0), 360);
  finalScoreEl.parentElement.style.background = `conic-gradient(#ffd166 0deg ${ringProgress}deg, #f4d8ff ${ringProgress}deg 360deg)`;

  const studentName = studentNameInput.value.trim() || 'Aluno(a)';
  const subject = subjectInput.value.trim() || 'Disciplina';
  const summary = `${studentName} em ${subject}`;
  resultTitleEl.textContent = title === 'Seu desempenho' ? `${summary} · ${title}` : `${title} · ${summary}`;

  statusValueEl.style.color = status === 'Aprovado' ? '#1e9b5d' : status === 'Recuperação' ? '#c77711' : '#d93b5d';
  messageBoxEl.style.borderColor = status === 'Aprovado' ? '#38b76d' : status === 'Recuperação' ? '#f6b93b' : '#f15454';
  messageBoxEl.style.background = status === 'Aprovado'
    ? 'rgba(56, 183, 109, 0.1)'
    : status === 'Recuperação'
      ? 'rgba(246, 185, 59, 0.12)'
      : 'rgba(241, 84, 84, 0.08)';
}

function resetForm() {
  fieldIds.forEach((id) => {
    const input = document.getElementById(id);
    input.value = '';
  });

  studentNameInput.value = 'Mariazinha';
  subjectInput.value = 'Matemática';
  document.getElementById('prova1').value = '8.5';
  document.getElementById('prova2').value = '7.8';
  document.getElementById('trabalho').value = '9.0';
  document.getElementById('participacao').value = '8.2';
  document.getElementById('projeto').value = '9.4';
  document.getElementById('presenca').value = '95';

  finalScoreEl.textContent = '0.0';
  averageValueEl.textContent = '0.00';
  statusValueEl.textContent = 'Aguardando';
  attendanceValueEl.textContent = '0%';
  messageBoxEl.textContent = 'Preencha as notas e veja o resultado da sua festa acadêmica.';
  resultTitleEl.textContent = 'Seu desempenho';
  statusValueEl.style.color = 'var(--text)';
  messageBoxEl.style.borderColor = 'var(--blue)';
  messageBoxEl.style.background = 'rgba(91, 119, 255, 0.08)';
  finalScoreEl.parentElement.style.background = 'conic-gradient(var(--gold) 0deg 180deg, #f4d8ff 180deg 360deg)';
}

calculateBtn.addEventListener('click', calculateGrade);
resetBtn.addEventListener('click', resetForm);
fieldIds.forEach((id) => {
  document.getElementById(id).addEventListener('input', calculateGrade);
});

studentNameInput.addEventListener('input', calculateGrade);
subjectInput.addEventListener('input', calculateGrade);

calculateGrade();
