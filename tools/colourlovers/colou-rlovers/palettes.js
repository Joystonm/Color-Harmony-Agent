/**
 * Function to fetch palettes from the COLOURlovers API.
 *
 * @param {Object} args - Arguments for fetching palettes.
 * @param {string} args.lover - The user whose palettes to fetch.
 * @param {string} [args.hueOption] - The hue option for filtering palettes.
 * @param {string} [args.hex] - A valid hex value or list of hex values for filtering.
 * @param {string} [args.hex_logic] - Logic for hex comparison (AND or OR).
 * @param {string} [args.keywords] - Keywords for searching palettes.
 * @param {number} [args.keywordExact=0] - Exact match flag (0 or 1).
 * @param {string} [args.orderCol='name'] - Column to order results by.
 * @param {string} [args.sortBy='ASC'] - Sort order (ASC or DESC).
 * @param {number} [args.numResults=20] - Maximum number of results to return.
 * @param {number} [args.resultOffset=0] - Offset for paging results.
 * @param {string} [args.format='json'] - Response format (json or xml).
 * @returns {Promise<Object>} - The result of the palette fetch.
 */
const executeFunction = async ({ lover, hueOption, hex, hex_logic, keywords, keywordExact = 0, orderCol = 'name', sortBy = 'ASC', numResults = 20, resultOffset = 0, format = 'json' }) => {
  const endpoint = 'http://www.colourlovers.com/api/';
  const url = new URL(`${endpoint}palettes`);
  
  // Construct query parameters
  const params = new URLSearchParams({
    lover,
    format,
    ...(hueOption && { hueOption }),
    ...(hex && { hex }),
    ...(hex_logic && { hex_logic }),
    ...(keywords && { keywords }),
    ...(keywordExact && { keywordExact: keywordExact.toString() }),
    ...(orderCol && { orderCol }),
    ...(sortBy && { sortBy }),
    ...(numResults && { numResults: numResults.toString() }),
    ...(resultOffset && { resultOffset: resultOffset.toString() }),
  });

  // Append parameters to the URL
  url.search = params.toString();

  try {
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
    console.error('Error fetching palettes:', error);
    return {
      error: `An error occurred while fetching palettes: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for fetching palettes from the COLOURlovers API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'fetch_palettes',
      description: 'Fetch palettes from the COLOURlovers API.',
      parameters: {
        type: 'object',
        properties: {
          lover: {
            type: 'string',
            description: 'The user whose palettes to fetch.'
          },
          hueOption: {
            type: 'string',
            description: 'The hue option for filtering palettes.'
          },
          hex: {
            type: 'string',
            description: 'A valid hex value or list of hex values for filtering.'
          },
          hex_logic: {
            type: 'string',
            description: 'Logic for hex comparison (AND or OR).'
          },
          keywords: {
            type: 'string',
            description: 'Keywords for searching palettes.'
          },
          keywordExact: {
            type: 'integer',
            description: 'Exact match flag (0 or 1).'
          },
          orderCol: {
            type: 'string',
            description: 'Column to order results by.'
          },
          sortBy: {
            type: 'string',
            description: 'Sort order (ASC or DESC).'
          },
          numResults: {
            type: 'integer',
            description: 'Maximum number of results to return.'
          },
          resultOffset: {
            type: 'integer',
            description: 'Offset for paging results.'
          },
          format: {
            type: 'string',
            description: 'Response format (json or xml).'
          }
        },
        required: ['lover']
      }
    }
  }
};

export { apiTool };