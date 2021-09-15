
export const DOG_RESPONSE = 'DOG_RESPONSE';
export const CAT_RESPONSE = 'CAT_RESPONSE';

export const setDogData = (dog) => {
    return {
        type: DOG_RESPONSE,
        payload: dog
    }
} 

export const setCatData = (cat) => {
    return {
        type: CAT_RESPONSE,
        payload: cat
    }
} 

