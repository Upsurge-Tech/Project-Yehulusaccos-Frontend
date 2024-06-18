import { ImSpinner8 } from "react-icons/im";
import styles from "./spinner.module.css";

export default function Spinner() {
  return (
    <div data-testid="spinner" className={``}>
      <ImSpinner8
        data-testid="spinner-icon"
        className={`text-[1rem] ${styles.rotate} mx-auto`}
      />
    </div>
  );
}
