import styles from "./JoinCommunity.module.css";
import { Link } from "react-router-dom";

const JoinCommunity = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content1}>
        <div className={styles.header}>
          <div className={styles.createYourMessaing}>Join Our Community</div>
          <div className={styles.joinOurVibrant}>
            Join our vibrant community, where creativity knows no bounds.
            Together, we're crafting a world of inspiration
          </div>
        </div>
      </div>
      <button className={styles.muiButton}>
        <div className={styles.rectangle} />
        <Link to={`/login`} className={styles.button}>Login</Link>
      </button>
    </div>
  );
};

export default JoinCommunity;
