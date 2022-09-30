import axios from 'axios';

export const fetchDragon = () => {
    const url = 'https://api.spacexdata.com/v4/dragons/5e9d058759b1ff74a7ad5f8f';

    return axios.get(url).then(({ data }) => data);
};

export const fetchDragonsAll = () => {
    const url = 'https://api.spacexdata.com/v4/dragons';

    return axios.get(url).then(({ data }) => data);
};
