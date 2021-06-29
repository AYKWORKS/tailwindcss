import _ from 'lodash'
import nameClass from '../util/nameClass'
import { baseRules } from './filter'

export default function () {
  return function ({ config, matchUtilities, addUtilities, theme, variants }) {
    if (config('mode') === 'jit') {
      matchUtilities(
        {
          'drop-shadow': (value, { includeBase }) => {
            includeBase(baseRules)

            return {
              '--tw-drop-shadow': Array.isArray(value)
                ? value.map((v) => `drop-shadow(${v})`).join(' ')
                : `drop-shadow(${value})`,
              filter: 'var(--tw-filter)',
            }
          },
        },
        {
          values: theme('dropShadow'),
          variants: variants('dropShadow'),
          type: 'lookup',
        }
      )
    } else {
      const utilities = _.fromPairs(
        _.map(theme('dropShadow'), (value, modifier) => {
          return [
            nameClass('drop-shadow', modifier),
            {
              '--tw-drop-shadow': Array.isArray(value)
                ? value.map((v) => `drop-shadow(${v})`).join(' ')
                : `drop-shadow(${value})`,
              ...(config('mode') === 'jit' ? { filter: 'var(--tw-filter)' } : {}),
            },
          ]
        })
      )

      addUtilities(utilities, variants('dropShadow'))
    }
  }
}
