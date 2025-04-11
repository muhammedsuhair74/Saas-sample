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

export const fetcher = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  console.log("fetcher", url, options);
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  console.log("response", response);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  const contentType = response.headers.get("content-type");
  console.log("contentType", contentType);
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  throw new Error("Received non-JSON response");
};
