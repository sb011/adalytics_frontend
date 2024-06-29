export const getApiCall = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { errorMessage: error.errorMessage };
  }
};

export const postApiCall = async (url, data, token) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { errorMessage: error.errorMessage };
  }
};

export const putApiCall = async (url, data, token) => {
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { errorMessage: error.errorMessage };
  }
};

export const deleteApiCall = async (url, token) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { errorMessage: error.errorMessage };
  }
};
