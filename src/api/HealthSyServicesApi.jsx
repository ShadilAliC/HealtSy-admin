import Api from "./axios";

export async function createSaltMolecule(data) {
  try {
    const response = await Api.post("healthsy-services/salt-molecule", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getSaltMolecule(params) {
  try {
    const response = await Api.get("healthsy-services/salt-molecule", {
      params,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getSaltMoleculeById(id) {
    try {
      const response = await Api.get(`healthsy-services/salt-molecule/${id}`);
      
      if (response && response.data) {
        return response.data; 
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      return { success: false, message: err.message || "An error occurred" };  
    }
  }
  
  export async function updateSaltMolecule(data,id) {
    try {
      const response = await Api.patch(`healthsy-services/salt-molecule/${id}`,data);
      if (response && response.data) {
        return response.data; 
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      return { success: false, message: err.message || "An error occurred" };  
    }
  }
  export async function deleteSalt(id) {
    try {
      const response = await Api.delete(`healthsy-services/salt-molecule/${id}`);
      if (response && response.data) {
        return response.data; 
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      return { success: false, message: err.message || "An error occurred" };  
    }
  }