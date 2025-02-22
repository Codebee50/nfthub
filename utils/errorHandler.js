export const handleGenericError = (e)=>{

    if(e?.response?.data?.detail){
        return e?.response?.data?.detail || "An unexpected error occurred"
    }

    if(e?.response?.data?.message){
        return e?.response?.data?.message || "An unexpected error occurred"
    }

    if (e?.message){
        return e?.message
    }

    return "An unexpected error occurred"
}
