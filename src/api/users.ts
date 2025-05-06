import axios from "axios";

const API_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

export interface User {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  photo: string | null;
  position_id: number;
  registration_timestamp: number;
}

interface GetUsersResponse {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  users: User[];
  links: {
    next_url: string;
    prev_url: string;
  };
}

// -----------------------------------------------------------
// ------------------ GET ALL USERS --------------------------
// -----------------------------------------------------------

export const getAllUsers = async (): Promise<User[]> => {
  // Load 50 users per request
  const usersOnPage = 50;
  const allUsers: User[] = [];

  try {
    // First, fetch page 1 to get total number of pages and the initial users
    const firstPageResponse = await axios.get<GetUsersResponse>(
      `${API_URL}/users`,
      {
        params: { page: 1, count: usersOnPage },
      }
    );

    const { users: firstPageUsers, total_pages } = firstPageResponse.data;

    // Add users from the first page
    allUsers.push(...firstPageUsers);

    // Option 1 (sequential): load each page one by one using a loop or following next_url
    // Option 2 (this one): load all remaining pages in parallel — should be faster,
    // especially if the user base or individual payloads grow

    // Build an array of page numbers starting from 2 (since page 1 is already fetched)
    const pagesArray = Array.from({ length: total_pages - 1 }, (_, i) => i + 2);

    // Turn page numbers into an array of promises
    const pagesPromises = pagesArray.map((pageNumber) =>
      axios.get<GetUsersResponse>(`${API_URL}/users`, {
        params: { page: pageNumber, count: usersOnPage },
      })
    );

    // Launch all requests in parallel
    const results = await Promise.allSettled(pagesPromises);

    // Process each result
    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      // If everything went well — add users from this page
      if (result.status === "fulfilled") {
        allUsers.push(...result.value.data.users);

        // If the request failed — give it a second chance
      } else {
        try {
          const retryResponse = await axios.get<GetUsersResponse>(
            `${API_URL}/users`,
            {
              params: { page: pagesArray[i], count: usersOnPage },
            }
          );

          allUsers.push(...retryResponse.data.users);
        } catch (error) {
          // If the retry also fails — log a warning
          console.log(
            `Failed to load page ${pagesArray[i]} even after retry. Skipped.`
          );
        }
      }
    }

    return allUsers;
  } catch (error) {
    console.error("Failed to fetch all users:", error);
    return [];
  }
};

// -----------------------------------------------------------
// --------------------- GET USER BY ID ----------------------
// -----------------------------------------------------------

export const getUserById = async (id: number): Promise<User> => {
  const res = await fetch(`${API_URL}/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  const data = await res.json();
  return data.user;
};

// -----------------------------------------------------------
// ------------------ REGISTER USER (POST) -------------------
// -----------------------------------------------------------

export const registerUser = async (formData: FormData, token: string) => {
  const res = await axios.post(`${API_URL}/users`, formData, {
    headers: {
      Token: token,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
