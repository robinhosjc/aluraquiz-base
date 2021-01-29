import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputBase = styled.input`
    display: block;
    width: 100%;
    padding: .375rem .75rem;
    border: 1px solid ${({ theme }) => theme.colors.gray_100};
    border-radius: ${({ theme }) => theme.borderRadius};
`;
export default function Input({ onChange, placeholder, ...props }) {
  return (    
      <InputBase
        placeholder={placeholder}
        onChange={onChange}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />    
  );
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};