import Link from "next/link";
import styles from "./Button.module.css";
import { ButtonAttributes, Genericfunction, GenericProps } from "../../types";

interface props extends GenericProps {
  type?: ButtonAttributes;
  link?: string;
  onClick?: Genericfunction;
  className?: string;
}

const Button = ({ className, type, link, onClick, children }: props) => {
  const definedClassName = `${styles.btn} ${className ? className : ""}`;
  if (link) {
    return (
      <Link href={link}>
        <a className={definedClassName}>{children}</a>
      </Link>
    );
  }
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick ? onClick : () => {}}
      className={definedClassName}>
      {children}
    </button>
  );
};

export default Button;
