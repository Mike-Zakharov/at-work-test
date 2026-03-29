import React from "react";
import styles from "./user-card.module.scss";
import avatar from "../img/avatar.jpg";
import { Dropdown } from "../dropdown/dropdown";
import { useUsersStore } from "../../../store/users-store";
import { useNavigate } from "react-router";
import type { UserAction } from "../../../types/users-actions";

type UserCardProps = {
  id: number;
  name: string;
  city: string;
  company: string;
  avatarUrl?: string;
};

export const UserCard: React.FC<UserCardProps> = ({
  id,
  name,
  city,
  company,
  avatarUrl = avatar,
}) => {
  const navigate = useNavigate();
  const { statuses, setStatus } = useUsersStore();
  const userStatus = statuses[id] ?? "active";

  const handleAction = (action: UserAction, userId: number) => {
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
        navigate(`/user/${userId}`);
        console.log("Поехали");

        break;
    }
  };

  return (
    <div className={styles.card}>
      <img className={styles.avatar} src={avatarUrl} alt={name} />

      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.username}>{name}</div>
          <div className={styles.company}>{company}</div>
          <div className={styles.city}>{city}</div>
        </div>
        <Dropdown userId={id} status={userStatus} onAction={handleAction} />
      </div>
    </div>
  );
};
