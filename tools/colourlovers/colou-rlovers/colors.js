/**
 * Function to retrieve colors from the COLOURlovers API.
 *
 * @param {Object} args - Arguments for the color retrieval.
 * @param {string} args.lover - The COLOURlover username.
 * @param {string} [args.hueRange] - The hue range for filtering colors.
 * @param {string} [args.briRange] - The brightness range for filtering colors.
 * @param {string} [args.keywords] - Keywords for searching colors.
 * @param {number} [args.keywordsExact=0] - Whether to match keywords exactly (0 or 1).
 * @param {string} [args.orderCol='name'] - The column to order results by.
 * @param {string} [args.SortBy='ASC'] - The sort order (ASC or DESC).
 * @param {number} [args.numResults=20] - The number of results to return (max 100).
 * @param {number} [args.ResultOffset=0] - The offset for paging results.
 * @param {string} [args.format='json'] - The format of the response (json or xml).
 * @returns {Promise<Object>} - The result of the color retrieval.
 */
const executeFunction = async ({ lover, hueRange, briRange, keywords, keywordsExact = 0, orderCol = 'name', SortBy = 'ASC', numResults = 20, ResultOffset = 0, format = 'json' }) => {
  const endpoint = 'http://www.colourlovers.com/api/';
  const user = ''; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${endpoint}colors`);
    url.searchParams.append('lover', lover);
    if (hueRange) url.searchParams.append('hueRange', hueRange);
    if (briRange) url.searchParams.append('briRange', briRange);
    if (keywords) url.searchParams.append('keywords', keywords);
    url.searchParams.append('keywordsExact', keywordsExact.toString());
    url.searchParams.append('orderCol', orderCol);
    url.searchParams.append('SortBy', SortBy);
    url.searchParams.append('numResults', numResults.toString());
    url.searchParams.append('ResultOffset', ResultOffset.toString());
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
    console.error('Error retrieving colors:', error);
    return {
      error: `An error occurred while retrieving colors: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving colors from the COLOURlovers API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_colors',
      description: 'Retrieve colors from the COLOURlovers API.',
      parameters: {
        type: 'object',
        properties: {
          lover: {
            type: 'string',
            description: 'The COLOURlover username.'
          },
          hueRange: {
            type: 'string',
            description: 'The hue range for filtering colors.'
          },
          briRange: {
            type: 'string',
            description: 'The brightness range for filtering colors.'
          },
          keywords: {
            type: 'string',
            description: 'Keywords for searching colors.'
          },
          keywordsExact: {
            type: 'integer',
            description: 'Whether to match keywords exactly (0 or 1).'
          },
          orderCol: {
            type: 'string',
            description: 'The column to order results by.'
          },
          SortBy: {
            type: 'string',
            description: 'The sort order (ASC or DESC).'
          },
          numResults: {
            type: 'integer',
            description: 'The number of results to return (max 100).'
          },
          ResultOffset: {
            type: 'integer',
            description: 'The offset for paging results.'
          },
          format: {
            type: 'string',
            description: 'The format of the response (json or xml).'
          }
        },
        required: ['lover']
      }
    }
  }
};

export { apiTool };