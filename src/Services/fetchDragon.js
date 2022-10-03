import axios from 'axios';

export const fetchDragonsAll = () => {
    const url = 'https://api.spacexdata.com/v4/dragons';

    return axios.get(url).then(({ data }) => data);
};
