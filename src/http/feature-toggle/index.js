
export default function getConfig(config){
    
    try{
        if(!config){
            return
        }

        const api_url = API_URL;

        const response = await fetch(`${api_url}/api/feature-toggle?populate=*`);
    
        const data = await response.json();

        const variables = data.data.attributes.Variable

        const variable = variables.find(item => item.key === config)

        if(variable){
            return variable.value
        }

        return false
    
    }catch(_){
        return false
    }
}