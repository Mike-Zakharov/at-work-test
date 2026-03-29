import { api } from "../../components/api/api";
import { useQuery } from "@tanstack/react-query";
import { UserCard } from "../../components/user-card/user-card";
import type { User } from "../../../types/user-type";
import { useUsersStore } from "../../../store/users-store";
import styles from "./main-page.module.scss";

export const MainPage = () => {
  function getUsers() {
    return api.get("users?_limit=6").then((res) => res.data);
  }

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { statuses } = useUsersStore();

  const activeUsers = users.filter(
    (user: User) => (statuses[user.id] ?? "active") === "active",
  );
  const archiveUsers = users.filter(
    (user: User) => (statuses[user.id] ?? "active") === "archive",
  );

  return (
    <main>
      <section>
        <div className={styles.header}>
          <h2 className={styles.title}>Активные</h2>
        </div>
        <div className={styles.container}>
          {activeUsers?.map((user: User) => {
            return (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                city={user.address.city}
                company={user.company.name}
                isArchive={false}
              />
            );
          })}
        </div>
      </section>

      <section>
        <div className={styles.header}>
          <h2 className={styles.title}>Архив</h2>
        </div>
        <div className={styles.container}>
          {archiveUsers?.map((user: User) => {
            return (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                city={user.address.city}
                company={user.company.name}
                isArchive={true}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};
