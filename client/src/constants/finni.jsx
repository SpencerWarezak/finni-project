import { ReactComponent as FinniSvg } from '../icons/finni.svg';
import { ReactComponent as FinniFoxSvg } from '../icons/finni-fox.svg';

import { SvgIcon } from '@mui/material';

export const FinniIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <FinniSvg />
        </SvgIcon>
    );
}

export const FinniFox = (props) => {
    return (
        <SvgIcon {...props}>
            <FinniFoxSvg />
        </SvgIcon>
    );
}