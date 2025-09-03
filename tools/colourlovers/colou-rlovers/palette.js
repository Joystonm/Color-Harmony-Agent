/**
 * Function to retrieve a palette from the COLOURlovers API.
 *
 * @param {Object} args - Arguments for the palette request.
 * @param {number} args.paletteId - The ID of the palette to retrieve.
 * @returns {Promise<Object>} - The result of the palette retrieval.
 */
const executeFunction = async ({ paletteId }) => {
  const endpoint = 'http://www.colourlovers.com/api/';
  const user = ''; // will be provided by the user
  try {
    // Construct the URL for the palette request
    const url = `${endpoint}palette/${paletteId}?format=json`;

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
    console.error('Error retrieving palette:', error);
    return {
      error: `An error occurred while retrieving the palette: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving a palette from the COLOURlovers API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_palette',
      description: 'Retrieve a palette from the COLOURlovers API.',
      parameters: {
        type: 'object',
        properties: {
          paletteId: {
            type: 'integer',
            description: 'The ID of the palette to retrieve.'
          }
        },
        required: ['paletteId']
      }
    }
  }
};

export { apiTool };