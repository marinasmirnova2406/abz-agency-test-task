import axios from "axios";

const API_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

interface User {
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

const getPageOfUsers = async (page: number, count: number): Promise<User[]> => {
  const response = await axios.get<GetUsersResponse>(`${API_URL}/users`, {
    params: { page, count },
  });

  return response.data.users;
};

export const getAllUsers = async (): Promise<User[]> => {
  // Стягиваем плавно по 10 пользователей, что бы не привысить лимит запроса за один раз, но при этом стянуть "ни много, ни мало, а усредненное значение"
  const usersOnPage = 10;
  const allUsers: User[] = [];

  try {
    // ПЕРВАЯ СТРАНИЦА
    // сначала загружаем первую страницу, чтобы узнать все данные (сколько всего пользователей)
    const firstPageResponse = await axios.get<GetUsersResponse>(
      `${API_URL}/users`,
      {
        params: { page: 1, count: usersOnPage },
      }
    );

    const { users: firstPageUsers, total_pages } = firstPageResponse.data;

    // Сохраняем юзеров с первой страницы
    allUsers.push(...firstPageUsers);

    console.log(allUsers);
    console.log("total_pages:", total_pages);

    // ОСТАЛЬНЫЕ СТРАНИЦЫ

    // Вариант 1 - Стянуть поочередно последующие страницы, опиентируясь на их общее количество, либо на next_url (пока он есть - переходить и стягивать)
    // Вариант 2 - (который и реализован) Стянуть все страницы параллельно. Теоритически, это должно положительно сказаться на скорости загрузки, особенно при увеличении массива пользователей или же при увеличении каждого пользователя


    // Строим массив номеров соедующих страниц, без первой, делаем из них массив промисов
    const pagesArray = Array.from({ length: total_pages - 1 }, (_, i) => i + 2);

    const pagesPromises = pagesArray.map((pageNumber) =>
        axios.get<GetUsersResponse>(`${API_URL}/users`, {
          params: { page: pageNumber, count: usersOnPage },
        })
      );

        // Запускаем параллельный сбор всех остальных страниц
        const results = await Promise.allSettled(pagesPromises);



        // Обработываем результат
        for (let i = 0; i < results.length; i++) {
            const result = results[i];

            // Если все хорошо - просто добавляем юзеров с этой страницы в массив
            if (result.status === "fulfilled") {
                allUsers.push(...result.value.data.users);

                // Если страница не загрузилась - даем "второй шанс"
            } else {
                try {
                    const retryResponse = await axios.get<GetUsersResponse>(`${API_URL}/users`, {
                        params: { page: pagesArray[i], count: usersOnPage },
                      });

                      allUsers.push(...retryResponse.data.users);
                } catch (error) {
                    console.log(`Не удалось загрузить страницу ${pageNumber} даже после повторной попытки.`);
                }
                
                
            }


        }


    

      console.log(allUsers);
    



    const response = await getPageOfUsers(1, 10);

    allUsers.push(...response);

    return allUsers;
  } catch (error) {
    console.error("❌ Failed to fetch all users:", error);
    return [];
  }
};
