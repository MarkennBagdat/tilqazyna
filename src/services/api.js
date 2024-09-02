export const fetchTestData = async () => {
    try {
        const response = await fetch('https://api.tilqural.kz/api/testdata'); // Убедитесь, что ваш API эндпоинт правильный
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error; // Это бросит ошибку, если fetch не удастся, и позволит вам обрабатывать это на фронте
    }
};
