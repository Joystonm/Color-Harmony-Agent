/**
 * Function to get a random color palette from COLOURlovers.
 *
 * @returns {Promise<Object>} - The random color palette data.
 */
const executeFunction = async () => {
  const endpoint = 'http://www.colourlovers.com/api/';
  const user = ''; // will be provided by the user
  try {
    // Construct the URL
    const url = `${endpoint}palettes/random?format=json`;

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET'
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching random palette:', error);
    return {
      error: `An error occurred while fetching the random palette: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for fetching a random color palette from COLOURlovers.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_random_palette',
      description: 'Fetch a random color palette from COLOURlovers.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };