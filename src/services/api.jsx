// --- API CONFIGURATION ---

const API_KEY = '11dc92fcc2msh43393d77c1a4e95p10d7e5jsn2849c9c64ccb'; 
const API_HOST = 'exercisedb.p.rapidapi.com';
const API_BASE_URL = `https://exercisedb.p.rapidapi.com`;

// --- MOCK DATA (if api key doesnt work or used in limti) ---
const mockBodyParts = [
  'back', 'cardio', 'chest', 'lower arms', 'lower legs', 
  'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'
];


const mockExercises = [
  { id: '0001', name: '3/4 sit-up', target: 'abs', bodyPart: 'waist', equipment: 'body weight' },
  { id: '0002', name: '45° side bend', target: 'abs', bodyPart: 'waist', equipment: 'body weight' },
  { id: '0003', name: 'air bike', target: 'abs', bodyPart: 'waist', equipment: 'body weight' },
];


/**
 * @param {string} endpoint - The API endpoint to call (e.g., 'exercises').
 * @param {object} options - Optional fetch options.
 * @returns {Promise<any>} - The JSON response or Blob for images.
 */

export const apiFetch = async (endpoint, options = {}) => {
  // If the API key is the not provided, we are in "mock mode".
  if (API_KEY === 'null') {
    console.warn("API key not provided. Using mock data.");
    if (endpoint.includes('bodyPartList')) return mockBodyParts;
    if (endpoint.startsWith('exercises')) return mockExercises;
    
    // The component's 'catch' block will then handle this gracefully.
    if (endpoint.startsWith('image')) {
        return Promise.reject(new Error("Cannot fetch images in mock mode. Add API key."));
    }
    return mockExercises;
  }

  // --- Live API Fetching Logic ---
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
      ...options
    });
    if (!response.ok) {  
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    }
    
    return response;

  } catch (error) {
    console.error("Failed to fetch from API:", error);
    throw error; // Re-throw the error so the component can catch it.
  }
};

