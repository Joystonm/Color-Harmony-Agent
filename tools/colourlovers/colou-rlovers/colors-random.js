/**
 * Function to retrieve the top colors from COLOURlovers API.
 *
 * @param {Object} args - Arguments for the color retrieval.
 * @param {string} [args.format="json"] - The format of the response (json or xml).
 * @returns {Promise<Object>} - The result of the color retrieval.
 */
const executeFunction = async ({ format = 'json' }) => {
  const endpoint = 'http://www.colourlovers.com/api/';
  try {
    // Construct the URL with query parameters
    const url = new URL(`${endpoint}colors/top`);
    url.searchParams.append('format', format);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error retrieving top colors:', error);
    return {
      error: `An error occurred while retrieving top colors: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving top colors from COLOURlovers API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_top_colors',
      description: 'Retrieve the top colors from COLOURlovers API.',
      parameters: {
        type: 'object',
        properties: {
          format: {
            type: 'string',
            enum: ['json', 'xml'],
            description: 'The format of the response (json or xml).'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };