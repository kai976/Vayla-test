const lottoDisplay = document.querySelector('.lotto-display');
const generateBtn = document.querySelector('.generate-btn');

const generateLottoNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
};

const getColor = (number) => {
    if (number <= 10) return '#fbc400'; // yellow
    if (number <= 20) return '#69c8f2'; // blue
    if (number <= 30) return '#ff7272'; // red
    if (number <= 40) return '#aaa'; // gray
    return '#b0d840'; // green
}

const displayNumbers = (numbers) => {
    lottoDisplay.innerHTML = '';
    numbers.forEach(number => {
        const lottoBall = document.createElement('div');
        lottoBall.className = 'lotto-ball';
        lottoBall.textContent = number;
        lottoBall.style.backgroundColor = getColor(number);
        lottoDisplay.appendChild(lottoBall);
    });
};

generateBtn.addEventListener('click', () => {
    const numbers = generateLottoNumbers();
    displayNumbers(numbers);
});

// Initial generation
displayNumbers(generateLottoNumbers());
