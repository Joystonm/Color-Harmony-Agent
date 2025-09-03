/**
 * Function to get the top colors from COLOURlovers API.
 *
 * @param {Object} args - Arguments for the color retrieval.
 * @param {string} [args.lover] - The user who loves the colors (defaults to the configured user).
 * @param {string} [args.format='json'] - The format of the response (json or xml).
 * @param {number} [args.numResults=20] - The maximum number of results to return (up to 100).
 * @param {number} [args.ResultOffset=0] - The result offset for paging.
 * @returns {Promise<Object>} - The result of the color retrieval.
 */
const executeFunction = async ({ lover, format = 'json', numResults = 20, ResultOffset = 0 }) => {
  const endpoint = 'http://www.colourlovers.com/api/';
  const user = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${endpoint}colors/top`);
    url.searchParams.append('lover', lover || user);
    url.searchParams.append('format', format);
    url.searchParams.append('numResults', numResults.toString());
    url.searchParams.append('ResultOffset', ResultOffset.toString());

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
          lover: {
            type: 'string',
            description: 'The user who loves the colors.'
          },
          format: {
            type: 'string',
            enum: ['json', 'xml'],
            description: 'The format of the response.'
          },
          numResults: {
            type: 'integer',
            description: 'The maximum number of results to return.'
          },
          ResultOffset: {
            type: 'integer',
            description: 'The result offset for paging.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };