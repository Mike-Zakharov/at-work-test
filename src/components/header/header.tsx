import styles from "./header.module.scss"
import logo from "../img/logo.svg";

function Header () {
  return(
    <header>
      <div>
        <img src={logo} alt="at-work logo" className={styles.logo} />
      </div>
      <div></div>
    </header>
  )
}

export default Header;