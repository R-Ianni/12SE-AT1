import config from '../config.json';  // Import the config file
const SERVER_URL = `${config.backend.url}`;


export default async function requestUserLogout() {
    try { 
        const token = localStorage.getItem('authToken');
        if (!token) {
            throw new Error('No token found');
        }
        console.log('Logging out...');

        const data = {
            sessionToken: token
        }

        const response = await fetch(SERVER_URL + '/auth/logout', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        localStorage.removeItem('authToken');

        // Check if the response is not OK 
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Unknown error occurred');
        }

        const result = await response.json(); // Parse JSON response
        console.log('Response from server:', result);
        localStorage.removeItem('authToken');

        return result; 
    } catch (error) {
        console.error('Error during registration:', error);
        throw error; // Re-throw the error so it can be handled in handleSubmit
    }
}
