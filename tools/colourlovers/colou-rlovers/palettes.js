/**
 * Function to retrieve palettes from the COLOURlovers API.
 *
 * @param {Object} args - Arguments for the palette retrieval.
 * @param {string} [args.lover] - The username of the COLOURlover.
 * @param {string} [args.hueOption] - The hue option to filter palettes by color.
 * @param {string} [args.hex] - A valid 6-char hex value or list of hex values.
 * @param {string} [args.hex_logic] - Logic for hex comparison, either 'AND' or 'OR'.
 * @param {string} [args.keywords] - Keywords to search for in palettes.
 * @param {number} [args.keywordExact=0] - Set to 1 for exact keyword matching.
 * @param {string} [args.orderCol] - Column to order results by.
 * @param {string} [args.sortBy='ASC'] - Sort order, either 'ASC' or 'DESC'.
 * @param {number} [args.numResults=20] - Maximum number of results to return.
 * @param {number} [args.resultOffset=0] - Offset for paging results.
 * @param {string} [args.format='json'] - Format of the response, either 'json' or 'xml'.
 * @param {string} [args.jsonCallback] - Callback function for JSONP.
 * @param {number} [args.showPaletteWidths=0] - Set to 1 to show palette widths.
 * @returns {Promise<Object>} - The result of the palette retrieval.
 */
const executeFunction = async ({
  lover,
  hueOption,
  hex,
  hex_logic,
  keywords,
  keywordExact = 0,
  orderCol,
  sortBy = 'ASC',
  numResults = 20,
  resultOffset = 0,
  format = 'json',
  jsonCallback,
  showPaletteWidths = 0
}) => {
  const endpoint = 'http://www.colourlovers.com/api/';
  const user = 'COLOURlover'; // will be provided by the user
  try {
    // Construct the URL with query parameters
    const url = new URL(`${endpoint}palettes`);
    url.searchParams.append('lover', lover || user);
    if (hueOption) url.searchParams.append('hueOption', hueOption);
    if (hex) url.searchParams.append('hex', hex);
    if (hex_logic) url.searchParams.append('hex_logic', hex_logic);
    if (keywords) url.searchParams.append('keywords', keywords);
    url.searchParams.append('keywordExact', keywordExact.toString());
    if (orderCol) url.searchParams.append('orderCol', orderCol);
    url.searchParams.append('sortBy', sortBy);
    url.searchParams.append('numResults', numResults.toString());
    url.searchParams.append('resultOffset', resultOffset.toString());
    url.searchParams.append('format', format);
    if (jsonCallback) url.searchParams.append('jsonCallback', jsonCallback);
    url.searchParams.append('showPaletteWidths', showPaletteWidths.toString());

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
    console.error('Error retrieving palettes:', error);
    return {
      error: `An error occurred while retrieving palettes: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving palettes from the COLOURlovers API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_palettes',
      description: 'Retrieve palettes from the COLOURlovers API.',
      parameters: {
        type: 'object',
        properties: {
          lover: {
            type: 'string',
            description: 'The username of the COLOURlover.'
          },
          hueOption: {
            type: 'string',
            description: 'The hue option to filter palettes by color.'
          },
          hex: {
            type: 'string',
            description: 'A valid 6-char hex value or list of hex values.'
          },
          hex_logic: {
            type: 'string',
            description: 'Logic for hex comparison, either "AND" or "OR".'
          },
          keywords: {
            type: 'string',
            description: 'Keywords to search for in palettes.'
          },
          keywordExact: {
            type: 'integer',
            description: 'Set to 1 for exact keyword matching.'
          },
          orderCol: {
            type: 'string',
            description: 'Column to order results by.'
          },
          sortBy: {
            type: 'string',
            enum: ['ASC', 'DESC'],
            description: 'Sort order, either "ASC" or "DESC".'
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
            description: 'Format of the response, either "json" or "xml".'
          },
          jsonCallback: {
            type: 'string',
            description: 'Callback function for JSONP.'
          },
          showPaletteWidths: {
            type: 'integer',
            description: 'Set to 1 to show palette widths.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };