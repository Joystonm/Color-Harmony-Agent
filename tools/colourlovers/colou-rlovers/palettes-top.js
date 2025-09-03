/**
 * Function to retrieve the top palettes from COLOURlovers.
 *
 * @param {Object} args - Arguments for the palette retrieval.
 * @param {string} [args.lover] - The username of the COLOURlover.
 * @param {string} [args.format="json"] - The format of the response (json or xml).
 * @param {number} [args.numResults=20] - The maximum number of results to return (up to 100).
 * @param {number} [args.resultOffset=0] - The offset for paging results.
 * @returns {Promise<Object>} - The result of the palette retrieval.
 */
const executeFunction = async ({ lover, format = 'json', numResults = 20, resultOffset = 0 }) => {
  const endpoint = 'http://www.colourlovers.com/api/';
  const user = 'COLOURlover'; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${endpoint}palettes/top`);
    url.searchParams.append('lover', lover || user);
    url.searchParams.append('format', format);
    url.searchParams.append('numResults', numResults.toString());
    url.searchParams.append('resultOffset', resultOffset.toString());

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
    console.error('Error retrieving top palettes:', error);
    return {
      error: `An error occurred while retrieving top palettes: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving top palettes from COLOURlovers.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_top_palettes',
      description: 'Retrieve the top palettes from COLOURlovers.',
      parameters: {
        type: 'object',
        properties: {
          lover: {
            type: 'string',
            description: 'The username of the COLOURlover.'
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
          resultOffset: {
            type: 'integer',
            description: 'The offset for paging results.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };