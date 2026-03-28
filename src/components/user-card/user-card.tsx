import React from "react";
import styles from "./user-card.module.scss";
import avatar from "../img/avatar.jpg";
import { Dropdown } from "../dropdown/dropdown";
import { useUsersStore } from "../../../store/users-store";

type UserCardProps = {
  id: number;
  name: string;
  city: string;
  company: string;
  avatarUrl?: string;
};

type UserAction = "edit" | "archive" | "hide" | "activate";

export const UserCard: React.FC<UserCardProps> = ({ id, name, city, company, avatarUrl=avatar }) => {
  const { statuses, setStatus } = useUsersStore();
  const userStatus = statuses[id] ?? "active";

  const handleAction = (action: UserAction, id: number) => {
    switch (action) {
      case "archive":
        setStatus(id, "archive");
        break;
      case "hide":
        setStatus(id, "hidden");
        break;
      case "activate":
        setStatus(id, "active");
        break;
      case "edit":
        break;
    }
  };

  return (
    <div className={styles.card}>
      <img className={styles.avatar} src={ avatarUrl } alt={name} />

      <div className={styles.content}>
        <div className={styles.username}>{name}</div>
        <div className={styles.company}>{company}</div>
        <div className={styles.city}>{city}</div>
      </div>
      <Dropdown userId={id} status={userStatus} onAction={handleAction} />
    </div>
  );
};
