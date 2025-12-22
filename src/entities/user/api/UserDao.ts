import type { UserType } from "../model/UserType";

export default class UserDao {
    // Имитация запроса на сервер
    static authenticate(login:string, password:string) : Promise<UserType|null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Простая проверка: логин "user", пароль "123"
                if(login === "user" && password === "123") {
                    resolve({
                        name: "John Peterson",
                        email: "user@komercia.com",
                        address: "New York, 5th Avenue",
                        login: "user",
                        dob: "08.12.1995",
                        imageUrl: "https://ui-avatars.com/api/?name=John+Peterson&background=0D8ABC&color=fff" // Аватарка-заглушка
                    })
                }
                else {
                    resolve(null);
                }
            }, 700); // Задержка 0.7 сек как будто интернет
        });
    }
}