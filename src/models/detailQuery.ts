import {useCallback, useState} from 'react';

import {gotoDetailProps} from '@/pages/communication-platform/platform-square/utils';

export default function(){
    const [query,setQuery] = useState<gotoDetailProps>()

    const setData = useCallback((e:gotoDetailProps) => setQuery(e), []);

    return {
        setData,
        query,
    }
}
