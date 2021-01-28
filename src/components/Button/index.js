import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.pink_100};
    margin-top: 20px;
    cursor: pointer;
    padding: .655rem .75rem;
    width: 100%;
    color: ${({ theme }) => theme.colors.white};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};  

    &:hover,
    &:focus {
        opacity: .95;
    }

    &:disabled {
        background-color: ${({ theme }) => theme.colors.gray_100};
        cursor: not-allowed;
    }

`;  

  export default Button;