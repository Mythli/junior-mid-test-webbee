/**
 * @typedef {Object} Filter
 * @property {string} [operator] - Filter operation identifier (e.g., 'smart')
 * @property {*} value - Filter value (may contain special array format ['cross-table', ...])
 * @property {Array} [filtersSet] - Nested filters collection
 */

/**
 * @typedef {Object} FilterSet
 * @property {Array<Filter|FilterSet>} filtersSet - Main collection of filters and nested sets
 */

/**
 * @typedef {Object} TraverseFilterFlags
 * @property {boolean} [crossFilters=false] - Whether to process cross-table filters
 * @property {boolean} [subFilters=true] - Whether to process nested sub-filters
 */

/**
 * @typedef {(filter: Filter) => (string|undefined)} SplitKeyFunction
 */

/**
 * Splits a nested filter structure into categorized subsets
 * @param {FilterSet} filters - Main filter structure containing nested filters. Structure:
 *                              {
 *                                filtersSet: [
 *                                  { operator, value }, // Basic filter
 *                                  {
 *                                    filtersSet: [...]  // Nested sub-filter set
 *                                  },
 *                                  {
 *                                    value: ['cross-table', { filtersSet: [...] }] // Cross-table filters
 *                                  }
 *                                ]
 *                              }
 * @param {SplitKeyFunction} splitFoo - Key generation function that examines individual filters
 * @param {TraverseFilterFlags} [traverseFlags] - Traversal control flags
 * @returns {Object<string, FilterSet>} Map of filter subsets keyed by splitFoo results. Each entry maintains
 *                                      the original structure but only contains filters matching its key.
 *
 * @example
 * // Returns { smart: { filtersSet: [...] }, default: { filtersSet: [...] } }
 * splitFilters(filters, filter => filter.operator === 'smart' ? 'smart' : 'default');
 */
function splitFilters(filters, splitFoo, traverseFlags) {
    // TODO
}

/**
 * Implementation of {@link SplitKeyFunction} that categorizes filters into:
 * - 'smart' (operator: 'smart' and not cross-table)
 * - 'default' (any other operator)
 * - undefined (non-operator filters or cross-table markers)
 *
 * @param {Filter} filter - Filter to evaluate (matches common filter structure)
 * @returns {ReturnType<SplitKeyFunction>} Categorization result following the pattern:
 *          - 'smart'|'default' for valid operator filters
 *          - undefined for invalid/excluded cases
 *
 * @example <caption>Basic categorization</caption>
 * smartDefaultIndexer({ operator: 'smart', value: 42 }); // 'smart'
 * smartDefaultIndexer({ operator: 'eq', value: 'X' });   // 'default'
 *
 * @example <caption>Exclusion cases</caption>
 * // Cross-table filter exclusion
 * smartDefaultIndexer({ operator: 'smart', value: ['cross-table', ...] }); // undefined
 * // Missing operator exclusion
 * smartDefaultIndexer({ value: 'no-operator' }); // undefined
 */
function smartDefaultIndexer(filter) {
    // TODO
}

module.exports = {
    splitFilters,
    smartDefaultIndexer
}
