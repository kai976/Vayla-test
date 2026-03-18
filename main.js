const lottoDisplay = document.querySelector('.lotto-display');
const generateBtn = document.querySelector('.generate-btn');
const themeToggle = document.querySelector('.theme-toggle');
const themeToggleText = document.querySelector('.theme-toggle-text');

const THEME_STORAGE_KEY = 'vayla-theme';

const generateLottoNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
};

const getColor = (number) => {
    if (number <= 10) return '#fbc400';
    if (number <= 20) return '#69c8f2';
    if (number <= 30) return '#ff7272';
    if (number <= 40) return '#aaa';
    return '#b0d840';
};

const displayNumbers = (numbers) => {
    lottoDisplay.innerHTML = '';
    numbers.forEach((number) => {
        const lottoBall = document.createElement('div');
        lottoBall.className = 'lotto-ball';
        lottoBall.textContent = number;
        lottoBall.style.backgroundColor = getColor(number);
        lottoDisplay.appendChild(lottoBall);
    });
};

const updateThemeUI = (theme) => {
    const isDark = theme === 'dark';
    document.body.dataset.theme = theme;
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggleText.textContent = isDark ? 'Dark Mode' : 'Light Mode';
};

const getPreferredTheme = () => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const toggleTheme = () => {
    const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    updateThemeUI(nextTheme);
};

generateBtn.addEventListener('click', () => {
    displayNumbers(generateLottoNumbers());
});

themeToggle.addEventListener('click', toggleTheme);

updateThemeUI(getPreferredTheme());
displayNumbers(generateLottoNumbers());
