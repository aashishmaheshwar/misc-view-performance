import { css } from '@emotion/react';

export const viewTypeContainerStyles = () => css`
    .view-type-container {
        flex-direction: row;
    }
    @media only screen and (max-width: 400px) {
        .view-type-container {
            flex-direction: column;

            .chakra-stack {
                padding-top: 10px;
                margin: auto; 
            }
        }
    }
`;