import React from 'react';
import styles from './style.module.css';

export function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return <button className={styles.default} {...props}>{children}</button>
}
