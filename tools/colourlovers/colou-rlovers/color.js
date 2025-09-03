/**
 * Function to retrieve color information from COLOURlovers API.
 *
 * @param {Object} args - Arguments for the color request.
 * @param {string} args.hex - The 6-character hex value of the color.
 * @param {boolean} [args.comments=true] - Whether to show the last 10 comments for the given Lover.
 * @param {string} [args.format="json"] - The format of the response (json or xml).
 * @returns {Promise<Object>} - The result of the color request.
 */
const executeFunction = async ({ hex, comments = true, format = 'json' }) => {
  const endpoint = 'http://www.colourlovers.com/api/';
  try {
    // Construct the URL with query parameters
    const url = new URL(`${endpoint}color/${hex}`);
    url.searchParams.append('comments', comments ? '1' : '0');
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
    console.error('Error retrieving color information:', error);
    return {
      error: `An error occurred while retrieving color information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving color information from COLOURlovers API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_color_info',
      description: 'Retrieve color information from COLOURlovers API.',
      parameters: {
        type: 'object',
        properties: {
          hex: {
            type: 'string',
            description: 'The 6-character hex value of the color.'
          },
          comments: {
            type: 'boolean',
            description: 'Whether to show the last 10 comments for the given Lover.'
          },
          format: {
            type: 'string',
            enum: ['json', 'xml'],
            description: 'The format of the response.'
          }
        },
        required: ['hex']
      }
    }
  }
};

export { apiTool };