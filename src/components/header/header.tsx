import styles from "./header.module.scss";
import logo from "../img/logo.svg";
import { Icon } from "../../icons/icon";
import avatar from "../img/avatar.jpg";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img src={logo} alt="at-work logo" className={styles.logo} />
        <div className={styles.wrapper}>
          <div className={styles.actions}>
            <Icon name="favorite" className={styles.favorite} />
            <Icon name="notification" className={styles.notification} />
          </div>
          <div className={styles.user}>
            <img src={avatar} alt="user-avatar" />
            <span>username</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
