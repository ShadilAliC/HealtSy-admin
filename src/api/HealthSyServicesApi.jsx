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

export async function updateSaltMolecule(data, id) {
  try {
    console.log(data, id, "data,id");

    const response = await Api.patch(
      `healthsy-services/salt-molecule/${id}`,
      data
    );
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


export async function createManufacturer(data) {
  try {
    const response = await Api.post("healthsy-services/manufacturer", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getManufacturer(params) {
  try {
    const response = await Api.get("healthsy-services/manufacturer", {
      params,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getManufacturerById(id) {
  try {
    const response = await Api.get(`healthsy-services/manufacturer/${id}`);

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    return { success: false, message: err.message || "An error occurred" };
  }
}

export async function updateManufacturer(id, data) {
  try {
    const response = await Api.patch(
      `healthsy-services/manufacturer/${id}`,
      data
    );
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    console.log(err);

    return { success: false, message: err.message || "An error occurred" };
  }
}
export async function deleteManufacturer(id) {
  try {
    const response = await Api.delete(`healthsy-services/manufacturer/${id}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    return { success: false, message: err.message || "An error occurred" };
  }
}

export async function createUnit(data) {
  try {
    const response = await Api.post("healthsy-services/unit", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getUnit(params) {
  try {
    const response = await Api.get("healthsy-services/unit", {
      params,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getUnitById(id) {
  try {
    const response = await Api.get(`healthsy-services/unit/${id}`);

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    return { success: false, message: err.message || "An error occurred" };
  }
}

export async function updateUnit(id, data) {
  try {
    const response = await Api.patch(`healthsy-services/unit/${id}`, data);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    console.log(err);

    return { success: false, message: err.message || "An error occurred" };
  }
}
export async function deleteUnit(id) {
  try {
    const response = await Api.delete(`healthsy-services/unit/${id}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    return { success: false, message: err.message || "An error occurred" };
  }
}
export async function createProductType(data) {
  try {
    const response = await Api.post("healthsy-services/product-type", data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getProductType(params) {
  try {
    const response = await Api.get("healthsy-services/product-type", {
      params,
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getProductTypeById(id) {
  try {
    const response = await Api.get(`healthsy-services/product-type/${id}`);

    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    return { success: false, message: err.message || "An error occurred" };
  }
}

export async function updateProductType(id, data) {
  try {
    const response = await Api.patch(
      `healthsy-services/product-type/${id}`,
      data
    );
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    console.log(err);

    return { success: false, message: err.message || "An error occurred" };
  }
}
export async function deleteProductType(id) {
  try {
    const response = await Api.delete(`healthsy-services/product-type/${id}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    return { success: false, message: err.message || "An error occurred" };
  }
}

export async function getMedicines(params) {
  try {
    const response = await Api.get("healthsy-services/medicines", {
      params,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function createMedicine(data) {
  console.log(data,'aldld');
  
  try {
    const response = await Api.post("healthsy-services/medicines",data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
export async function getMedicineById(id) {
  try {
    const response = await Api.get(`healthsy-services/medicines/${id}`);
    if (response && response.data) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    return { success: false, message: err.message || "An error occurred" };
  }
}
