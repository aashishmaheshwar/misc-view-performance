import { css } from '@emotion/react';

export const tableStyles = () => css`
    table thead tr:nth-of-type(1) th {
        color: var(--chakra-colors-blue-300);
    }

    @media(max-width: 925px){
        .table thead{
            display: none;
        }
    
        .table, .table tbody, .table tr, .table td{
            display: block;
            width: 100%;
        }
        .table tr{
            margin-bottom:15px;
        }
        .table td{
            text-align: right;
            padding-left: 50%;
            text-align: right;
            position: relative;
        }
        .table td::before{
            content: attr(data-label);
            position: absolute;
            left:0;
            width: 50%;
            padding-left:15px;
            font-size:15px;
            font-weight: bold;
            text-align: left;
        }
    }
`;