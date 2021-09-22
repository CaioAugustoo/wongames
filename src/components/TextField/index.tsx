import { InputHTMLAttributes } from 'react'

import * as S from './styles'

export type TextFieldProps = {
  label?: string
  initialValue?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  disabled?: boolean
  error?: string
} & InputHTMLAttributes<HTMLInputElement>

const TextField = ({
  onChange,
  value,
  label,
  name,
  icon,
  iconPosition = 'left',
  disabled = false,
  error,
  ...props
}: TextFieldProps) => {
  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.InputWrapper>
        {!!icon && <S.Icon iconPosition={iconPosition}>{icon}</S.Icon>}
        <S.Input
          name={name}
          type="text"
          onChange={onChange}
          value={value}
          disabled={disabled}
          iconPosition={iconPosition}
          {...(label ? { id: name } : {})}
          {...props}
        />
      </S.InputWrapper>
      {!!error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  )
}

export default TextField
