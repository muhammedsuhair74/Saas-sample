// export const fetcher = async (url: string, options: RequestInit = {}) => {
//   const { NEXT_PUBLIC_API_URL } = process.env;
//   console.log("NEXT_PUBLIC_API_URL", NEXT_PUBLIC_API_URL);
//   const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
//   const response = await fetch(fullUrl, {
//     ...options,
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   console.log("response", response);

//   if (!response.ok) {
//     // Handle HTTP errors
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   const contentType = response.headers.get("content-type");
//   if (contentType && contentType.includes("application/json")) {
//     return response.json();
//   } else {
//     throw new Error("Received non-JSON response");
//   }
// };

export const fetcher = async (url: string, options: RequestInit = {}) => {
  const fullUrl = `http://localhost:3000/api${url}`;
  console.log("fullUrl", fullUrl);
  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
    },
  });

  //   console.log("Response status:", response.status);
  //   const text = await response.text();
  //   console.log("Response body:", text);

  if (!response.ok) {
    // Handle HTTP errors
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  console.log("response in fetcher", response);
  return response;

  //   //   const contentType = response.headers.get("content-type");
  //   if (contentType && contentType.includes("application/json")) {
  //     return JSON;
  //   } else {
  //     throw new Error("Received non-JSON response");
  //   }
};
