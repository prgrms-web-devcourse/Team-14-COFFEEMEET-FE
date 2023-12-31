import styled from '@emotion/styled'
import React, { ForwardedRef } from 'react'

type InputProps = {
  placeholder?: string
  placeholderSize?: string
  placeholderColor?: string
  padding?: string
  width?: string
  height?: string
  borderColor?: string
  borderWidth?: string
  inputTextColor?: string
  inputTextSize?: string
  inputBackgroundColor?: string
  inputTextFontWeight?: number

  borderRadius?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = React.forwardRef(
  (
    {
      placeholder,
      placeholderSize,
      placeholderColor,
      padding,
      width,
      height,
      borderColor,
      borderWidth,
      borderRadius,
      inputTextColor,
      inputTextSize,
      inputBackgroundColor,
      onChange,
      inputTextFontWeight,
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <StyledInputWrapper>
        <StyledInput
          ref={ref}
          onChange={onChange}
          placeholder={placeholder}
          placeholderSize={placeholderSize}
          placeholderColor={placeholderColor}
          padding={padding}
          width={width}
          height={height}
          borderColor={borderColor}
          borderWidth={borderWidth}
          inputTextColor={inputTextColor}
          inputTextSize={inputTextSize}
          inputBackgroundColor={inputBackgroundColor}
          borderRadius={borderRadius}
          inputTextFontWeight={inputTextFontWeight}
        />
      </StyledInputWrapper>
    )
  },
)
Input.displayName = 'Input'

const StyledInputWrapper = styled.div`
  position: relative;
`

const StyledInput = styled.input<InputProps>`
  ::placeholder {
    font-size: ${(props) => props.placeholderSize};
    color: ${(props) => props.placeholderColor};
  }
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-color: ${(props) => props.borderColor};
  border-width: ${(props) => props.borderWidth};
  color: ${(props) => props.inputTextColor};
  background-color: ${(props) => props.inputBackgroundColor};
  border-radius: ${(props) => props.borderRadius};
  font-size: ${(props) => props.inputTextSize};
  font-weight: ${(props) => props.inputTextFontWeight};
  padding: ${(props) => props.padding};
  position: relative;
  box-sizing: border-box;
`

export default Input
