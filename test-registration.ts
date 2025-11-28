
import axios from 'axios';

const API_URL = 'https://fluxchess.onrender.com';

async function testRegistration() {
    const payload = {
        email: `testuser_${Date.now()}@example.com`,
        username: `testuser_${Date.now()}`,
        password: 'Password123!',
    };

    console.log('Attempting registration with payload:', payload);

    try {
        const response = await axios.post(`${API_URL}/auth/register`, payload);
        console.log('Registration successful!');
        console.log('Response data:', response.data);
    } catch (error: any) {
        console.error('Registration failed!');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    }
}

testRegistration();
