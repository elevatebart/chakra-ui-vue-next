import { h, defineComponent, PropType, computed } from 'vue'
import {
  chakra,
  keyframes,
  DOMElements,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/vue-system'
import { ComponentThemeConfig } from '@chakra-ui/vue-theme'
import { CVisuallyHidden } from '@chakra-ui/c-visually-hidden'

const spin = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

interface SpinnerOptions {
  /**
   * The color of the empty area in the spinner
   */
  emptyColor?: string
  /**
   * The color of the spinner
   */
  color?: string
  /**
   * The thickness of the spinner
   * @example
   * ```html
   * <c-spinner thickness="4px"/>
   * ```
   */
  thickness?: string
  /**
   * The speed of the spinner.
   * @example
   * ```html
   * <c-spinner speed="0.2s"/>
   * ```
   */
  speed?: string
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   */
  label?: string
}

export interface SpinnerProps extends SpinnerOptions, ThemingProps {}

const props = {
  as: {
    type: [Object, String] as PropType<DOMElements>,
    default: 'div',
  },
  emptyColor: {
    type: String as PropType<SpinnerProps['emptyColor']>,
    default: 'transparent',
  },
  thickness: {
    type: String as PropType<SpinnerProps['thickness']>,
    default: '2px',
  },
  speed: {
    type: String as PropType<SpinnerProps['speed']>,
    default: '0.45s',
  },
  color: {
    type: String as PropType<SpinnerProps['color']>,
  },
  label: {
    type: String as PropType<SpinnerProps['label']>,
  },
  colorScheme: String as PropType<string>,
  variant: {
    type: String as PropType<string>,
    default: 'solid',
  },
  size: {
    type: String as PropType<string>,
    default: 'md',
  },
  styleConfig: String as PropType<ComponentThemeConfig>,
}

const CSpinner = defineComponent({
  props,
  setup(props, { slots, attrs }) {
    const themingProps = computed<ThemingProps>(() => ({
      colorScheme: props.colorScheme,
      variant: props.variant,
      size: props.size,
      styleConfig: props.styleConfig,
    }))

    const styles = useStyleConfig('Spinner', { ...themingProps.value })

    const spinnerStyles = {
      display: 'inline-block',
      borderColor: 'currentColor',
      borderStyle: 'solid',
      borderRadius: '99999px',
      borderWidth: props.thickness,
      borderBottomColor: props.emptyColor,
      borderLeftColor: props.emptyColor,
      color: props.color,
      animation: `${spin} ${props.speed} linear infinite`,
      ...styles.value,
    }

    return () =>
      h(
        chakra(props.as, {
          label: 'spinner',
          __css: spinnerStyles,
        }),
        {
          ...attrs,
        },
        props.label && [h(CVisuallyHidden, props.label)]
      )
  },
})

export default CSpinner
